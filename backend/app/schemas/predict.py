from pydantic import BaseModel

class JobData(BaseModel):
    job_description: str
    Founded: int
    Job_titel: str
    company_size: str
    sector: str
    industry: str
    state: str
    rating: float = 3.5
