#!/bin/bash

echo "🚀 Deploying AMG-CHA Dashboard to Production"
echo "============================================"

# Set production database URL
export DATABASE_URL="postgresql://postgres.nwneganwcyeskpxhvtpi:NblhsupY8ieDNRf7@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

echo "📦 Generating Prisma client for PostgreSQL..."
npx prisma generate

echo "🗄️ Pushing database schema to Supabase..."
npx prisma db push --force-reset

echo "🌱 Seeding production database..."
npx tsx prisma/seed.ts

echo "🏗️ Building application..."
npm run build

echo "✅ Production setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - DATABASE_URL: postgresql://postgres.nwneganwcyeskpxhvtpi:NblhsupY8ieDNRf7@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
echo "   - NEXTAUTH_SECRET: (generate random 32-char string)"
echo "   - NEXTAUTH_URL: https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app"
echo "   - YOUTUBE_API_KEY: (optional for real data)"
echo ""
echo "2. Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "3. Test live URL:"
echo "   https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app"
echo "   Login: demo@amg-cha.com / demo123" 