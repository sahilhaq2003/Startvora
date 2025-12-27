# Startvora Development Setup Guide

## 🚀 Quick Start - You Are Here!

✅ **Documentation pushed to GitHub**  
✅ **Project structure created**  
✅ **Frontend initialized (React + TypeScript + Vite)**  
✅ **Backend initialized (NestJS + TypeScript)**  

---

## 📁 Current Project Structure

```
Startvora/
├── frontend/              # React + TypeScript + Vite (Running on :5173)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/               # NestJS + TypeScript
│   ├── src/
│   ├── test/
│   └── package.json
├── shared/                # Shared types and utilities
├── docs/                  # All design documentation
│   ├── README.md
│   ├── FEATURES.md
│   ├── TECH_STACK.md
│   ├── USER_WORKFLOWS.md
│   ├── WIREFRAMES.md
│   ├── MVP_ROADMAP.md
│   ├── QUICK_START.md
│   ├── PROJECT_SUMMARY.md
│   └── INDEX.md
├── .gitignore
├── .env.example
├── package.json           # Root workspace
└── README.md
```

---

## ✅ What's Completed

### 1. Documentation Phase ✅
- Complete design package (222 KB, ~120,000 words)
- All 7 modules fully specified (500+ features)
- Technical architecture defined
- User workflows mapped
- UI/UX wireframes created
- MVP roadmap established

### 2. Repository Setup ✅
- Git repository initialized
- Pushed to GitHub: https://github.com/sahilhaq2003/Startvora.git
- Project structure created
- Workspaces configured

### 3. Frontend Setup ✅
- React 18 with TypeScript
- Vite for build tool
- Development server running on http://localhost:5173/

### 4. Backend Setup ✅
- NestJS framework
- TypeScript configured
- Project scaffolded

---

## 🎯 Next Development Steps

### Phase 1: Core Infrastructure (Week 1-2)

#### 1. Database Setup
```bash
# Install PostgreSQL locally or use Docker
docker run --name startvora-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15

# Install Redis
docker run --name startvora-redis -p 6379:6379 -d redis:7
```

#### 2. Backend - Authentication Module
- [ ] Set up TypeORM with PostgreSQL
- [ ] Create User entity
- [ ] Implement JWT authentication
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)

#### 3. Frontend - Authentication UI
- [ ] Login page
- [ ] Signup page
- [ ] Email verification page
- [ ] Password reset flow
- [ ] Auth context/state management

### Phase 2: Onboarding (Week 3)
- [ ] 6-step onboarding wizard (frontend)
- [ ] User profile API (backend)
- [ ] Business profile setup
- [ ] Industry and goals selection
- [ ] Interactive tutorial

### Phase 3: Dashboard (Week 4)
- [ ] Dashboard layout with sidebar
- [ ] KPI cards (revenue, orders, customers, tasks)
- [ ] Revenue trend chart
- [ ] Today's tasks widget
- [ ] Quick action button

### Phase 4: Business Planning (Week 5-8)
- [ ] AI idea generator (OpenAI integration)
- [ ] Business plan builder
- [ ] SWOT analysis tool
- [ ] PDF export functionality

---

## 🛠️ Development Commands

### Install Dependencies
```bash
# Root workspace
npm install

# Frontend only
cd frontend && npm install

# Backend only
cd backend && npm install
```

### Run Development Servers
```bash
# Run both frontend and backend
npm run dev

# Frontend only (Vite)
cd frontend && npm run dev
# Opens at http://localhost:5173

# Backend only (NestJS)
cd backend && npm run start:dev
# Opens at http://localhost:4000
```

### Build for Production
```bash
# Build everything
npm run build

# Frontend only
npm run build:frontend

# Backend only
npm run build:backend
```

### Testing
```bash
# Run all tests
npm test

# Frontend tests
npm run test:frontend

# Backend tests
npm run test:backend
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

---

## 📦 Required Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### Essential Variables:
- `DATABASE_*` - PostgreSQL connection
- `REDIS_*` - Redis connection
- `JWT_SECRET` - Secret for JWT tokens
- `SENDGRID_API_KEY` - For email sending
- `OPENAI_API_KEY` - For AI features
- `STRIPE_*` - For payments (later)

---

## 🔧 Technology Stack (Implemented)

### Frontend
- ✅ React 18
- ✅ TypeScript
- ✅ Vite (build tool)
- ⏳ Material-UI (to install)
- ⏳ Redux Toolkit (to install)
- ⏳ React Router (to install)

### Backend
- ✅ NestJS 10
- ✅ TypeScript
- ⏳ TypeORM (to configure)
- ⏳ PostgreSQL (to setup)
- ⏳ Redis (to setup)
- ⏳ Passport JWT (to implement)

### Infrastructure
- ⏳ Docker Compose (to create)
- ⏳ GitHub Actions (to setup)
- ⏳ AWS deployment (later)

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/auth-system

# Make changes and commit
git add .
git commit -m "feat: implement authentication system"

# Push to GitHub
git push origin feature/auth-system

# Create Pull Request on GitHub
```

---

## 🎯 Sprint 1 Goals (Next 2 Weeks)

### Must Complete:
1. ✅ Project setup and structure
2. ⏳ Database configuration (PostgreSQL + TypeORM)
3. ⏳ Authentication system (backend + frontend)
4. ⏳ User registration and login
5. ⏳ Basic dashboard layout

### Success Criteria:
- Users can sign up and log in
- Dashboard displays after login
- Data persists in PostgreSQL
- Tests written for auth system

---

## 📊 Progress Tracking

### Week 1 (Current Week)
- [x] Documentation complete
- [x] Git repository setup
- [x] Project structure created
- [x] Frontend initialized
- [x] Backend initialized
- [ ] Database setup
- [ ] Auth backend implementation
- [ ] Auth frontend UI

### Week 2
- [ ] Complete authentication system
- [ ] Email verification
- [ ] Basic dashboard
- [ ] User profile management

---

## 🚨 Common Issues & Solutions

### Port Already in Use
```bash
# Frontend (default :5173)
# Change in vite.config.ts: server: { port: 3000 }

# Backend (default :3000)
# Change in main.ts: app.listen(4000)
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker ps

# View logs
docker logs startvora-postgres

# Connect manually
psql -h localhost -U postgres -d startvora_dev
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Resources

### Official Docs
- [React](https://react.dev)
- [NestJS](https://nestjs.com)
- [TypeORM](https://typeorm.io)
- [Material-UI](https://mui.com)
- [Vite](https://vitejs.dev)

### Internal Docs
- [Feature Specifications](docs/FEATURES.md)
- [Tech Stack Details](docs/TECH_STACK.md)
- [MVP Roadmap](docs/MVP_ROADMAP.md)

---

## 🎉 You're All Set!

**Current Status:**
- ✅ Foundation complete
- 🚧 Development starting
- ⏳ MVP in 4 months

**Next Action:**
1. Set up PostgreSQL and Redis (see Phase 1 above)
2. Start implementing authentication system
3. Review Sprint 1 goals

**Questions?**
- Check docs in `/docs` folder
- Create GitHub issue
- Review setup steps above

---

**Happy Coding! Let's build something amazing! 🚀**

Last Updated: December 27, 2025
