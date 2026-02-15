
# 🚀 AlgoTerm — Full Deployment Guide (Render + Vercel)

**Backend → Render** (Free Web Service)  
**Frontend → Vercel** (Free Hobby Plan)  
**Database → Neon PostgreSQL** (Already configured)

---

## Prerequisites

- ✅ GitHub account with repo `alphah-dev/alog_trade`
- ✅ Code pushed to `main` branch
- ✅ Neon DB already running (your current database)

---

## STEP 1 — Push Latest Code to GitHub

Before deploying, make sure everything is committed and pushed.

```bash
cd d:\ale\algo-trtading-platform
git add -A
git commit -m "prepare for deployment"
git push origin main
```

Verify at: https://github.com/alphah-dev/alog_trade — all files should be up to date.

---

## STEP 2 — Deploy Backend on Render ☁️

### 2.1 — Create a Render Account

1. Go to **[render.com](https://render.com)** and click **"Get Started for Free"**
2. **Sign up with GitHub** — this grants Render access to your repos

### 2.2 — Create a New Web Service

1. On the Render Dashboard, click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"** → click **Next**
3. Find and select **`alphah-dev/alog_trade`** from the repo list
   - If it doesn't appear, click **"Configure account"** to grant Render access to the repo

### 2.3 — Configure the Service

Fill in these fields **exactly**:

| Setting            | Value                                                        |
|--------------------|--------------------------------------------------------------|
| **Name**           | `algoterm-backend` (or any name you like)                    |
| **Region**         | Singapore (closest to India) or any preferred region         |
| **Branch**         | `main`                                                       |
| **Root Directory** | `backend`                                                    |
| **Runtime**        | `Python 3`                                                   |
| **Build Command**  | `pip install -r requirements.txt`                            |
| **Start Command**  | `uvicorn app.main:app --host 0.0.0.0 --port $PORT`          |
| **Instance Type**  | `Free` (or `Starter` for 24/7 uptime — $7/mo)               |

> [!IMPORTANT]  
> Set **Root Directory** to `backend` — this tells Render to only build from that subfolder.

### 2.4 — Set Environment Variables

Scroll down to **"Environment Variables"** and add these **one by one**:

| Key              | Value                                                                                                      |
|------------------|------------------------------------------------------------------------------------------------------------|
| `DATABASE_URL`   | `postgresql+asyncpg://neondb_owner:npg_6mPaytpq2zhA@ep-patient-star-aiytr2kz-pooler.c-4.us-east-1.aws.neon.tech/neondb` |
| `PROJECT_NAME`   | `Algo Trading Platform`                                                                                    |
| `VERSION`        | `1.0.0`                                                                                                    |
| `PYTHON_VERSION` | `3.11.9`                                                                                                   |

> [!CAUTION]  
> The `DATABASE_URL` above is your actual Neon DB connection string. **Never share this publicly.** If you've accidentally exposed it, rotate the password in your Neon dashboard.

### 2.5 — Deploy

1. Click **"Create Web Service"**
2. Render will start building — this takes **3-5 minutes** the first time
3. Watch the logs for: `Uvicorn running on http://0.0.0.0:XXXX`
4. Once deployed, **copy your Render URL** from the top of the page — it will look like:
   ```
   https://algoterm-backend.onrender.com
   ```

### 2.6 — Verify Backend is Running

Open these URLs in your browser:

- **Root**: `https://algoterm-backend.onrender.com/` → should return `{"message": "Algo Trading Engine is Online"}`
- **Health**: `https://algoterm-backend.onrender.com/health` → should return `{"status": "healthy", ...}`
- **API Docs**: `https://algoterm-backend.onrender.com/docs` → Swagger UI should open

> [!NOTE]  
> Render Free Tier **spins down** after 15 min of inactivity. First request after sleep takes **~50 seconds** to wake up. This is normal.

---

## STEP 3 — Deploy Frontend on Vercel ▲

### 3.1 — Create a Vercel Account

1. Go to **[vercel.com](https://vercel.com)** and click **"Start Deploying"**
2. **Sign up with GitHub**

### 3.2 — Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find and **Import** the `alphah-dev/alog_trade` repo
   - If it doesn't appear, click **"Adjust GitHub App Permissions"** to grant access

### 3.3 — Configure the Project

Fill in these settings:

| Setting              | Value                                   |
|----------------------|-----------------------------------------|
| **Project Name**     | `algoterm` (or any name you like)       |
| **Framework Preset** | `Vite` (should auto-detect)             |
| **Root Directory**   | Click **"Edit"** → type `frontend`      |
| **Build Command**    | `npm run build` (auto-detected)         |
| **Output Directory** | `dist` (auto-detected)                  |

> [!IMPORTANT]  
> You **must** set Root Directory to `frontend` — otherwise Vercel will try to build from the project root and fail.

### 3.4 — Set Environment Variables

Expand **"Environment Variables"** and add:

| Key            | Value                                                              |
|----------------|--------------------------------------------------------------------|
| `VITE_API_URL` | `https://algoterm-backend.onrender.com/api/v1`                     |

> [!WARNING]  
> Replace `algoterm-backend` with your **actual Render service name** from Step 2.5. This is the URL your frontend uses to call the backend API.

### 3.5 — Deploy

1. Click **"Deploy"**
2. Vercel will build the frontend — takes **1-2 minutes**
3. Once done, you'll see a **"Congratulations!"** page with your live URL:
   ```
   https://algoterm.vercel.app
   ```

### 3.6 — Verify Frontend is Working

1. Open your Vercel URL
2. The app should load with the full UI
3. Navigate to the **Trading Terminal** — it should fetch stock data from your Render backend
4. Check the **Overview** page — heatmap should load (may take ~50s on first load if Render was sleeping)

---

## STEP 4 — Post-Deployment Checklist ✅

| Check                                | Status |
|--------------------------------------|--------|
| Backend root `/` returns JSON        | ☐      |
| Backend `/health` returns healthy    | ☐      |
| Backend `/docs` loads Swagger UI     | ☐      |
| Frontend loads without errors        | ☐      |
| Stock search works                   | ☐      |
| Charts load with historical data     | ☐      |
| Heatmap shows real values            | ☐      |
| Paper trading works                  | ☐      |

---

## Troubleshooting 🔧

### Backend won't build on Render

- Check **Build Logs** on Render dashboard for the exact error
- Make sure `Root Directory` is set to `backend`
- Make sure `requirements.txt` is in the `backend/` folder (it is ✅)

### Frontend shows "Network Error" or blank data

- Verify `VITE_API_URL` is set correctly in Vercel's Environment Variables
- Make sure it ends with `/api/v1` (no trailing slash)
- Check browser DevTools → Network tab for failing API calls
- The backend might be sleeping (free tier) — wait ~50s and retry

### Database connection fails

- Check `DATABASE_URL` env var on Render matches your Neon connection string
- Make sure it starts with `postgresql+asyncpg://` (not `postgres://`)
- Verify your Neon DB is active at [console.neon.tech](https://console.neon.tech)

### CORS errors in browser console

- Your backend already has `allow_origins=["*"]` ✅ — this shouldn't happen
- If it does, check that your Render URL doesn't have a trailing slash in `VITE_API_URL`

### Redeploying after code changes

- **Backend**: Push to `main` → Render auto-deploys
- **Frontend**: Push to `main` → Vercel auto-deploys
- Both platforms watch your `main` branch and redeploy automatically

---

## Architecture Diagram

```
┌─────────────────┐         ┌──────────────────────┐        ┌────────────────┐
│                 │  HTTPS   │                      │  SSL   │                │
│  Vercel (React) │────────→│  Render (FastAPI)     │──────→│  Neon Postgres │
│  Frontend       │  API     │  Backend             │  DB    │  Database      │
│                 │  calls   │                      │        │                │
└─────────────────┘         └──────────────────────┘        └────────────────┘
   algoterm.          algoterm-backend.                 neondb @ 
   vercel.app          onrender.com                  us-east-1
```
