# Deployment Guide

This guide covers various deployment options for Achievement Tracker.

## Local Development

See README.md for local setup instructions.

## Docker Deployment

### Using Docker Compose

```bash
docker-compose up
```

This starts both backend and frontend services.

### Individual Containers

**Backend:**
```bash
cd backend
docker build -t achievement-tracker-backend .
docker run -p 8000:8000 achievement-tracker-backend
```

**Frontend:**
```bash
cd frontend
docker build -t achievement-tracker-frontend .
docker run -p 5173:5173 achievement-tracker-frontend
```

## Production Deployment

### Frontend (Static Hosting)

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. In `frontend/` directory: `vercel`
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com`

#### Netlify
1. Build: `cd frontend && npm run build`
2. Deploy `dist/` folder to Netlify
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com`

#### GitHub Pages
1. Build: `cd frontend && npm run build`
2. Deploy `dist/` to GitHub Pages
3. Update `vite.config.ts` base path if needed

### Backend (Server Hosting)

#### Railway
1. Connect GitHub repo
2. Select `backend/` directory
3. Set environment variables:
   - `DATABASE_URL` (Railway provides PostgreSQL)
   - `SECRET_KEY` (generate secure key)
   - `CORS_ORIGINS` (your frontend URL)
4. Deploy

#### Render
1. Create new Web Service
2. Connect GitHub repo
3. Set root directory to `backend/`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Set environment variables

#### Fly.io
1. Install Fly CLI: `flyctl install`
2. In `backend/`: `flyctl launch`
3. Set secrets: `flyctl secrets set SECRET_KEY=... DATABASE_URL=...`

#### Heroku
1. Install Heroku CLI
2. Create app: `heroku create`
3. Set config vars
4. Deploy: `git push heroku main`

### Database

For production, use PostgreSQL:

1. Update `DATABASE_URL` to PostgreSQL connection string
2. Install PostgreSQL adapter: `pip install psycopg2-binary`
3. Run migrations: `alembic upgrade head`

### Environment Variables

**Backend:**
```bash
SECRET_KEY=your-secure-secret-key-min-32-chars
DATABASE_URL=postgresql://user:pass@host:5432/dbname
CORS_ORIGINS=https://your-frontend-domain.com
ENVIRONMENT=production
```

**Frontend:**
```bash
VITE_API_URL=https://your-backend-domain.com
```

## Full Stack Deployment

### Option 1: Single Server (VPS)

1. Set up Ubuntu/Debian server
2. Install Nginx, PostgreSQL, Python, Node.js
3. Clone repo
4. Set up backend (systemd service)
5. Build frontend: `npm run build`
6. Serve frontend with Nginx
7. Configure reverse proxy for API

### Option 2: Serverless (Vercel + Railway)

- Frontend on Vercel
- Backend on Railway
- Database on Railway PostgreSQL

### Option 3: Container Platform (Kubernetes)

1. Build Docker images
2. Push to container registry
3. Deploy with Kubernetes manifests
4. Set up ingress and services

## Security Checklist

- [ ] Change `SECRET_KEY` to secure random value
- [ ] Use HTTPS (SSL/TLS certificates)
- [ ] Set proper CORS origins (no wildcards in production)
- [ ] Enable rate limiting
- [ ] Use environment variables (never commit secrets)
- [ ] Set up database backups
- [ ] Enable logging and monitoring
- [ ] Keep dependencies updated
- [ ] Use production database (PostgreSQL)
- [ ] Enable CSRF protection

## Monitoring

### Recommended Tools
- **Backend**: Sentry, LogRocket, or custom logging
- **Frontend**: Vercel Analytics, Google Analytics
- **Database**: PostgreSQL monitoring tools
- **Uptime**: UptimeRobot, Pingdom

## Backup Strategy

1. **Database**: Daily automated backups
2. **Files**: If storing uploads, backup storage
3. **Code**: Git repository (already backed up)

## Scaling Considerations

- **Database**: Use connection pooling (SQLAlchemy)
- **Caching**: Add Redis for session storage
- **CDN**: Serve static assets via CDN
- **Load Balancing**: Multiple backend instances behind load balancer

## Troubleshooting

**Backend won't start:**
- Check environment variables
- Verify database connection
- Check logs: `docker logs <container-id>`

**Frontend can't connect to backend:**
- Verify `VITE_API_URL` is set correctly
- Check CORS settings
- Verify backend is accessible

**Database errors:**
- Run migrations: `alembic upgrade head`
- Check database connection string
- Verify database exists and is accessible

---

For specific platform help, refer to their documentation or open an issue.

