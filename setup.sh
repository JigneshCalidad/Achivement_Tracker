#!/bin/bash

# Achievement Tracker Setup Script

echo "🚀 Setting up Achievement Tracker..."

# Backend setup
echo "📦 Setting up backend..."
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python -m app.seed
echo "✅ Backend setup complete!"
cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend
npm install
echo "✅ Frontend setup complete!"
cd ..

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the app:"
echo "  Backend:  cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "Demo credentials:"
echo "  Email: demo@achievement-tracker.com"
echo "  Password: demo123"

