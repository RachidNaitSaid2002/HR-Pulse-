import pytest
from fastapi import status

def test_signup(client):
    response = client.post(
        "/api/v1/auth/signup",
        json={"email": "unique_signup@example.com", "password": "testpassword123"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["email"] == "unique_signup@example.com"

def test_signin(client):
    # First signup
    client.post(
        "/api/v1/auth/signup",
        json={"email": "signin_test@example.com", "password": "testpassword123"}
    )
    
    # Then signin
    response = client.post(
        "/api/v1/auth/signin",
        data={"username": "signin_test@example.com", "password": "testpassword123"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_signin_invalid_password(client):
    client.post(
        "/api/v1/auth/signup",
        json={"email": "wrong_pass@example.com", "password": "testpassword123"}
    )
    
    response = client.post(
        "/api/v1/auth/signin",
        data={"username": "wrong_pass@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
