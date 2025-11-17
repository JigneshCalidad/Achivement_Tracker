from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models import User, Achievement, Todo
from app.schemas import DayViewResponse, AchievementResponse, TodoResponse

router = APIRouter(prefix="/api/days", tags=["days"])


@router.get("/{day_date}", response_model=DayViewResponse)
def get_day(
    day_date: date,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get achievements and todos for a specific date"""
    achievements = db.query(Achievement).filter(
        Achievement.user_id == current_user.id,
        Achievement.date == day_date
    ).all()
    
    todos = db.query(Todo).filter(
        Todo.user_id == current_user.id,
        Todo.date == day_date
    ).all()
    
    return DayViewResponse(
        date=day_date,
        achievements=[AchievementResponse.model_validate(a) for a in achievements],
        todos=[TodoResponse.model_validate(t) for t in todos]
    )

