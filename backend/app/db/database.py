import os

from dotenv import load_dotenv
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# --- 1. Load Environment Variables ---
# We load the .env file so we can access our secret keys and database URLs.
load_dotenv()

# --- 2. Database Configuration ---
# We look for 'DATABASE_URL' in our .env. If it's not there, we use a simple SQLite file.
# SQLite is like a database in a single file—great for beginners!
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

# --- 3. Create the Database Engine ---
# The 'engine' is the actual connection to the database.
# 'check_same_thread: False' is only needed for SQLite to work with FastAPI.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# --- 4. Tracing (Observability) ---
# We tell the tracing tool to watch our database queries.
SQLAlchemyInstrumentor().instrument(engine=engine)

# --- 5. Create the Session ---
# A 'session' is like a conversation with the database.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- 6. The Base Class ---
# All our database "Models" (tables) will inherit from this Base class.
Base = declarative_base()

# --- 7. Create Tables ---
# This line automatically creates the tables in the database if they don't exist yet.
Base.metadata.create_all(bind=engine)

# --- 8. Dependency injection ---
# This helper function gives us a database session when we need it in our API routes.
def get_db():
    """This function opens a database connection and closes it automatically when done."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
