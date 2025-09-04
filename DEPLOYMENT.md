# Deployment Guide

## 🚀 48-Hour MVP Deployment

This guide will get your AMG-CHA dashboard live on Vercel with Supabase in under 30 minutes.

### Step 1: Supabase Database Setup (10 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and name: "amg-cha-dashboard"
   - Set strong password
   - Select region closest to your users

2. **Get Database URL**
   - Go to Project Settings → Database
   - Copy "Connection string" (URI format)
   - Should look like: `postgresql://postgres:[password]@[host]:5432/postgres`

3. **Configure Database**
   ```bash
   # Update your .env.local
   DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
   ```

### Step 2: Vercel Deployment (15 minutes)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from Local**
   ```bash
   vercel
   ```
   - Follow prompts to connect GitHub repo
   - Choose "Create new project"
   - Set build settings (auto-detected)

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   DATABASE_URL = [your-supabase-url]
   NEXTAUTH_SECRET = [generate-random-32-char-string]
   NEXTAUTH_URL = [your-vercel-domain]
   YOUTUBE_API_KEY = [optional-for-live-data]
   ```

4. **Run Database Migrations**
   ```bash
   # In Vercel Functions or locally with production DB
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

### Step 3: Verification (5 minutes)

1. **Test Live URL**
   - Open your Vercel deployment URL
   - Create account or use demo credentials
   - Test dashboard functionality
   - Verify connector statuses

2. **API Testing**
   - Import Postman collection
   - Update base_url to your Vercel domain
   - Test all endpoints

## 🔧 Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random 32+ character string
- `NEXTAUTH_URL` - Your domain (auto-set by Vercel)

### Optional
- `YOUTUBE_API_KEY` - For live YouTube data
- `FACEBOOK_ACCESS_TOKEN` - For Facebook integration

## 📊 Database Schema Migration

### Development to Production
```bash
# Generate migration files
npx prisma migrate dev --name production-ready

# Deploy to production
npx prisma migrate deploy
```

### Schema Changes
```bash
# After modifying schema.prisma
npx prisma db push          # For development
npx prisma migrate deploy   # For production
```

## 🔍 Monitoring & Debugging

### Vercel Logs
```bash
vercel logs [deployment-url]
```

### Database Monitoring
- Supabase Dashboard → Database → Logs
- Monitor connection count and query performance

### API Monitoring
- Vercel Dashboard → Functions
- Monitor response times and error rates

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify Supabase project is running
   - Check IP allowlist (Supabase allows all by default)

2. **NextAuth Errors**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure cookies are enabled

3. **YouTube API Errors**
   - Verify API key is valid
   - Check quota limits in Google Cloud Console
   - Ensure YouTube Data API v3 is enabled

4. **Build Failures**
   - Check TypeScript errors: `npm run lint`
   - Verify all imports resolve
   - Clear build cache: `rm -rf .next`

### Performance Optimization

1. **Database Queries**
   - Add indexes for frequent queries
   - Use connection pooling
   - Monitor slow queries in Supabase

2. **API Response Times**
   - Cache connector responses
   - Implement pagination for large datasets
   - Use background jobs for heavy operations

## 🔐 Security Checklist

- [ ] Environment variables properly configured
- [ ] No secrets in client-side code
- [ ] API routes protected with authentication
- [ ] Database queries use parameterized statements
- [ ] CORS configured appropriately
- [ ] Rate limiting on API endpoints (future)

## 📈 Scaling Considerations

### Database
- Connection pooling with PgBouncer
- Read replicas for analytics queries
- Partitioning for metrics table by date

### API
- Background job queue (Bull/Agenda)
- Caching layer (Redis)
- Rate limiting and quotas

### Frontend
- CDN for static assets
- Image optimization
- Code splitting and lazy loading

---

**🎯 Goal**: Live dashboard in 30 minutes  
**📞 Support**: Check console logs and Vercel/Supabase dashboards for detailed error information 