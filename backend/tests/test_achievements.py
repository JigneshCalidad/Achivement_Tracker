import pytest
from datetime import date

from app.models import User, Achievement


def test_create_achievement(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create achievement
    today = date.today().isoformat()
    response = client.post(
        f"/api/achievements/{today}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test achievement", "notes": "Test notes", "completed": False}
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Test achievement"


def test_get_day_with_achievements(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create achievement
    today = date.today().isoformat()
    client.post(
        f"/api/achievements/{today}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test achievement", "completed": False}
    )

    # Get day
    response = client.get(
        f"/api/days/{today}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert len(response.json()["achievements"]) == 1
    assert response.json()["achievements"][0]["title"] == "Test achievement"


def test_update_achievement(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create achievement
    today = date.today().isoformat()
    create_response = client.post(
        f"/api/achievements/{today}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test achievement", "completed": False}
    )
    achievement_id = create_response.json()["id"]

    # Update achievement
    response = client.patch(
        f"/api/achievements/{achievement_id}",
        headers={"Authorization": f"Bearer {token}"},
        json={"completed": True}
    )
    assert response.status_code == 200
    assert response.json()["completed"] is True


def test_delete_achievement(client, test_user):
    # Login first
    login_response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create achievement
    today = date.today().isoformat()
    create_response = client.post(
        f"/api/achievements/{today}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test achievement", "completed": False}
    )
    achievement_id = create_response.json()["id"]

    # Delete achievement
    response = client.delete(
        f"/api/achievements/{achievement_id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 204

