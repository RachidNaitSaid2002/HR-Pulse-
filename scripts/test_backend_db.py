import sys

# Add the project root and backend to path for imports
sys.path.append("/media/rachid/d70e3dc6-74e7-4c87-96bc-e4c3689c979a3/workspace/Projects/HR-Pulse")
sys.path.append("/media/rachid/d70e3dc6-74e7-4c87-96bc-e4c3689c979a3/workspace/Projects/HR-Pulse/backend")

from app.db.database import SessionLocal, engine
from app.models.job import Job
from sqlalchemy import text


def test_db():
    print("Testing database connection...")
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1")).fetchone()
            print(f"Connection test result: {result}")
            
        db = SessionLocal()
        print("Querying Jobs table...")
        jobs = db.query(Job).limit(5).all()
        print(f"Found {len(jobs)} jobs.")
        for job in jobs:
            print(f"- ID: {job.id}, Title: {job.job_title}")
            
    except Exception as e:
        print(f"Error encountered: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_db()
