from fastapi import status


def test_signup(client):
    """
    Test successful user registration.
    Verifies that a new user can be created and the response contains the correct email.
    """
    response = client.post(
        "/api/v1/auth/signup",
        json={"email": "unique_signup@example.com", "password": "testpassword123"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["email"] == "unique_signup@example.com"

def test_signin(client):
    """
    Test successful user sign-in.
    1. Registers a test user.
    2. Attempts to sign in with matching credentials.
    3. Verifies that a JWT access token is returned.
    """
    # Step 1: Register the user
    client.post(
        "/api/v1/auth/signup",
        json={"email": "signin_test@example.com", "password": "testpassword123"}
    )
    
    # Step 2: Sign in
    response = client.post(
        "/api/v1/auth/signin",
        data={"username": "signin_test@example.com", "password": "testpassword123"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_signin_invalid_password(client):
    """
    Test sign-in failure with an incorrect password.
    Verifies that the system correctly rejects invalid credentials with a 401 Unauthorized status.
    """
    # Register a user
    client.post(
        "/api/v1/auth/signup",
        json={"email": "wrong_pass@example.com", "password": "testpassword123"}
    )
    
    # Try to sign in with the wrong password
    response = client.post(
        "/api/v1/auth/signin",
        data={"username": "wrong_pass@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
