# --- 1. Imports ---
# We import the tools we need to build our web server.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

# We import our own code from other folders.
from app.api.v1.api import api_router
from app.core.tracing import setup_tracing
from app.db.database import engine, Base

# --- 2. Setup Tracing (Observability) ---
# This helps us see how long each part of our code takes to run.
setup_tracing("hr-pulse-backend")

# --- 3. Create the App ---
# This is the "brain" of our backend server.
app = FastAPI(
    title="HR-Pulse API",
    description="Backend Service for HR-Pulse predictions and authentication.",
    version="1.0.0",
)

# --- 4. Instrument the App ---
# This connects our app to the tracing tool (Jaeger).
FastAPIInstrumentor.instrument_app(app)

# --- 5. Security (CORS) ---
# This allows our Frontend (on a different port) to talk to this Backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In a real project, we specify which websites can talk to us.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all types of requests (GET, POST, etc.)
    allow_headers=["*"],  # Allow all types of extra info in requests.
)

# --- 6. Routes ---
# We tell the app to use the routes we defined in the 'api' folder.
app.include_router(api_router, prefix="/api/v1")

# This is a simple "testing" route to make sure the server is alive.
@app.get("/")
def read_root():
    """Welcome message when you visit the main URL."""
    return {"message": "Welcome to the HR-Pulse API. Visit /docs for documentation."}
