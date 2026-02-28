
import pytest
from app.db.database import Base, get_db
from app.main import app
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# --- Configuration ---
# Use a local SQLite database file for testing to avoid touching production data.
# 'sqlite:///./test.db' creates a file named test.db in the current directory.
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session", autouse=True)
def create_test_database():
    """
    Fixture to initialize the test database.
    Runs once per test session. It drops all existing tables and creates fresh ones
    to ensure a clean slate for the entire suite.
    """
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    # Tables are kept after the session for manual inspection if needed.

@pytest.fixture
def db():
    """
    Fixture to provide a clean database session for each individual test.
    Wraps the test in a transaction that is rolled back at the end,
    ensuring that tests do not leak data to each other.
    """
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    
    yield session
    
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def client(db):
    """
    Fixture to provide a FastAPI TestClient with the database dependency overridden.
    This ensures that the application uses the test database session provided by the 'db' fixture.
    """
    from app.api import deps
    
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    # Override the database dependency in FastAPI to use our test session
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[deps.get_db] = override_get_db
    
    with TestClient(app) as c:
        yield c
        
    # Clear overrides after each test to prevent side effects in other parts of the app
    app.dependency_overrides.clear()
