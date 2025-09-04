# Vercel Environment Variables Setup

## 🔧 **EXACT VALUES TO SET IN VERCEL DASHBOARD**

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

### **Required Variables:**

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres.nwneganwcyeskpxhvtpi:NblhsupY8ieDNRf7@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `amg-cha-dashboard-secret-2024-production-key` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app` | Production |
| `NEXTAUTH_URL` | `https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects-git-main.vercel.app` | Preview |
| `NEXTAUTH_URL` | `http://localhost:3000` | Development |

### **Optional (Add when available):**

| Variable | Value | Purpose |
|----------|-------|---------|
| `YOUTUBE_API_KEY` | `your-youtube-api-key-here` | Real YouTube data |
| `FACEBOOK_ACCESS_TOKEN` | `your-facebook-token-here` | Facebook integration |

## 🚀 **DEPLOYMENT STEPS**

### **1. Set Environment Variables**
1. Go to Vercel Dashboard
2. Select your project: `social-dashboard-mvp`
3. Settings → Environment Variables
4. Add each variable above

### **2. Deploy**
```bash
# From dashboard directory
vercel --prod
```

### **3. Run Database Migration**
After deployment, the database will be automatically set up on first API call.

### **4. Test Production**
- URL: https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app
- Login: `demo@amg-cha.com` / `demo123`
- Test all features work in production

## ⚡ **QUICK COPY-PASTE VALUES**

**DATABASE_URL:**
```
postgresql://postgres.nwneganwcyeskpxhvtpi:NblhsupY8ieDNRf7@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**NEXTAUTH_SECRET:**
```
amg-cha-dashboard-secret-2024-production-key
```

**NEXTAUTH_URL (Production):**
```
https://social-dashboard-mvgllxmej-mi2371384-gmailcoms-projects.vercel.app
``` 