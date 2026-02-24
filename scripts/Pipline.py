import joblib
import pandas as pd
from Get_Skills import get_skills

def get_job_clean_encoded(title):
    title = title.lower()
    if 'machine learning' in title or 'ml' in title:
        return 3
    elif 'data scientist' in title or 'scientist' in title:
        return 2
    elif 'data engineer' in title or 'engineer' in title or 'développeur' in title or 'developer' in title:
        return 1
    elif 'data analyst' in title or 'analyst' in title:
        return 0
    elif 'manager' in title or 'director' in title or 'senior' in title or 'lead' in title:
        return 5
    else:
        return 4

def Predict_salary(job_description, Founded, Job_titel, company_size, sector, industry, state, rating=3.5):

    # company_size encoding
    size_order = {
        '1 to 50 employees': 1,
        '51 to 200 employees': 2,
        '201 to 500 employees': 3,
        '501 to 1000 employees': 4,
        '1001 to 5000 employees': 5,
        '5001 to 10000 employees': 6,
        '10000+ employees': 7,
        'Unknown': 0
    }

    company_size_encoded = size_order.get(company_size, 0)

    # sector encoding
    le_sector = joblib.load('./ml/models/le_sector.joblib')
    sector_encoded = le_sector.transform([sector])[0]

    # industry encoding
    le_industry = joblib.load('./ml/models/le_industry.joblib')
    industry_encoded = le_industry.transform([industry])[0]

    # state encoding
    le_state = joblib.load('./ml/models/le_state.joblib')
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

    # create dataframe matching XGBoost feature order exactly
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

    # predict
    model = joblib.load('./ml/models/xgboost_model.joblib')
    prediction = model.predict(df)

    return prediction[0]

#Unique sectors: 23 --------------------------------------------------------------------------------
#Unique sectors: ['Accounting & Legal' 'Aerospace & Defense' 'Agriculture & Forestry'
# 'Biotech & Pharmaceuticals' 'Business Services'
# 'Construction, Repair & Maintenance' 'Consumer Services' 'Education'
# 'Finance' 'Government' 'Health Care' 'Information Technology' 'Insurance'
# 'Manufacturing' 'Media' 'Non-Profit' 'Oil, Gas, Energy & Utilities'
# 'Real Estate' 'Retail' 'Telecommunications' 'Transportation & Logistics'
# 'Travel & Tourism' 'Unknown']

#Unique industries: 58 --------------------------------------------------------------------------------
#Unique industries: ['Accounting' 'Advertising & Marketing' 'Aerospace & Defense'
# 'Architectural & Engineering Services' 'Banks & Credit Unions'
# 'Biotech & Pharmaceuticals' 'Cable, Internet & Telephone Providers'
# 'Chemical Manufacturing' 'Colleges & Universities'
# 'Computer Hardware & Software' 'Construction' 'Consulting'
# 'Consumer Electronics & Appliances Stores'
# 'Consumer Products Manufacturing' 'Department, Clothing, & Shoe Stores'
# 'Electrical & Electronic Manufacturing' 'Energy'
# 'Enterprise Software & Network Solutions' 'Express Delivery Services'
# 'Farm Support Services' 'Federal Agencies'
# 'Financial Transaction Processing' 'Food & Beverage Manufacturing'
# 'Food & Beverage Stores' 'Health Care Services & Hospitals'
# 'Health, Beauty, & Fitness' 'Hotels, Motels, & Resorts' 'IT Services'
# 'Industrial Manufacturing' 'Insurance Agencies & Brokerages'
# 'Insurance Carriers' 'Internet' 'Investment Banking & Asset Management'
# 'Lending' 'Logistics & Supply Chain' 'Miscellaneous Manufacturing'
# 'News Outlet' 'Oil & Gas Services' 'Other Retail Stores' 'Publishing'
# 'Rail' 'Real Estate' 'Research & Development' 'Shipping'
# 'Social Assistance' 'Staffing & Outsourcing' 'State & Regional Agencies'
# 'Telecommunications Manufacturing' 'Telecommunications Services'
# 'Timber Operations' 'Transportation Equipment Manufacturing'
# 'Transportation Management' 'Travel Agencies' 'Unknown' 'Utilities'
# 'Venture Capital & Private Equity' 'Video Games' 'Wholesale']

#Unique states: 39
#Unique states: ['AL' 'AZ' 'CA' 'CO' 'CT' 'DC' 'DE' 'FL' 'GA' 'IA' 'IL' 'IN' 'KS' 'LA'
# 'MA' 'MD' 'MI' 'MN' 'MO' 'MS' 'NC' 'NE' 'NH' 'NJ' 'NY' 'OH' 'OK' 'OR'
# 'PA' 'RI' 'SC' 'TN' 'TX' 'UT' 'Unknown' 'VA' 'WA' 'WI' 'WV']

#Unique company_size: 7
#Unique company_size: ['1 to 50 employees' '51 to 200 employees' '201 to 500 employees'
# '501 to 1000 employees' '1001 to 5000 employees' '5001 to 10000 employees'
# '10000+ employees' 'Unknown']



if __name__ == "__main__":
    job_description = "Capgemini recrute un Développeur Python pour rejoindre son équipe à Casablanca.Vous travaillerez sur des projets cloud utilisant Azure et SQL Server.Une expérience de 3 ans en Django est souhaitée.Envoyez votre candidature à recrutement@capgemini.com"
    Founded = 2019
    Job_titel = "Développeur Python"
    company_size = "1 to 50 employees"
    sector = "Information Technology"
    industry = "Computer Hardware & Software"
    state = "MA"
    print(Predict_salary(job_description, Founded, Job_titel, company_size, sector, industry, state))