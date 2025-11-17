import pytest
from datetime import date

from app.models import User


def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_login_success(client, test_user):
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_invalid_email(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "nonexistent@example.com", "password": "password"}
    )
    assert response.status_code == 401


def test_get_current_user(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Get user info
    response = client.get(
        "/api/user/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
    assert response.json()["display_name"] == "Test User"


def test_update_user_quote(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Update quote
    response = client.patch(
        "/api/user/me",
        headers={"Authorization": f"Bearer {token}"},
        json={"quote": "New quote"}
    )
    assert response.status_code == 200
    assert response.json()["quote"] == "New quote"

