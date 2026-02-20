from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import os
from dotenv import load_dotenv

load_dotenv()

endpoint = os.getenv("endpoint")
key = os.getenv("key")
client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))


def get_skills(job_description):
    """Extracts unique skills from a job description using Azure Text Analytics."""
    if not job_description or not isinstance(job_description, str):
        return []

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
        return []


if __name__ == "__main__":
    Skills = get_skills(
        "Capgemini recrute un Développeur Python pour rejoindre son équipe à Casablanca.Vous travaillerez sur des projets cloud utilisant Azure et SQL Server.Une expérience de 3 ans en Django est souhaitée.Envoyez votre candidature à recrutement@capgemini.com"
    )
    print(Skills)