# 🚀 Vercel Deployment Guide — YouTube Toolkit AI

> **Bhai, ye guide follow karo step-by-step. 15 minute mein app live ho jayegi.**
> Agar kahi atk ho toh neeche **"Common Errors"** section dekh lena.

---

## 📋 Prerequisites (Pehle ye cheezein ready rakho)

### 1. GitHub Account
Code GitHub pe hona chahiye (public ya private, dono chalega).

### 2. Vercel Account (Free)
👉 https://vercel.com/signup
**GitHub se sign up karna** — taaki repo directly connect ho jaye.

### 3. API Keys / Service Keys
Ye sab ready rakho (`.env.local` se copy kar sakte ho):

| Service | Env Var | Kahan se milega |
|---------|---------|------------------|
| YouTube Data API v3 | `YOUTUBE_API_KEY` | https://console.cloud.google.com → APIs & Services → Credentials |
| Google Gemini | `GEMINI_API_KEY` | https://aistudio.google.com/apikey |
| Upstash Redis | `UPSTASH_REDIS_URL`, `UPSTASH_REDIS_TOKEN` | https://console.upstash.com → create database |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | https://supabase.com → Project Settings → API |
| PostHog (optional) | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | https://posthog.com → Project Settings |
| Sentry (optional) | `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` | https://sentry.io → Settings |
| Google Analytics (optional) | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | https://analytics.google.com |
| OpenRouter (optional fallback AI) | `OPENROUTER_API_KEY` | https://openrouter.ai/keys |

### 4. Custom Domain (Optional)
Agar `yttoolkit.com` jaisa custom domain use karna hai toh DNS access ready rakho.

---

## 🪜 Step 1: Code GitHub pe push karo

Agar code abhi tak GitHub pe nahi hai:

```bash
# yt-toolkit folder mein jao
cd yt-toolkit

# Git initialize karo (agar nahi kiya)
git init

# Saari files add karo
git add .

# Pehla commit
git commit -m "Initial commit: YouTube Toolkit AI"

# GitHub pe repo banao (browser mein) → uska URL copy karo
# Phir remote add karo:
git remote add origin https://github.com/YOUR_USERNAME/yt-toolkit.git

# Push karo
git branch -M main
git push -u origin main
```

> ⚠️ **Check:** `.gitignore` mein `.env.local` listed hai (hai already) — secrets GitHub pe nahi jayenge.

---

## 🪜 Step 2: Vercel pe project import karo

1. 👉 https://vercel.com/new
2. **"Import Git Repository"** section mein apna GitHub repo dhundo
3. **"Import"** button dabao

> Agar pehli baar GitHub connect kar rahe ho toh Vercel permission maangega — **"Authorize"** kar do.

---

## 🪜 Step 3: Build Settings verify karo

Vercel automatically detect kar lega ki ye Next.js project hai. Bas itna verify karo:

| Setting | Value |
|---------|-------|
| Framework Preset | **Next.js** (auto-detected) |
| Build Command | `pnpm build` (auto-detected) |
| Output Directory | `.next` (auto-detected) |
| Install Command | `pnpm install --frozen-lockfile` (auto-detected) |
| Root Directory | `yt-toolkit` (agar repo ka root alag hai) |

> ℹ️ **Note:** `vercel.json` file pehle se configured hai — security headers aur `/tools` → `/` redirect set hai.

---

## 🪜 Step 4: Environment Variables enter karo

> 🔴 **Ye step sabse important hai.** Bina env vars ke API routes crash honge.

**"Environment Variables"** section mein ye sab add karo:

### Required (MVP ke liye zaroori):

```
YOUTUBE_API_KEY=AIza...your_key
GEMINI_API_KEY=AIza...your_key
UPSTASH_REDIS_URL=https://...upstash.io
UPSTASH_REDIS_TOKEN=your_token
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key
CRON_SECRET=generate_a_random_secret_string
```

### Site Configuration:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=YouTube Toolkit AI
NEXT_PUBLIC_SITE_DESCRIPTION=Free YouTube creator toolkit with 15+ tools. No login required.
```

> 💡 **Tip:** Jab tak custom domain set nahi hai, Vercel ka preview URL use karo (e.g. `https://yt-toolkit.vercel.app`).

### Feature Flags:

```
NEXT_PUBLIC_ENABLE_AI_TOOLS=true
NEXT_PUBLIC_ENABLE_ADS=false
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
NEXT_PUBLIC_ENABLE_BLOG=true
```

### Optional (Analytics & Monitoring):

```
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
NEXT_PUBLIC_ADSENSE_ENABLED=false
OPENROUTER_API_KEY=sk-or-...
```

> 💡 **Pro Tip:** Har env var ke liye **Environment** select karo: **Production, Preview, Development** — teeno mein set karo (ya kam se kam Production).

---

## 🪜 Step 5: Deploy dabao 🎉

**"Deploy"** button dabao. Vercel ab:
1. `pnpm install --frozen-lockfile` chalega
2. `pnpm build` chalega
3. App deploy ho jayegi

**2-3 minute lagenge.** Jab "Congratulations" screen aaye, app live hai! 🎊

> 📝 Pehli deployment ka URL hoga: `https://yt-toolkit-xxxxx.vercel.app`

---

## 🪜 Step 6: Custom Domain add karo (Optional)

1. Vercel Dashboard → apna project kholo
2. **Settings** → **Domains**
3. Apna domain enter karo (e.g. `yttoolkit.com`)
4. **"Add"** dabao
5. DNS records dikhenge — apne domain registrar (GoDaddy, Namecheap, Cloudflare) mein ye add karo:
   - **A Record** → `76.76.21.21` (ya jo Vercel de)
   - **CNAME** → `cname.vercel-dns.com` (www ke liye)
6. SSL automatically provision hoga (5-10 min)
7. `NEXT_PUBLIC_SITE_URL` env var update karke custom domain set kar do

---

## 🪜 Step 7: Post-Deploy Testing

### ✅ Health Check
Browser mein kholo:
```
https://your-deployment.vercel.app/api/internal/health
```
Ye JSON return karega:
```json
{
  "status": "ok",
  "checks": [
    { "name": "app", "status": "ok" },
    { "name": "redis", "status": "ok", "latencyMs": 45 },
    { "name": "env", "status": "ok" }
  ]
}
```

Agar `status: "degraded"` ya `"down"` aaye toh env vars check karo.

### ✅ Homepage Test
- `https://your-deployment.vercel.app/` kholo
- Homepage properly render ho raha hai?
- Dark mode toggle kaam kar raha hai?

### ✅ API Route Test
- `https://your-deployment.vercel.app/api/youtube/resolve?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Ye video info + suggested tools return karega

### ✅ Tool Page Test
- `https://your-deployment.vercel.app/thumbnail-downloader` kholo
- Ek YouTube URL daal ke test karo

### ✅ Sitemap Test
- `https://your-deployment.vercel.app/sitemap.xml` kholo
- Saare tool URLs list honi chahiye

---

## 🪜 Step 8: Uptime Monitoring (Recommended)

1. 👉 https://uptimerobot.com (free account banao)
2. **"Add New Monitor"**
3. Type: **HTTP(s)**
4. URL: `https://your-domain.com/api/internal/health`
5. Interval: **5 minutes**
6. Email alerts on

---

## 🪜 Step 9: Future Deployments

Aage se jab bhi code update karo:

```bash
git add .
git commit -m "your changes"
git push origin main
```

Vercel **automatically** detect karega aur **auto-deploy** kar dega. Kuch nahi karna! 🚀

---

## ⚠️ Common Errors & Solutions

### Error: "Module not found" / Build fail
**Cause:** Dependencies install nahi ho paayi.
**Fix:**
- Check karo ki `pnpm-lock.yaml` GitHub pe pushed hai
- Vercel Dashboard → Project → Settings → **"Install Command"** = `pnpm install --frozen-lockfile`

### Error: "Environment Variable not defined"
**Cause:** Env var Vercel pe set nahi hai.
**Fix:**
- Vercel Dashboard → Project → Settings → **"Environment Variables"**
- Missing var add karo
- **Redeploy** karo (Deployments → ⋮ → Redeploy)

### Error: API returns 500 / "Internal Error"
**Cause:** API key galat hai ya service down hai.
**Fix:**
- `/api/internal/health` kholo — `checks` array mein dekho kya down hai
- API keys verify karo (YouTube, Gemini, etc.)
- Vercel → Project → **Functions** tab → logs check karo

### Error: "Rate limited" (429)
**Cause:** Upstash Redis set nahi hai, in-memory fallback chal raha hai.
**Fix:**
- `UPSTASH_REDIS_URL` aur `UPSTASH_REDIS_TOKEN` Vercel pe set karo
- Redeploy

### Error: Images not loading (YouTube thumbnails)
**Cause:** `next.config.ts` mein `remotePatterns` set hain — check karo sahi hain.
**Fix:**
- Already configured hai: `i.ytimg.com`, `img.youtube.com`, `yt3.ggpht.com`, `yt3.googleusercontent.com`
- Agar aur domains chahiye toh `next.config.ts` update karo

### Error: Middleware not working
**Cause:** Edge runtime pe middleware chalti hai — koi Node.js-specific API use nahi karni chahiye.
**Fix:**
- Current middleware compatible hai (sirf `crypto.randomUUID` use karta hai — Edge pe supported)
- Agar koi Node.js module import kiya toh error aayega

### Error: Build OOM (Out of Memory)
**Cause:** Next.js 16 build heavy hai.
**Fix:**
- Vercel free tier mein 4GB RAM milti build pe — usually enough
- Agar fail ho toh `next.config.ts` mein:
  ```ts
  experimental: {
    memoryLimit: 2048
  }
  ```

---

## 💰 Vercel Free Tier Limits

| Resource | Free Tier Limit |
|----------|-----------------|
| Bandwidth | 100 GB / month |
| Build Minutes | 6,000 / month |
| Function Executions | 100,000 / month |
| Max Duration (API route) | 10 seconds (free), 60 seconds (Pro) |
| Concurrent Builds | 1 at a time |

> ⚠️ Agar traffic badh jaye toh **Vercel Pro** ($20/month) le lena — limits badh jayenge + 60s function duration milega (AI streaming ke liye zaroori).

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deploy Docs:** https://nextjs.org/docs/app/building-your-application/deploying
- **Project Issues:** GitHub Issues tab

---

## ✅ Deployment Checklist

- [ ] Code GitHub pe pushed
- [ ] Vercel pe project imported
- [ ] Saare env vars set (Production + Preview)
- [ ] Build successful
- [ ] `/api/internal/health` returns `status: ok`
- [ ] Homepage loads properly
- [ ] API route test passed (`/api/youtube/resolve`)
- [ ] Tool page test passed (`/thumbnail-downloader`)
- [ ] Sitemap.xml accessible
- [ ] Custom domain added (if applicable)
- [ ] SSL active (https://)
- [ ] UptimeRobot monitor set up
- [ ] `NEXT_PUBLIC_SITE_URL` updated with final domain

---

**Bas itna hi! App live hai. 🎉🚀**