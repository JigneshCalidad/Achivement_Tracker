from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models import User, Achievement
from app.schemas import AchievementCreate, AchievementUpdate, AchievementResponse

router = APIRouter(prefix="/api/achievements", tags=["achievements"])


@router.post("/{day_date}", response_model=AchievementResponse, status_code=status.HTTP_201_CREATED)
def create_achievement(
    day_date: date,
    achievement: AchievementCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new achievement for a specific date"""
    db_achievement = Achievement(
        user_id=current_user.id,
        title=achievement.title,
        notes=achievement.notes,
        date=day_date,
        completed=achievement.completed
    )
    
    db.add(db_achievement)
    db.commit()
    db.refresh(db_achievement)
    
    return db_achievement


@router.patch("/{achievement_id}", response_model=AchievementResponse)
def update_achievement(
    achievement_id: int,
    achievement_update: AchievementUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an achievement"""
    db_achievement = db.query(Achievement).filter(
        Achievement.id == achievement_id,
        Achievement.user_id == current_user.id
    ).first()
    
    if not db_achievement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Achievement not found"
        )
    
    update_data = achievement_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_achievement, field, value)
    
    db.commit()
    db.refresh(db_achievement)
    
    return db_achievement


@router.delete("/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_achievement(
    achievement_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an achievement"""
    db_achievement = db.query(Achievement).filter(
        Achievement.id == achievement_id,
        Achievement.user_id == current_user.id
    ).first()
    
    if not db_achievement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Achievement not found"
        )
    
    db.delete(db_achievement)
    db.commit()
    
    return None

