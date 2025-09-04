# Demo Setup Instructions

## Quick Demo (No API Keys Required)

For immediate testing without external API keys, follow these steps:

### 1. Environment Setup
Create `.env.local` with minimal config:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/dashboard_dev"
NEXTAUTH_SECRET="demo-secret-key-for-testing-only"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup
```bash
# Create database (if using local PostgreSQL)
createdb dashboard_dev

# Run migrations
npm run db:migrate

# Seed with demo data
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Demo Login
- URL: http://localhost:3000
- Email: `demo@amg-cha.com`
- Password: `demo123`

### 5. Demo Flow
1. Login → Dashboard shows seeded metrics
2. View connector statuses (YouTube shows "auth required")
3. Check campaign details
4. Export CSV data

## With YouTube API (Real Data)

### 1. Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable YouTube Data API v3
4. Create credentials → API Key
5. Restrict key to YouTube Data API v3

### 2. Update Environment
Add to `.env.local`:
```env
YOUTUBE_API_KEY="your-actual-api-key-here"
```

### 3. Test Real Integration
1. Restart dev server
2. Login to dashboard
3. Click "Ingest YouTube (7 days)"
4. Watch real data populate charts

## Supabase Database Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy database URL from Settings → Database

### 2. Update Environment
```env
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
```

### 3. Deploy Schema
```bash
npm run db:migrate
npm run db:seed
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database URL format
- Verify credentials and permissions

### API Key Issues
- Verify YouTube API is enabled in Google Cloud
- Check API key restrictions
- Monitor quota usage in Google Cloud Console

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Regenerate Prisma client: `npx prisma generate`
- Restart dev server 