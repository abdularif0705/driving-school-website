# Deployment Guide - Driving School Website

## 🌐 Hosting Options for Your Website

Your website is a **Node.js + HTML + Static files** setup, which is different from React apps. Here are your options:

## 🎯 Recommended: Vercel or Netlify (Easiest)

### **Vercel** (Recommended)

**Perfect for:** Static sites + Node.js API routes

**Setup:**
1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. In your project folder: `vercel`
4. Push to GitHub
5. Connect GitHub repo to Vercel
6. Auto-deploys on every push!

**What you get:**
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Auto-deploy from GitHub
- ✅ Works with your `server.js` as API routes
- ✅ Free tier (generous limits)

**Configuration:**
- Your `server.js` routes become API endpoints
- Static files (HTML, CSS, images) served automatically
- Environment variables set in Vercel dashboard

### **Netlify** (Alternative)

Similar to Vercel, good for static + serverless functions

**Setup:**
```bash
npm install -g netlify-cli
netlify deploy
```

## 🐳 Option 2: Railway or Render (Node.js Apps)

### **Railway** (Best for Node.js)

**Perfect for:** Full Node.js apps with database

**Setup:**
1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repo
4. Set environment variables
5. Done! Auto-deploys

**Why Railway:**
- Handles Node.js servers perfectly
- Built-in PostgreSQL (if needed later)
- $5/month free credit
- Auto-restarts on crashes

### **Render** (Similar to Railway)

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables

## ☁️ Option 3: Traditional Hosting (cPanel, etc.)

### **Traditional Hosting Providers**

**Good for:** Already have hosting

**Providers:**
- **Hostinger** ($2.99/month)
- **Namecheap** ($1.88/month)
- **DigitalOcean** ($6/month)
- **Linode** ($5/month)

**Setup process:**
1. Get hosting account
2. Access via FTP/SFTP or File Manager
3. Upload all files
4. Set up Node.js in hosting panel
5. Install dependencies: `npm install`
6. Start server: `node server.js`
7. Use PM2 to keep it running: `pm2 start server.js`

## 🚀 GitHub Actions for Auto-Deployment

Yes, you can use GitHub Actions! Here's a simple workflow:

### Create: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

Then:
1. Go to Vercel project settings
2. Copy your tokens
3. Add them as GitHub Secrets

## 📝 For Your Current Setup (HTML + Node.js)

**Best approach:**

1. **Frontend (HTML/CSS/JS files)** → Static hosting (Vercel/Netlify)
2. **Backend (server.js)** → Railway or Render
3. **Or all-in-one on Railway** → Easiest

## 🔧 Environment Variables Setup

Wherever you deploy, add these:

```env
STRIPE_SECRET_KEY=sk_live_xxx
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

## 🎯 My Recommendation

**Use Railway for everything:**

1. It handles Node.js perfectly
2. Auto-deploy from GitHub
3. Free tier to start
4. Easy environment variable setup
5. Your HTML files + server.js work together

**Steps:**
1. Push code to GitHub (if not already)
2. Go to railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repo
5. Railway auto-detects Node.js
6. Add environment variables
7. Done! Your site is live at: `your-project.railway.app`

**Domain setup:**
- Railway gives you: `project.railway.app`
- Add custom domain in Railway dashboard
- Point your domain DNS to Railway
- Free SSL automatically!

## ⚠️ Important Notes

- Your website is **NOT React** - it's traditional HTML
- No `npm run build` needed
- Just upload files + run `node server.js`
- Formspree forms will keep working as-is
- Stripe works the same in production (use live keys)

## 🚀 Quick Start

**Easiest option:**

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Deploy to Railway
# Just go to railway.app and connect GitHub
# Takes 2 minutes!
```

**That's it!** Your site will be live automatically.

