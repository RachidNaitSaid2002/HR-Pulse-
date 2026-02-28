import os

from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_URL
engine = create_engine(DATABASE_URL)

try:
    with engine.begin() as connection:
        print("✅ Database connected successfully!")

except Exception as e:
    print("❌ Connection failed")
    print(e)