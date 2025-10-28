# 🚀 Railway Deployment - Step by Step

## Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Login"** or **"Sign Up"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account

## Step 2: Deploy Your Project

1. After logging in, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find your repo: `driving-school-website`
4. Click **"Deploy Now"**

Railway will automatically:
- Detect it's a Node.js app
- Install dependencies (`npm install`)
- Start your server (`node server.js`)
- Give you a URL: `your-project.railway.app`

## Step 3: Add Environment Variables

**This is CRITICAL for your site to work!**

1. In your Railway project, click **"Variables"**
2. Add these one by one:

```env
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
PORT=4242
```

**Important:** Replace all values with your actual credentials!

## Step 4: Update Your Domain

When you deploy, Railway gives you a URL like:
`driving-school-website-production.up.railway.app`

Update this in `server.js` line 29:
```javascript
const YOUR_DOMAIN = "https://driving-school-website-production.up.railway.app";
```

Or set it as environment variable:
```env
YOUR_DOMAIN=https://driving-school-website-production.up.railway.app
```

## Step 5: Update Stripe Return URLs

1. Go to your Stripe Dashboard
2. Update your return_url to use your Railway domain
3. In `server.js`, change line 55 to:
```javascript
return_url: `${YOUR_DOMAIN}/registration.html?session_id={CHECKOUT_SESSION_ID}`,
```

## Step 6: Add Custom Domain (Optional)

1. In Railway project, click **"Settings"**
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Add your custom domain (e.g., `rajputdrivingschool.com`)
5. Update DNS records as shown by Railway
6. Wait 5 minutes for DNS to propagate

## ✅ You're Done!

Your site should now be live at:
- Railway URL: `https://your-project.up.railway.app`
- Or custom domain if you set one up

## 🔧 Troubleshooting

**Site not loading?**
- Check Railway logs: Click your project → "Deployments" → Click latest
- Make sure port is set to 4242

**Can't access?**
- Make sure environment variables are all set
- Check that `YOUR_DOMAIN` matches your Railway URL

**Stripe not working?**
- Use **live** Stripe keys (not test keys)
- Update return_url to your Railway domain

## 📊 Check Your Deployment

- **Logs:** Railway → Your Project → "Deployments" → Click latest → "View Logs"
- **Metrics:** See CPU, Memory, Requests in Railway dashboard
- **Logs:** All console.log() from your server.js will appear here

## 🔄 Auto-Deploy

Railway automatically deploys every time you push to GitHub main branch!

Just:
```bash
git add .
git commit -m "Update"
git push
```

And Railway will redeploy automatically!

## 💰 Pricing

Railway free tier includes:
- $5 credit per month
- Your app uses very little (probably free forever!)
- 500 hours/month free compute
- Perfect for your small website

