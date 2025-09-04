#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Setting up AMG-CHA Dashboard for local development...\n');

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('📝 Creating .env.local...');
  const envContent = `# Local Development Environment
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="local-development-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Add your YouTube API key for real data
# YOUTUBE_API_KEY="your-youtube-api-key-here"
`;
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local with SQLite configuration\n');
} else {
  console.log('✅ .env.local already exists\n');
}

// Use SQLite schema for local development
if (fs.existsSync('prisma/schema-sqlite.prisma')) {
  console.log('📦 Switching to SQLite for local development...');
  fs.copyFileSync('prisma/schema.prisma', 'prisma/schema-postgres.prisma.bak');
  fs.copyFileSync('prisma/schema-sqlite.prisma', 'prisma/schema.prisma');
  console.log('✅ Using SQLite schema\n');
}

try {
  console.log('🔄 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('🔄 Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  
  console.log('\n🎉 Setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. npm run dev');
  console.log('2. Open http://localhost:3000');
  console.log('3. Login with demo@amg-cha.com / demo123');
  console.log('\n💡 To use real YouTube data:');
  console.log('1. Get YouTube Data API v3 key from Google Cloud Console');
  console.log('2. Add YOUTUBE_API_KEY to .env.local');
  console.log('3. Restart the dev server');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Ensure Node.js 18+ is installed');
  console.log('2. Try: rm -rf node_modules && npm install');
  console.log('3. Check .env.local configuration');
  process.exit(1);
} 