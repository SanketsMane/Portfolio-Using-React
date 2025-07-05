# Vercel Deployment Guide with Environment Variables

## 🚀 Quick Vercel Deployment Steps

### Step 1: Deploy Backend First
1. Go to [vercel.com](https://vercel.com) and login
2. Click "New Project"
3. Import your GitHub repository: `Portfolio-Using-React`
4. Set **Root Directory** to `backend`
5. **Environment Variables** - Copy/paste these:

```
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://contactsanket1:bTpObtEuepU9hdVe@cluster0.55hgudp.mongodb.net/Portfolio-website?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=sanket-portfolio-super-secret-key-2024-admin-auth
ADMIN_EMAIL=contactsanket1@gmail.com
ADMIN_PASSWORD=YourSecurePassword123!
GITHUB_TOKEN=ghp_YOUR_GITHUB_TOKEN_HERE
GITHUB_USERNAME=SanketsMane
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contactsanket1@gmail.com
EMAIL_PASS=YOUR_GMAIL_APP_PASSWORD
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
SESSION_SECRET=your_random_session_secret
```

6. Click **Deploy**
7. **Copy the backend URL** (e.g., `https://portfolio-backend-xyz.vercel.app`)

### Step 2: Deploy Frontend
1. Click "New Project" again
2. Import the same repository
3. Set **Root Directory** to `.` (root)
4. **Environment Variables** - Add this one:

```
VITE_API_URL=https://your-backend-url-from-step1.vercel.app/api
```

5. Click **Deploy**

### Step 3: Update CORS
1. Go back to your **backend deployment**
2. Go to Settings > Environment Variables
3. Update `CORS_ORIGIN` to your frontend URL:
```
CORS_ORIGIN=https://your-frontend-url.vercel.app
```
4. Redeploy the backend

## 🔑 Required Credentials to Update:

### 1. GitHub Token
- Go to GitHub Settings > Developer settings > Personal access tokens
- Generate new token with `repo` permissions
- Replace `ghp_YOUR_GITHUB_TOKEN_HERE`

### 2. Gmail App Password
- Go to Google Account Settings > Security > 2-Step Verification
- Generate App Password for "Mail"
- Replace `YOUR_GMAIL_APP_PASSWORD`

### 3. Admin Password
- Choose a secure password
- Replace `YourSecurePassword123!`

## ✅ That's it! Your portfolio will be live on Vercel!

**Frontend URL:** `https://your-project-name.vercel.app`
**Backend API:** `https://your-backend-name.vercel.app/api`

### 🎯 Features Working:
- ✅ GitHub projects auto-sync
- ✅ Admin dashboard
- ✅ Contact form with email
- ✅ Resume upload/download
- ✅ MongoDB data storage
- ✅ Responsive design
- ✅ Dark/light theme
