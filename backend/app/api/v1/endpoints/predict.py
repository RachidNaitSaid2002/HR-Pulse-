from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.schemas.predict import JobData
from app.models.user import User

import sys
import os
# Allow importing from scripts folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../")))
from scripts.Pipline import Predict_salary

router = APIRouter()

@router.post("/", response_model=dict)
def predict_salary(data: JobData, current_user: User = Depends(deps.get_current_user)):
    """
    Predict salary based on job description and company details.
    Secured with JWT authentication.
    """
    try:
        # We must change the working directory around the prediction call to ensure joblib can find `./ml/models/...` 
        # because the original code in Pipline.py loads `joblib.load('./ml/models/...`
        import os
        original_cwd = os.getcwd()
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
        os.chdir(project_root)
        
        try:
            prediction = Predict_salary(
                job_description=data.job_description,
                Founded=data.Founded,
                Job_titel=data.Job_titel,
                company_size=data.company_size,
                sector=data.sector,
                industry=data.industry,
                state=data.state,
                rating=data.rating
            )
        finally:
            os.chdir(original_cwd)
            
        return {"predicted_salary": float(prediction)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
