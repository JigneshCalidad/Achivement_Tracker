from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import date, datetime


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    display_name: str
    avatar_url: Optional[str] = None
    quote: Optional[str] = ""


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    quote: Optional[str] = None


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Achievement Schemas
class AchievementBase(BaseModel):
    title: str
    notes: Optional[str] = None
    completed: bool = False


class AchievementCreate(AchievementBase):
    """Creation payloads derive date from the path parameter, not the body."""
    pass


class AchievementUpdate(BaseModel):
    title: Optional[str] = None
    notes: Optional[str] = None
    completed: Optional[bool] = None


class AchievementResponse(AchievementBase):
    date: date
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Todo Schemas
class TodoBase(BaseModel):
    title: str
    notes: Optional[str] = None
    completed: bool = False
    priority: str = "medium"
    due_time: Optional[str] = None


class TodoCreate(TodoBase):
    """Creation payload date is inferred from the route."""
    pass


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    notes: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None
    due_time: Optional[str] = None


class TodoResponse(TodoBase):
    date: date
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Day View Schemas
class DayViewResponse(BaseModel):
    date: date
    achievements: List[AchievementResponse]
    todos: List[TodoResponse]

