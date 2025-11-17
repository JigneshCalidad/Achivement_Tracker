"""
Seed script to create demo user and sample data
Run with: python -m app.seed
"""
from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session

from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models import User, Achievement, Todo

# Create tables
Base.metadata.create_all(bind=engine)


def seed_database():
    db: Session = SessionLocal()
    
    try:
        # Check if demo user exists
        demo_user = db.query(User).filter(User.email == "demo@achievement-tracker.com").first()
        
        if demo_user:
            print("Demo user already exists. Skipping seed.")
            return
        
        # Create demo user
        demo_user = User(
            email="demo@achievement-tracker.com",
            hashed_password=get_password_hash("demo123"),
            display_name="Alice",
            avatar_url="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
            quote="Every small step forward is progress. Celebrate the journey."
        )
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)
        
        # Get today's date
        today = date.today()
        
        # Create sample achievements for today
        achievements = [
            Achievement(
                user_id=demo_user.id,
                title="Completed morning workout",
                notes="30 minutes of yoga and stretching",
                date=today,
                completed=True
            ),
            Achievement(
                user_id=demo_user.id,
                title="Finished reading chapter 5",
                notes="Made great progress on the book",
                date=today,
                completed=True
            ),
            Achievement(
                user_id=demo_user.id,
                title="Called mom",
                notes="Had a nice 20-minute conversation",
                date=today,
                completed=False
            ),
        ]
        
        # Create sample todos for today
        todos = [
            Todo(
                user_id=demo_user.id,
                title="Review project proposal",
                notes="Need to check the budget section",
                date=today,
                completed=False,
                priority="high",
                due_time="14:00"
            ),
            Todo(
                user_id=demo_user.id,
                title="Buy groceries",
                notes="Milk, eggs, bread, vegetables",
                date=today,
                completed=True,
                priority="medium",
                due_time="18:00"
            ),
            Todo(
                user_id=demo_user.id,
                title="Write blog post draft",
                notes="Topic: productivity tips",
                date=today,
                completed=False,
                priority="low"
            ),
        ]
        
        # Add achievements and todos
        for achievement in achievements:
            db.add(achievement)
        for todo in todos:
            db.add(todo)
        
        db.commit()
        
        # Add some data for yesterday
        yesterday = today - timedelta(days=1)
        yesterday_achievements = [
            Achievement(
                user_id=demo_user.id,
                title="Attended team meeting",
                notes="Great discussion on Q4 goals",
                date=yesterday,
                completed=True
            ),
        ]
        yesterday_todos = [
            Todo(
                user_id=demo_user.id,
                title="Prepare presentation slides",
                date=yesterday,
                completed=True,
                priority="high"
            ),
        ]
        
        for achievement in yesterday_achievements:
            db.add(achievement)
        for todo in yesterday_todos:
            db.add(todo)
        
        db.commit()
        
        print(f"✅ Seeded database successfully!")
        print(f"   Demo user: demo@achievement-tracker.com")
        print(f"   Password: demo123")
        print(f"   Created {len(achievements)} achievements and {len(todos)} todos for today")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

