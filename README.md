# AMG-CHA Social Dashboard

A comprehensive social media analytics and campaign management dashboard built with Next.js 14, featuring real-time metrics ingestion from multiple platforms.

## 🚀 Demo Features

- **Live YouTube Integration**: Real metrics from YouTube Data API v3
- **Multi-Platform Architecture**: Pluggable connectors for Facebook, Instagram, TikTok, X (Twitter)
- **Real-Time Analytics**: Interactive charts and KPI dashboards
- **Campaign Management**: ROI tracking and cost analysis
- **Authentication**: Secure login with NextAuth.js
- **Modern UI**: Beautiful, responsive design with Tailwind CSS

## 🏗️ Architecture

```
Frontend (Next.js 14 + TypeScript + Tailwind)
├── Authentication (NextAuth.js)
├── Dashboard (Charts + KPIs)
└── Campaign Management

Backend (Next.js Route Handlers)
├── API Routes (/api/*)
├── Connector System (Pluggable)
└── Data Ingestion

Database (PostgreSQL + Prisma)
├── Users (Auth)
├── Campaigns (Platform configs)
└── Metrics (Time-series data)

Connectors (Pluggable Architecture)
├── YouTube (✅ Live API)
├── Facebook (🔑 Requires token)
├── Instagram (⏳ Coming soon)
├── TikTok (⏳ Pending approval)
└── X/Twitter (⏳ Requires paid API)
```

## 🛠️ Tech Stack

- **Frontend**: React + Next.js 14 (App Router, TypeScript) + Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Backend**: Next.js Route Handlers (server actions)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Credentials provider)
- **Cloud**: Vercel (app) + Supabase (database)
- **APIs**: YouTube Data API v3, Facebook Graph API

## 📦 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or Supabase)
- YouTube Data API v3 key (optional for demo)

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd dashboard
   npm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dashboard_dev"
   NEXTAUTH_SECRET="your-secret-key-here"
   YOUTUBE_API_KEY="your-youtube-api-key-here"  # Optional for demo
   ```

3. **Database setup**
   ```bash
   npm run db:migrate    # Run migrations
   npm run db:seed      # Populate with demo data
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Access the app**
   - Open http://localhost:3000
   - Demo credentials: `demo@amg-cha.com` / `demo123`

## 🎯 Demo Script (2-3 minutes)

1. **Login** → Navigate to http://localhost:3000 → Sign in with demo credentials
2. **Dashboard Overview** → See KPI cards, connector status panel
3. **Connector Architecture** → Show YouTube ✅ connected, others ⏳ coming soon
4. **Data Ingestion** → Click "Ingest YouTube (7 days)" → Watch chart update
5. **Campaign Details** → Click "View Details" on YouTube campaign → Show detailed analytics
6. **Export** → Demonstrate CSV export functionality
7. **Security** → Mention env vars, server-side API calls, protected routes

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in (handled by NextAuth)

### Data Ingestion
- `POST /api/ingest/youtube?days=7` - Ingest YouTube metrics

### Data Retrieval
- `GET /api/campaigns` - List all campaigns
- `GET /api/campaigns/[id]` - Get specific campaign
- `GET /api/metrics?campaignId=X&days=7` - Get metrics data
- `GET /api/connectors` - Get connector statuses

## 🔌 Connector System

All connectors implement the same interface:

```typescript
interface Connector {
  id: 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'x';
  getProfile(): Promise<any>;
  getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]>;
}
```

### Status by Platform

- **YouTube**: ✅ Live (YouTube Data API v3)
- **Facebook**: 🔑 Ready (needs Page access token)
- **Instagram**: ⏳ Stubbed (needs Business API setup)
- **TikTok**: ⏳ Stubbed (pending API approval)
- **X (Twitter)**: ⏳ Stubbed (requires paid API tier)

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `YOUTUBE_API_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Database Setup (Supabase)

1. Create new Supabase project
2. Copy database URL to `DATABASE_URL`
3. Run migrations: `npm run db:migrate`
4. Seed data: `npm run db:seed`

## 📈 Roadmap (Next 2 Weeks)

### Sprint 1: OAuth & Real Integrations
- [ ] Facebook/Instagram OAuth flow
- [ ] TikTok Business API integration
- [ ] X API v2 integration (paid tier)
- [ ] Background job scheduling

### Sprint 2: Advanced Analytics
- [ ] Custom date range picker
- [ ] Advanced metrics (CTR, CPC, CPA)
- [ ] Campaign comparison views
- [ ] Alert system for performance thresholds

### Sprint 3: Production Readiness
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Error budgets & monitoring
- [ ] Performance optimization

## 🛡️ Security

- Server-side API calls only (no client-side secrets)
- Protected routes with NextAuth session guards
- Input validation with Zod
- Secure password hashing with bcrypt
- Environment variable management

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio

### Testing with Postman

Import `AMG-CHA-Dashboard.postman_collection.json` into Postman to test all API endpoints.

## 📞 Support

For questions or issues:
1. Check the console for detailed error messages
2. Verify environment variables are set correctly
3. Ensure database is running and accessible
4. Check API key permissions and quotas

---

**Built with ❤️ for AMG-CHA** | v0.1-mvp
