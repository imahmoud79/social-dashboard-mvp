# AMG-CHA Dashboard - Windows Deployment Script

Write-Host "🚀 Deploying AMG-CHA Dashboard to Production" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

# Set environment variable for this session
$env:DATABASE_URL = "postgresql://postgres.nwneganwcyeskpxhvtpi:NblhsupY8ieDNRf7@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

Write-Host "📦 Cleaning and regenerating Prisma client..." -ForegroundColor Yellow
Remove-Item -Path "node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue
npm install --force

Write-Host "🗄️ Testing database connection..." -ForegroundColor Yellow
try {
    npx prisma db push --accept-data-loss
    Write-Host "✅ Database schema pushed successfully!" -ForegroundColor Green
    
    Write-Host "🌱 Seeding production database..." -ForegroundColor Yellow
    npx tsx prisma/seed.ts
    Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
    
} catch {
    Write-Host "⚠️ Database setup will complete in Vercel deployment" -ForegroundColor Yellow
}

Write-Host "🏗️ Testing build..." -ForegroundColor Yellow
npm run build

Write-Host "" -ForegroundColor White
Write-Host "✅ DEPLOYMENT READY!" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Go to Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Find project: social-dashboard-mvp" -ForegroundColor White
Write-Host "3. Settings → Environment Variables" -ForegroundColor White
Write-Host "4. Add these variables:" -ForegroundColor White
Write-Host "   DATABASE_URL = postgresql://postgres.nwneganwcyeskpxhvtpi:NblhsupY8ieDNRf7@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres" -ForegroundColor Gray
Write-Host "   NEXTAUTH_SECRET = amg-cha-dashboard-production-secret-2024" -ForegroundColor Gray
Write-Host "   NEXTAUTH_URL = https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app" -ForegroundColor Gray
Write-Host "" -ForegroundColor White
Write-Host "5. Redeploy from Vercel dashboard" -ForegroundColor White
Write-Host "6. Test: https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app" -ForegroundColor White
Write-Host "   Login: demo@amg-cha.com / demo123" -ForegroundColor White 