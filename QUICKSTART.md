# Quick Start Guide

Get Achievement Tracker running in 5 minutes!

## Prerequisites

- Python 3.11+ installed
- Node.js 18+ and npm installed
- Git installed

## Option 1: Automated Setup (Recommended)

```bash
# Run the setup script
./setup.sh
```

Then start the servers:

**Terminal 1 - Backend:**
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` and login with:
- Email: `demo@achievement-tracker.com`
- Password: `demo123`

## Option 2: Manual Setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Verify Installation

1. Backend should be running at `http://localhost:8000`
2. Check API health: `http://localhost:8000/api/health`
3. Frontend should be running at `http://localhost:5173`
4. Login with demo credentials

## Troubleshooting

**Backend won't start:**
- Ensure Python 3.11+ is installed: `python3 --version`
- Activate virtual environment: `source .venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

**Frontend won't start:**
- Ensure Node.js 18+ is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 5173 is available

**Can't login:**
- Run seed script: `cd backend && python -m app.seed`
- Check backend is running on port 8000
- Check browser console for errors

**Database errors:**
- Delete `backend/achievement_tracker.db` and run seed again
- Ensure SQLite is available

## Next Steps

- Read `README.md` for full documentation
- Check `docs/DEMO.md` for feature walkthrough
- Try exercises in `docs/EXERCISES.md`
- Review design system in `docs/DESIGN.md`

## Hosting Locally on Network

To access from other devices on your network:

**Backend:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
npm run dev -- --host
```

Then access via your machine's IP address (e.g., `http://192.168.1.100:5173`)

Update `frontend/.env`:
```
VITE_API_URL=http://YOUR_IP:8000
```

## Production Deployment

See `docs/DEPLOY.md` for deployment options:
- Vercel/Netlify (frontend)
- Railway/Render (backend)
- Docker Compose (full stack)

---

Happy tracking! 🎯

