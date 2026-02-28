import os
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
from opentelemetry import trace
from app.core.tracing import tracer

load_dotenv()

endpoint = os.getenv("endpoint")
key = os.getenv("key")

def get_client():
    """Lazily initialize the Azure Text Analytics client."""
    if not endpoint or not key:
        return None
    try:
        return TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))
    except Exception:
        return None

def get_skills(job_description):
    """Extracts unique skills from a job description using Azure Text Analytics."""
    with tracer.start_as_current_span("azure_skill_extraction") as span:
        if not job_description or not isinstance(job_description, str):
            span.set_attribute("error", "Empty or invalid job description")
            return []

        client = get_client()
        if not client:
            span.set_attribute("status", "Client not initialized")
            return []

        # Azure has a 5000 character limit per document
        truncated = job_description[:5000]
        span.set_attribute("job_description.length", len(truncated))

        try:
            response = client.recognize_entities(documents=[truncated])
            
            skills = list(
                {
                    entity.text
                    for doc in response
                    for entity in doc.entities
                    if entity.category == "Skill"
                }
            )
            span.set_attribute("skills.count", len(skills))
            return skills
            
        except Exception as e:
            span.record_exception(e)
            span.set_status(trace.Status(trace.StatusCode.ERROR))
            return []

if __name__ == "__main__":
    test_description = (
        "Capgemini recrute un Développeur Python pour rejoindre son équipe à Casablanca. "
        "Vous travaillerez sur des projets cloud utilisant Azure et SQL Server. "
        "Une expérience de 3 ans en Django est souhaitée. "
    )
    extracted_skills = get_skills(test_description)
    print(f"Extracted Skills: {extracted_skills}")