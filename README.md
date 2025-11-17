# Achievement Tracker

A minimal, premium-looking webapp for tracking daily achievements and todos. Built with a glassmorphism design inspired by Apple Tahoe — featuring frosted glass panels, subtle translucency, elegant spacing, and a calm color palette.

## 🎯 Features

- **Day-by-day calendar view** with today highlighted
- **Achievements tracking** — log and celebrate daily wins
- **Todos management** — Microsoft To Do-style task tracking
- **User profile** with editable quote and avatar
- **Premium glassmorphism UI** — frosted glass panels with blur effects
- **Theme toggle** — Light/Glass and Dark/Glass themes
- **Accessibility controls** — font size adjustments
- **Weekly streak tracking** — visualize your consistency

## 🚀 Quickstart

### Prerequisites

- Python 3.11+
- Node.js 18+ and npm/yarn/pnpm
- Git

### Backend Setup

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Initialize database (creates SQLite file)
alembic upgrade head

# Seed demo data
python -m app.seed

# Run development server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

API docs available at `http://localhost:8000/docs`

### Frontend Setup

```bash
# Install dependencies
cd frontend
npm install  # or yarn/pnpm install

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Demo Credentials

- Email: `demo@achievement-tracker.com`
- Password: `demo123` (or any password for demo auth)

## 🏗️ Project Structure

```
Achivement_Tracker/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # FastAPI app entry
│   │   ├── models.py    # SQLAlchemy models
│   │   ├── schemas.py   # Pydantic schemas
│   │   ├── api/         # API routes
│   │   ├── core/        # Config, security, database
│   │   └── seed.py      # Demo data seeder
│   ├── alembic/         # Database migrations
│   └── requirements.txt
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API client
│   │   └── styles/      # Global styles
│   └── package.json
├── docs/                # Documentation
│   ├── DESIGN.md        # Design system & tokens
│   ├── EXERCISES.md     # Learning exercises
│   ├── DEMO.md          # Demo flows
│   └── ISSUES.md        # TODOs & future work
└── README.md
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### Linting

```bash
# Backend
cd backend
flake8 app/

# Frontend
cd frontend
npm run lint
```

## 📦 Build & Deploy

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Docker (Optional)

```bash
docker-compose up
```

## 🌐 Hosting

### Local Development

Both servers run on:
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

### Production Deployment

See `docs/DEPLOY.md` for deployment options:
- Vercel/Netlify (frontend)
- Railway/Render/Fly.io (backend)
- Docker Compose (full stack)

## 🎨 Design System

See `docs/DESIGN.md` for:
- Color tokens
- Glassmorphism utilities
- Typography scale
- Spacing system
- Component patterns

## 📚 Documentation

- **[DESIGN.md](docs/DESIGN.md)** — Design system and style tokens
- **[EXERCISES.md](docs/EXERCISES.md)** — Hands-on learning tasks
- **[DEMO.md](docs/DEMO.md)** — Demo flows and screenshots guide
- **[ISSUES.md](docs/ISSUES.md)** — Known issues and future enhancements

## 🛠️ Tech Stack

- **Backend**: Python 3.11+, FastAPI, SQLAlchemy, Alembic, Pydantic, JWT
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Headless UI
- **Database**: SQLite (dev), PostgreSQL-ready (prod)
- **Testing**: pytest, vitest, React Testing Library
- **CI/CD**: GitHub Actions

## 📄 License

MIT License — see LICENSE file

## 🤝 Contributing

See `docs/EXERCISES.md` for starter tasks. Contributions welcome!

---

Built with intention and attention to detail. Track your achievements, one day at a time.

