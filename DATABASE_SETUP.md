# Database Setup Guide

## Option 1: Using Docker (Recommended - Easiest)

### Install Docker Desktop
1. Download Docker Desktop for Windows from https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop

### Create PostgreSQL Database
Run this command in PowerShell:

```powershell
docker run --name startvora-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=startvora_dev -p 5432:5432 -d postgres:15
```

### Verify Database is Running
```powershell
docker ps
```

You should see `startvora-postgres` in the list.

### Stop/Start Database
```powershell
# Stop
docker stop startvora-postgres

# Start
docker start startvora-postgres

# Remove (if needed)
docker rm -f startvora-postgres
```

---

## Option 2: Install PostgreSQL Locally

### Download and Install
1. Go to https://www.postgresql.org/download/windows/
2. Download PostgreSQL 15 installer
3. Run installer (keep default port 5432)
4. Set password as `postgres` (or update .env file with your password)

### Create Database
Open PowerShell and run:

```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql prompt, create database:
CREATE DATABASE startvora_dev;

# Verify
\l

# Exit
\q
```

Or use pgAdmin (comes with PostgreSQL):
1. Open pgAdmin
2. Right-click "Databases" → "Create" → "Database"
3. Name: `startvora_dev`
4. Click "Save"

---

## Option 3: Use Online Database (Free Tier)

### Supabase (Recommended for testing)
1. Go to https://supabase.com
2. Sign up for free account
3. Create new project
4. Get connection string from Settings → Database
5. Update `backend/.env`:
   ```
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=postgres
   ```

### Neon (Alternative)
1. Go to https://neon.tech
2. Sign up for free
3. Create project
4. Copy connection details to `backend/.env`

---

## Verify Connection

After setting up the database, test the connection:

```powershell
cd backend
npm run start:dev
```

Look for:
- ✅ `🚀 Server running on http://localhost:3000`
- ✅ No database connection errors

If you see the server running without errors, your database is connected!

---

## Quick Test

1. Start backend: `cd backend && npm run start:dev`
2. Go to http://localhost:5173
3. Click "Sign up"
4. Create an account
5. If successful, database is working! ✅

---

## Troubleshooting

### Error: "role postgres does not exist"
```powershell
# Create postgres user
createuser -s postgres
```

### Error: "database startvora_dev does not exist"
```powershell
createdb startvora_dev
```

### Error: "password authentication failed"
Check your password in `backend/.env`:
```
DB_PASSWORD=postgres
```

### Port 5432 already in use
Another PostgreSQL instance is running. Either:
- Use that instance
- Stop it: `net stop postgresql-x64-15` (Windows)
- Change port in Docker: `-p 5433:5432`

---

## Current Configuration

Your backend is configured to connect to:
- Host: `localhost`
- Port: `5432`
- Username: `postgres`
- Password: `postgres`
- Database: `startvora_dev`

These can be changed in `backend/.env` file.
