from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class Job(Base):
    __tablename__ = "Jobs"

    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String, nullable=True)
    skills_extracted = Column(Text, nullable=True)
