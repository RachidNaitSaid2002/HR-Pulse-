from pydantic import BaseModel
from typing import List, Optional
import json

class JobBase(BaseModel):
    id: int
    job_title: Optional[str] = None
    skills_extracted: Optional[str] = None

class Job(JobBase):
    skills: List[str] = []

    class Config:
        from_attributes = True

    @property
    def parsed_skills(self) -> List[str]:
        if self.skills_extracted:
            try:
                return json.loads(self.skills_extracted)
            except:
                return []
        return []
