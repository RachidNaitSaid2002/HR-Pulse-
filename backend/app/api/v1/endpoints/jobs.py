import json
from typing import List

from app.api import deps
from app.db.database import get_db
from app.models.job import Job as JobModel
from app.models.user import User
from app.schemas.job import Job as JobSchema
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# Create the router for job-related paths
router = APIRouter()

@router.get("/", response_model=List[JobSchema])
def get_jobs(
    skip: int = 0, 
    limit: int = 20, # Default to 20 jobs to keep it fast
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Fetch a list of jobs from the database.
    - Uses pagination (skip and limit) so we don't load too many at once.
    - Requires the user to be logged in.
    """
    try:
        # 1. Query the database for jobs. 'offset' skips some, 'limit' stops at a number.
        jobs = db.query(JobModel).order_by(JobModel.id).offset(skip).limit(limit).all()
        
        result = []
        for job in jobs:
            # 2. We store skills as a JSON string in the database.
            # We turn it back into a Python List here.
            try:
                # If skills_extracted is "[ 'Python', 'SQL' ]", this turns it into a real list.
                skills_list = json.loads(job.skills_extracted) if job.skills_extracted else []
            except Exception:
                # If the JSON is broken, we just return an empty list.
                skills_list = []
                
            # 3. Create a clean dictionary to return to the Frontend.
            job_item = {
                "id": job.id,
                "job_title": job.job_title,
                "skills_extracted": job.skills_extracted,
                "skills": skills_list
            }
            result.append(job_item)
            
        return result

    except Exception as error:
        # If something big breaks, return an internal server error.
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to fetch jobs: {str(error)}"
        )
