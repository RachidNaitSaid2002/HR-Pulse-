import os
import sys

from app.api import deps
from app.models.user import User
from app.schemas.predict import JobData
from fastapi import APIRouter, Depends, HTTPException

# --- 1. Import ML Logic ---
# This part is a bit tricky: we are adding the 'scripts' folder to Python's memory
# so we can use the 'Predict_salary' function from 'Pipline.py'.
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../")))

from scripts.Pipline import Predict_salary

# Create the router for prediction paths
router = APIRouter()

@router.post("/", response_model=dict)
def predict_salary(data: JobData, current_user: User = Depends(deps.get_current_user)):
    """
    Predict salary based on job info.
    - Only logged-in users can call this (thanks to 'current_user' dependency).
    - It uses our Machine Learning pipeline to calculate the result.
    """
    try:
        # We pass all the job information to our ML function.
        # This function does the math and returns a number.
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
            
        # Return the result as a JSON object: {"predicted_salary": 123.45}
        return {"predicted_salary": float(prediction)}

    except Exception as error:
        # If something goes wrong (e.g. model file missing), we return a 500 error.
        raise HTTPException(
            status_code=500, 
            detail=f"Prediction failed: {str(error)}"
        )
