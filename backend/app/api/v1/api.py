from app.api.v1.endpoints import auth, jobs, predict
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(predict.router, prefix="/predict", tags=["predict"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
