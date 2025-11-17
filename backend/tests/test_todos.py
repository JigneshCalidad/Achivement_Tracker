import pytest
from datetime import date

from app.models import User, Todo


def test_create_todo(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create todo
    today = date.today().isoformat()
    response = client.post(
        f"/api/todos/{today}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test todo", "priority": "high", "completed": False}
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Test todo"
    assert response.json()["priority"] == "high"


def test_update_todo(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create todo
    today = date.today().isoformat()
    create_response = client.post(
        f"/api/todos/{today}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test todo", "completed": False}
    )
    todo_id = create_response.json()["id"]

    # Update todo
    response = client.patch(
        f"/api/todos/{todo_id}",
        headers={"Authorization": f"Bearer {token}"},
        json={"completed": True, "priority": "low"}
    )
    assert response.status_code == 200
    assert response.json()["completed"] is True
    assert response.json()["priority"] == "low"

