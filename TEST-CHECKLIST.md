# 🧪 AMG-CHA Dashboard - Testing Checklist

## ✅ **CORE FUNCTIONALITY TESTS**

### Authentication
- [ ] Landing page loads (http://localhost:3000)
- [ ] Sign up with new email works
- [ ] Login with demo credentials (`demo@amg-cha.com` / `demo123`) works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Sign out works and redirects to home

### Dashboard
- [ ] Dashboard loads after login
- [ ] KPI cards show data (Views, Subscribers, Videos, ROI)
- [ ] Charts render with seeded data
- [ ] Connector panel shows all 5 platforms with correct statuses
- [ ] Quick actions section visible

### Campaign Management
- [ ] Campaign list shows "YouTube AMG Demo" and "Facebook AMG Demo"
- [ ] "View Details" links work
- [ ] Campaign details page loads with metrics
- [ ] Date range selector changes data (7/14/30 days)
- [ ] CSV export downloads file

### Data Ingestion
- [ ] "Ingest YouTube (7 days)" button works (shows error without API key)
- [ ] With YouTube API key: ingestion succeeds and updates dashboard
- [ ] Loading states show during ingestion
- [ ] Success/error messages display properly

## 🔧 **TECHNICAL TESTS**

### API Endpoints
Test these in browser dev tools or Postman:

**Public Endpoints**:
- [ ] `POST /api/auth/signup` - Creates new user
- [ ] NextAuth signin works

**Protected Endpoints** (requires login):
- [ ] `GET /api/campaigns` - Returns campaign list
- [ ] `GET /api/campaigns/[id]` - Returns specific campaign
- [ ] `GET /api/metrics` - Returns metrics data
- [ ] `GET /api/connectors` - Returns connector statuses
- [ ] `POST /api/ingest/youtube?days=7` - Ingests YouTube data

### Database
Open Prisma Studio (http://localhost:5555):
- [ ] User table has demo user
- [ ] Campaign table has 2 demo campaigns
- [ ] Metric table has ~35 seeded metrics
- [ ] All relationships work (Campaign → Metrics)

### Error Handling
- [ ] Invalid login shows error message
- [ ] Missing API key shows proper error
- [ ] Network failures show user-friendly messages
- [ ] Protected routes redirect properly

## 🚀 **DEPLOYMENT TESTS**

### Local Development
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run start` serves built app
- [ ] Environment variables load from `.env.local`

### Database Operations
- [ ] `npx prisma studio` opens database viewer
- [ ] `npm run db:seed` populates demo data
- [ ] Schema changes work with `npx prisma db push`

### Production Readiness
- [ ] No console errors in browser
- [ ] No TypeScript compilation errors
- [ ] All imports resolve correctly
- [ ] Environment variables properly configured

## 📱 **UI/UX TESTS**

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768px width)
- [ ] Works on mobile (375px width)
- [ ] Charts resize properly
- [ ] Navigation works on all screen sizes

### User Experience
- [ ] Loading states show during API calls
- [ ] Error messages are clear and helpful
- [ ] Success feedback is visible
- [ ] Navigation is intuitive
- [ ] Forms validate properly

## 🔌 **CONNECTOR SYSTEM TESTS**

### YouTube Connector
- [ ] Shows "auth required" without API key
- [ ] Shows "connected" with valid API key
- [ ] Real data ingestion works with API key
- [ ] Error handling for invalid API key

### Stub Connectors
- [ ] Facebook shows "auth required"
- [ ] Instagram shows "coming soon"
- [ ] TikTok shows "coming soon"
- [ ] X shows "coming soon"
- [ ] All have proper descriptions

## 🎯 **DEMO PREPARATION TESTS**

### 2-3 Minute Demo Flow
1. [ ] **Login** (15 seconds)
   - Navigate to localhost:3000
   - Enter demo credentials
   - Dashboard loads smoothly

2. [ ] **Architecture Overview** (30 seconds)
   - Point out connector panel
   - Explain pluggable system
   - Show YouTube ready, others coming

3. [ ] **Data Ingestion** (45 seconds)
   - Click "Ingest YouTube" 
   - Show error handling OR real data (if API key)
   - Charts update in real-time

4. [ ] **Campaign Analytics** (45 seconds)
   - Click "View Details" on campaign
   - Show detailed metrics and charts
   - Demonstrate CSV export

5. [ ] **Technical Highlights** (30 seconds)
   - Mention security (server-side APIs)
   - Note deployment readiness
   - Preview roadmap

### Presentation Points
- [ ] "Pluggable architecture enables rapid platform expansion"
- [ ] "Real YouTube data when API key provided"
- [ ] "Production-ready with Vercel + Supabase"
- [ ] "Full TypeScript coverage and proper error handling"

## 🚨 **TROUBLESHOOTING TESTS**

### Common Issues
- [ ] Server restart fixes module resolution issues
- [ ] Clear `.next` folder if build issues
- [ ] Check console for detailed error messages
- [ ] Verify all environment variables are set

### Performance
- [ ] Page load < 2 seconds
- [ ] Chart rendering < 1 second
- [ ] API responses < 500ms locally
- [ ] No memory leaks during navigation

---

## 🎉 **SUCCESS CRITERIA**

**✅ MVP COMPLETE** when all core functionality tests pass:
- Authentication works
- Dashboard displays data
- Connectors show proper status
- Campaign details functional
- API endpoints respond correctly

**🚀 DEMO READY** when presentation flow is smooth and all technical highlights work as expected.

**📊 PRODUCTION READY** when deployment tests pass and performance metrics are met. 