import json
import os

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

try:
    from scripts.Get_Skills import get_skills
except ModuleNotFoundError:
    from Get_Skills import get_skills

load_dotenv()

# Database Connection
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("Error: DATABASE_URL not found in environment.")
    exit(1)

# Fix connection string for SQLAlchemy if needed (mssql+pyodbc://...)
# DATABASE_URL is already in the correct format: mssql+pyodbc://adminhr:PasswordStrong123!@sql-server-hr-pulse-2026.database.windows.net:1433/db-rachid?driver=ODBC+Driver+18+for+SQL+Server&Encrypt=yes&TrustServerCertificate=no

engine = create_engine(DATABASE_URL)

def create_table_if_not_exists():
    with engine.connect() as conn:
        create_query = """
        IF NOT EXISTS (
            SELECT * FROM sys.objects 
            WHERE object_id = OBJECT_ID(N'[dbo].[Jobs]') AND type in (N'U')
        )
        BEGIN
            CREATE TABLE [dbo].[Jobs] (
                [id] INT PRIMARY KEY,
                [job_title] NVARCHAR(MAX),
                [skills_extracted] NVARCHAR(MAX)
            )
        END
        """
        conn.execute(text(create_query))
        conn.commit()
    print("Table [dbo].[Jobs] verified/created.")

def inject_data(limit=100):
    csv_path = (
        "/media/rachid/d70e3dc6-74e7-4c87-96bc-e4c3689c979a3/"
        "workspace/Projects/HR-Pulse/data/raw/Clean_1.csv"
    )
    
    # Load dataset
    df = pd.read_csv(csv_path)
    
    # Get first N jobs that have a description
    df_subset = df[df['Job Description'].notna()].head(limit)
    
    create_table_if_not_exists()
    
    records_inserted = 0
    
    with engine.connect() as conn:
        for idx, row in df_subset.iterrows():
            job_id = int(row['index'])
            title = row['job_clean'] if 'job_clean' in row else row['Job Title']
            description = row['Job Description']
            
            # Extract skills using Azure NER
            print(f"[{records_inserted+1}/{limit}] Extracting skills for: {title}...")
            skills = get_skills(description)
            skills_json = json.dumps(skills)
            
            # Insert into Azure SQL
            # Using MERGE or IF NOT EXISTS to avoid duplicates if ID exists
            upsert_query = text("""
            IF EXISTS (SELECT 1 FROM [dbo].[Jobs] WHERE id = :id)
            BEGIN
                UPDATE [dbo].[Jobs] 
                SET job_title = :title, skills_extracted = :skills 
                WHERE id = :id
            END
            ELSE
            BEGIN
                INSERT INTO [dbo].[Jobs] (id, job_title, skills_extracted) 
                VALUES (:id, :title, :skills)
            END
            """)
            
            conn.execute(upsert_query, {"id": job_id, "title": title, "skills": skills_json})
            records_inserted += 1
            
        conn.commit()
        
    print(f"Successfully injected {records_inserted} jobs into Azure SQL.")

if __name__ == "__main__":
    inject_data(100)
