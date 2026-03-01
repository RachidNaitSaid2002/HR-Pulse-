import os
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
from opentelemetry import trace

# Import our tracing tool to measure AI speed
from app.core.tracing import tracer

# --- 1. Load Keys ---
# We need an 'endpoint' and a 'key' from Azure to use their AI.
load_dotenv()
endpoint = os.getenv("endpoint")
key = os.getenv("key")

def get_client():
    """
    Creates the 'Client' object that talks to Azure's servers.
    It's 'lazy', meaning it only creates the connection when actually needed.
    """
    if not endpoint or not key:
        return None
    try:
        # We use a 'Credential' object to safely pass our secret key.
        credential = AzureKeyCredential(key)
        return TextAnalyticsClient(endpoint=endpoint, credential=credential)
    except Exception:
        return None

def get_skills(job_description):
    """
    The main function to find 'Skills' (like Python, SQL, Azure) inside a text.
    It uses Azure's 'Natural Language Processing' (NLP).
    """
    # Start a 'Span' to track how long this AI call takes in Jaeger.
    with tracer.start_as_current_span("azure_skill_extraction") as span:
        
        # Guard clause: stop if there is no text to analyze.
        if not job_description or not isinstance(job_description, str):
            span.set_attribute("error", "No text provided")
            return []

        # Connect to Azure
        client = get_client()
        if not client:
            span.set_attribute("status", "Azure not configured")
            return []

        # Azure only allows 5000 characters at a time.
        # We 'truncate' (cut) the text if it's too long.
        truncated_text = job_description[:5000]
        span.set_attribute("text_length", len(truncated_text))

        try:
            # Send the text to Azure for 'Entity Recognition'
            response = client.recognize_entities(documents=[truncated_text])
            
            # Extract only the entities that Azure identifies as a "Skill"
            # We use a 'Set' comprehension { ... } to avoid duplicate skills.
            skills = list(
                {
                    entity.text
                    for document in response
                    for entity in document.entities
                    if entity.category == "Skill"
                }
            )
            
            span.set_attribute("skills_found", len(skills))
            return skills
            
        except Exception as error:
            # If the internet is down or Azure is busy, we record the error.
            span.record_exception(error)
            span.set_status(trace.Status(trace.StatusCode.ERROR))
            print(f"⚠️ Azure AI Error: {error}")
            return []

# --- Example of how to use this script ---
if __name__ == "__main__":
    test_text = "Wanted: Python developer with experience in React and SQL."
    found = get_skills(test_text)
    print(f"🔍 Found Skills: {found}")