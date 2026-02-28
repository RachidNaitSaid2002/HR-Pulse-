import pytest
from fastapi import status

def test_get_jobs_unauthorized(client):
    response = client.get("/api/v1/jobs/")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_get_jobs_authorized(client):
    # Signup and get token
    client.post(
        "/api/v1/auth/signup",
        json={"email": "jobs_test@example.com", "password": "testpassword123"}
    )
    login_response = client.post(
        "/api/v1/auth/signin",
        data={"username": "jobs_test@example.com", "password": "testpassword123"}
    )
    token = login_response.json()["access_token"]
    
    # Get jobs with token
    response = client.get(
        "/api/v1/jobs/",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)
