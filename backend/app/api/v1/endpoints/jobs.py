from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import json
from app.db.database import get_db
from app.models.job import Job as JobModel
from app.schemas.job import Job as JobSchema
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[JobSchema])
def get_jobs(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    try:
        jobs = db.query(JobModel).order_by(JobModel.id).offset(skip).limit(limit).all()
        
        result = []
        for job in jobs:
            try:
                skills_list = json.loads(job.skills_extracted) if job.skills_extracted else []
            except Exception as e:
                print(f"Error parsing skills for job {job.id}: {e}")
                skills_list = []
                
            job_dict = {
                "id": job.id,
                "job_title": job.job_title,
                "skills_extracted": job.skills_extracted,
                "skills": skills_list
            }
            result.append(job_dict)
            
        return result
    except Exception as e:
        import traceback
        error_msg = traceback.format_exc()
        with open("backend_error.log", "w") as f:
            f.write(error_msg)
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=str(e))
