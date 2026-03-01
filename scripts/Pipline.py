import os

import joblib
import pandas as pd

# Use the skills extraction script we built in Phase 8
try:
    from scripts.Get_Skills import get_skills
except ModuleNotFoundError:
    from Get_Skills import get_skills

# --- 1. Setup Paths ---
# We find the folder where this script lives, so we can find our ML models.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_job_category_number(title):
    """
    Turns a text job title into a simple number that the Machine Learning model 
    can understand (Encoding).
    """
    title = title.lower()
    if 'machine learning' in title or 'ml' in title:
        return 3 # Scientist level
    elif 'data scientist' in title or 'scientist' in title:
        return 2
    elif any(word in title for word in ['engineer', 'développeur', 'developer']):
        return 1 # Engineer level
    elif 'analyst' in title:
        return 0 # Analyst level
    elif any(word in title for word in ['manager', 'director', 'senior', 'lead']):
        return 5 # Senior/Management
    else:
        return 4 # Other

def Predict_salary(
    job_description, Founded, Job_titel, company_size, sector, industry, state, rating=3.5
):
    """
    The main logic to calculate a salary prediction.
    Steps:
    1. Convert text descriptions into numbers.
    2. Extract skills from the description.
    3. Normalize numbers (scaling) so the model isn't confused by big values.
    4. Feed everything into the XGBoost model.
    """

    # --- Step 1: Encode Company Size ---
    # We map text labels to numbers 0-7.
    size_mapping = {
        '1 to 50 employees': 1,
        '51 to 200 employees': 2,
        '201 to 500 employees': 3,
        '501 to 1000 employees': 4,
        '10001 to 5000 employees': 5,
        '5001 to 10000 employees': 6,
        '10000+ employees': 7,
        'Unknown': 0
    }
    company_size_encoded = size_mapping.get(company_size, 0)

    # --- Step 2: Encode Categorical Features ---
    # We use 'Label Encoders' (.joblib files) that were saved during training.
    # They remember how to turn 'Information Technology' into a specific number.
    le_sector = joblib.load(os.path.join(BASE_DIR, 'ml', 'models', 'le_sector.joblib'))
    sector_encoded = le_sector.transform([sector])[0]

    le_industry = joblib.load(os.path.join(BASE_DIR, 'ml', 'models', 'le_industry.joblib'))
    industry_encoded = le_industry.transform([industry])[0]

    le_state = joblib.load(os.path.join(BASE_DIR, 'ml', 'models', 'le_state.joblib'))
    state_encoded = le_state.transform([state])[0]
    
    # Use our custom helper for the job title
    job_category_encoded = get_job_category_number(Job_titel)

    # --- Step 3: Derived Numeric Fields ---
    company_age = 2026 - Founded
    skills_list = get_skills(job_description)
    skills_count = len(skills_list)
    description_length = len(job_description)
    title_length = len(Job_titel)
    
    # --- Step 4: Normalization (Scaling) ---
    # IMPORTANT for beginners: ML models work best when numbers are between -3 and 3.
    # We subtract the average (mean) and divide by the spread (std deviation).
    # These numbers below come directly from our training dataset analysis.
    age_scaled = (company_age - 37.25) / 37.47
    skills_scaled = (skills_count - 48.55) / 18.70
    desc_scaled = (description_length - 3484.43) / 1622.76
    title_scaled = (title_length - 22.36) / 13.84

    # --- Step 5: Final Prediction ---
    # Create a small table (DataFrame) with exactly the columns the model expects.
    input_data = pd.DataFrame({
        'Rating': [rating],
        'company_age': [age_scaled],
        'skills_count': [skills_scaled],
        'desc_length': [desc_scaled],
        'title_length': [title_scaled],
        'job_clean_encoded': [job_category_encoded],
        'size_encoded': [company_size_encoded],
        'sector_encoded': [sector_encoded],
        'industry_encoded': [industry_encoded],
        'state_encoded': [state_encoded]
    })

    # Load the XGBoost brain and ask it for the answer
    model = joblib.load(os.path.join(BASE_DIR, 'ml', 'models', 'xgboost_model.joblib'))
    prediction = model.predict(input_data)

    return prediction[0]

# --- 6. Quick Test ---
if __name__ == "__main__":
    test_desc = "Looking for a Python Developer with 3 years experience in Casablanca."
    salary = Predict_salary(
        job_description=test_desc, 
        Founded=2010, 
        Job_titel="Python Developer", 
        company_size="51 to 200 employees", 
        sector="Information Technology", 
        industry="Software", 
        state="MA"
    )
    print(f"💰 Predicted Salary: ${salary:.2f}K")