import os

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv

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
    if not job_description or not isinstance(job_description, str):
        return []

    client = get_client()
    if not client:
        # If client cannot be initialized (e.g., in CI or missing keys), 
        # return empty list or fallback logic.
        return []

    # Azure has a 5000 character limit per document
    truncated = job_description[:5000]

    try:
        response = client.recognize_entities(documents=[truncated])

        return list(
            {
                entity.text
                for doc in response
                for entity in doc.entities
                if entity.category == "Skill"
            }
        )
    except Exception:
        # Fallback to empty list if API fails
        return []


if __name__ == "__main__":
    # Example job description for testing the skills extraction
    test_description = (
        "Capgemini recrute un Développeur Python pour rejoindre son équipe à Casablanca. "
        "Vous travaillerez sur des projets cloud utilisant Azure et SQL Server. "
        "Une expérience de 3 ans en Django est souhaitée. "
        "Envoyez votre candidature à recrutement@capgemini.com"
    )
    
    extracted_skills = get_skills(test_description)
    print(f"Extracted Skills: {extracted_skills}")