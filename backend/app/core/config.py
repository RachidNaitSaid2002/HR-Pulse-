class Settings:
    SECRET_KEY: str = "your-super-secret-jwt-key" # In production, this should be in an env var
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()
