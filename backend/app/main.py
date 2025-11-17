from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import engine, Base
from app.api import auth, user, days, achievements, todos

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Achievement Tracker API",
    description="Backend API for Achievement Tracker",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(days.router)
app.include_router(achievements.router)
app.include_router(todos.router)


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "environment": settings.ENVIRONMENT}

