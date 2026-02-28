import os

import joblib
import pandas as pd

# Set base directory relative to this script's location (scripts/Pipline.py)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

try:
    from scripts.Get_Skills import get_skills
except ModuleNotFoundError:
    from Get_Skills import get_skills

def get_job_clean_encoded(title):
    """Encodes the job title based on specific keywords."""
    title = title.lower()
    if 'machine learning' in title or 'ml' in title:
        return 3
    elif 'data scientist' in title or 'scientist' in title:
        return 2
    elif (
        'data engineer' in title 
        or 'engineer' in title 
        or 'développeur' in title 
        or 'developer' in title
    ):
        return 1
    elif 'data analyst' in title or 'analyst' in title:
        return 0
    elif 'manager' in title or 'director' in title or 'senior' in title or 'lead' in title:
        return 5
    else:
        return 4

def Predict_salary(
    job_description, Founded, Job_titel, company_size, sector, industry, state, rating=3.5
):
    """
    Main prediction logic:
    1. Encodes categorical variables.
    2. Extracts skills.
    3. Calculates derived numeric fields.
    4. Scales features and performs prediction using XGBoost.
    """

    # company_size encoding
    size_order = {
        '1 to 50 employees': 1,
        '51 to 200 employees': 2,
        '201 to 500 employees': 3,
        '501 to 1000 employees': 4,
        '10001 to 5000 employees': 5,
        '5001 to 10000 employees': 6,
        '10000+ employees': 7,
        'Unknown': 0
    }

    company_size_encoded = size_order.get(company_size, 0)

    # sector encoding
    le_sector_path = os.path.join(BASE_DIR, 'ml', 'models', 'le_sector.joblib')
    le_sector = joblib.load(le_sector_path)
    sector_encoded = le_sector.transform([sector])[0]

    # industry encoding
    le_industry_path = os.path.join(BASE_DIR, 'ml', 'models', 'le_industry.joblib')
    le_industry = joblib.load(le_industry_path)
    industry_encoded = le_industry.transform([industry])[0]

    # state encoding
    le_state_path = os.path.join(BASE_DIR, 'ml', 'models', 'le_state.joblib')
    le_state = joblib.load(le_state_path)
    state_encoded = le_state.transform([state])[0]
    
    # custom job_clean encoding
    job_clean_encoded = get_job_clean_encoded(Job_titel)

    # derived numeric fields
    company_age = 2026 - Founded
    skills_count = len(get_skills(job_description))
    desc_length = len(job_description)
    title_length = len(Job_titel)
    
    # Scaling numeric features using discovered means and stds
    company_age_scaled = (company_age - 37.24731182795699) / 37.46988924857682
    skills_count_scaled = (skills_count - 48.54531490015361) / 18.700871662510927
    desc_length_scaled = (desc_length - 3484.430107526882) / 1622.7597056617294
    title_length_scaled = (title_length - 22.359447004608295) / 13.838540618613969

    # Create dataframe matching XGBoost feature order exactly
    df = pd.DataFrame({
        'Rating': [rating],
        'company_age': [company_age_scaled],
        'skills_count': [skills_count_scaled],
        'desc_length': [desc_length_scaled],
        'title_length': [title_length_scaled],
        'job_clean_encoded': [job_clean_encoded],
        'size_encoded': [company_size_encoded],
        'sector_encoded': [sector_encoded],
        'industry_encoded': [industry_encoded],
        'state_encoded': [state_encoded]
    })

    # Predict using the trained XGBoost model
    model_path = os.path.join(BASE_DIR, 'ml', 'models', 'xgboost_model.joblib')
    model = joblib.load(model_path)
    prediction = model.predict(df)

    return prediction[0]


if __name__ == "__main__":
    # Example execution for testing
    test_description = (
        "Capgemini recrute un Développeur Python pour rejoindre son équipe à Casablanca. "
        "Vous travaillerez sur des projets cloud utilisant Azure et SQL Server. "
        "Une expérience de 3 ans en Django est souhaitée. "
        "Envoyez votre candidature à recrutement@capgemini.com"
    )
    
    predicted_salary = Predict_salary(
        job_description=test_description, 
        Founded=2019, 
        Job_titel="Développeur Python", 
        company_size="1 to 50 employees", 
        sector="Information Technology", 
        industry="Computer Hardware & Software", 
        state="MA"
    )
    
    print(f"Predicted Salary: {predicted_salary}")