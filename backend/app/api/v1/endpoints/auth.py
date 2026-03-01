from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Import our own security and database helpers
from app.api import deps
from app.core import security
from app.core.config import settings
from app.models.user import User
from app.schemas.user import Token, UserCreate, UserResponse

# Create the router for these authentication paths
router = APIRouter()

@router.post("/signup", response_model=UserResponse)
def signup(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    """
    Register a new user in the system.
    1. Checks if the email already exists.
    2. Hashes the password for security.
    3. Saves the new user to the database.
    """
    # Look for a user with the same email
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists.",
        )
    
    # Create the new User object
    # We NEVER store plain text passwords. We hash them first!
    user = User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
    )
    
    # Add and save to database
    db.add(user)
    db.commit()
    db.refresh(user) # Get the newly created ID from the database
    return user

@router.post("/signin", response_model=Token)
def signin(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Log in an existing user.
    1. Verifies the email and password.
    2. Creates a secure "access token" (JWT) so the user stays logged in.
    """
    # 1. Find the user by their email (entered as 'username' in the form)
    user = db.query(User).filter(User.email == form_data.username).first()
    
    # 2. Check if user exists and if the password matches the hash we stored
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Create a token that expires after some time (usually 30 mins)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # 4. Return the token to the frontend
    return {"access_token": access_token, "token_type": "bearer"}
