# Cloudflare Migration Plan — YouTube Toolkit AI

**Status:** Planning only — koi code change abhi apply nahi hua
**Date:** 2026-10-26
**Target:** Cloudflare Workers (Paid) + `@opennextjs/cloudflare`
**Current host:** Vercel (fallback ke liye live rahega)

---

## TL;DR

| Item | Decision |
|---|---|
| Platform | Cloudflare Workers + OpenNext |
| Adapter | `@opennextjs/cloudflare` (vinext nahi — existing Next app hai) |
| Effort | 2–3 days realistic (first time OpenNext: 3–5 days) |
| Biggest risks | `@googleapis/youtube`, Next 16 middleware, ISR cache init |
| Go-live gate | 10-route smoke test + cron + ISR + OG image + rate limit |
| Rollback | DNS wapas Vercel pe; Vercel project delete nahi karna |

**Kyun Cloudflare ab viable hai:**

- Workers Paid: CPU 30s default (5 min tak), bundle 64 MiB, 10M requests/month included
- R2 + Durable Objects + Cron Triggers sab included/cheap
- Startup credits hosting cost cover kar denge
- Site mostly static/ISR + fetch-based API routes hai — Workers ke liye achha fit

**Kyun ye free-tier wala decision nahi hai:**

- Free Workers ka 10ms CPU Next.js SSR ke liye risky tha — paid plan se ye problem khatam
- Lekin hosting bill $5–20/month hai; $10k credits ko hosting decision ka base mat banao
- Credits ko R2, Workers, DO pe use karo; Cloudflare Images abhi zaroorat nahi

---

## Progress (2026-10-26)

- [x] `cloudflare-opennext` branch created locally + pushed to GitHub
- [x] Phase 1 adapter skeleton committed (`f80852a`)
- [x] Linux CI OpenNext build green
- [x] Phase 2 custom worker + cron committed (`835ec9c`)
- [x] Linux CI build + `wrangler deploy --dry-run` green
- [ ] R2 enabled on Cloudflare account + `yt-toolkit-cache` bucket created
- [ ] Workers Builds project connected to `cloudflare-opennext`
- [ ] Build vars + runtime secrets set in Cloudflare
- [ ] Phase 3 runtime tests on preview URL
- [ ] Phase 4 ISR + cron verification
- [ ] Phase 5 DNS cutover

> Local Windows build OpenNext ke bundling step pe `Access is denied` deta hai (known Windows/pnpm symlink issue). Isliye validation Linux CI (GitHub Actions) se ho rahi hai. Production build Workers Builds (Linux) pe hi hoga.

---

## Branch Strategy

| Branch | Purpose | Deploy target |
|---|---|---|
| `master` | Current production | **Vercel (live, untouched)** |
| `cloudflare-opennext` | Migration work | Cloudflare Workers Builds **preview** |
| `master` (after merge) | New production | Cloudflare Workers |

**Rules:**

- `master` pe Cloudflare changes merge se pehle **nahi** jaate
- `master` me `middleware.ts`, `vercel.json`, Vercel config sab as-is rahenge
- Cloudflare branch push → Workers Builds preview URL (production domain nahi)
- Vercel production sirf `master` se deploy hota hai — branch se production unaffected
- Cutover ke baad `master` merge + DNS Cloudflare pe; Vercel ka previous deployment rollback ke liye preserved
- Vercel branch preview fail ho sakta hai (Cloudflare-specific files); production pe koi asar nahi — chaho toh us branch ko Vercel me ignore kar do

---

## Current Repo Audit — kya Vercel-specific hai

| File / Area | Vercel dependency | Cloudflare impact |
|---|---|---|
| `vercel.json` | Cron, headers, redirects, build config | Cron → `wrangler.jsonc`; headers/redirects → `next.config.ts` + `public/_headers` |
| `src/middleware.ts` | Rate limiting + security headers | OpenNext Next 16 Node middleware support nahi karta → custom worker |
| `src/app/opengraph-image.tsx` | `runtime = 'edge'` | Edge runtime hatao; `next/og` test |
| `src/app/og/tool/[category]/route.tsx` | `runtime = 'edge'` | Same |
| `src/app/logo/route.tsx` | `runtime = 'edge'` | Same |
| `next.config.ts` | `serverExternalPackages: ['@googleapis/youtube']` | Workers pe test; fail → REST `fetch` replacement |
| `@vercel/analytics`, `@vercel/speed-insights` | Installed | Code me import nahi — remove kar sakte ho |
| `@sentry/nextjs` | Installed | Configured nahi — remove kar sakte ho |
| Supabase env vars | Health check me required | Runtime me use nahi — health check se hatao |
| `posthog-js`, `@upstash/ratelimit` | Installed | Grep ke hisaab se unused — remove kar sakte ho |
| `next/image` | 1 usage, already `unoptimized` | Cloudflare Images mandatory nahi |

**Achhi baatein:**

- `revalidateTag` / `revalidatePath` use nahi hua → D1 tag cache ki zaroorat nahi
- Transcript library (`youtube-transcript`) fetch-based hai → Workers pe chalni chahiye
- AI calls (Gemini/OpenRouter) fetch-based hain
- `@googleapis/youtube` sirf `src/lib/youtube/client.ts` me use hota hai → replacement contained hai

---

## Phase 0 — Pre-flight (no code)

### 0.1 Git clean

- [ ] Working tree ke 20+ modified files commit ya stash karo
- [ ] `master` branch Vercel-deployable rahe
- [ ] Migration branch: `cloudflare-opennext`

```bash
git checkout -b cloudflare-opennext
```

### 0.2 Cloudflare account

- [ ] Workers Paid active
- [ ] R2 enable (ISR incremental cache ke liye)
- [ ] Account ID note karo
- [ ] D1 / Cloudflare Images abhi enable mat karo (zaroorat nahi)

### 0.3 Domain + email

- [ ] `yttools.pro` Cloudflare zone me hai?
- [ ] MX / Email Routing records check karo (`hello@yttools.pro` break na ho)
- [ ] Nameserver change karna ho toh pehle email records verify karo
- [ ] `www` → apex redirect Cloudflare Redirect Rule se karenge

### 0.4 GitHub → Workers Builds

- [ ] Repo `geekyprem1/ytfreetoolwebsite` Cloudflare Workers Builds se connect karo
- [ ] Build Linux pe hoga — Windows/OpenNext local issue bypass
- [ ] Local `wrangler` login ki zaroorat nahi; preview URL Workers Builds dega

### 0.5 Env vars — build-time vs runtime

> **Critical:** `NEXT_PUBLIC_*` vars build time pe inline hote hain. Sirf runtime secret me set karoge toh canonical/OG/sitemap URLs galat aayenge.

**Build-time vars (Workers Builds → Build variables):**

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yttools.pro` |
| `NEXT_PUBLIC_SITE_NAME` | `YouTube Toolkit AI` |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Site description |
| `NEXT_PUBLIC_ENABLE_AI_TOOLS` | `true` |
| `NEXT_PUBLIC_ENABLE_ADS` | `false` (jab tak ads live nahi) |
| `NEXT_PUBLIC_ENABLE_CONTACT_FORM` | `true` |
| `NEXT_PUBLIC_ENABLE_BLOG` | `true` |
| `YOUTUBE_API_KEY` | Build pe rankings/trending fetch hota hai |
| `UPSTASH_REDIS_URL` | Build-time rankings cache |
| `UPSTASH_REDIS_TOKEN` | Build-time rankings cache |

**Runtime secrets (Worker → Settings → Variables and Secrets):**

| Variable | Notes |
|---|---|
| `YOUTUBE_API_KEY` | API routes |
| `GEMINI_API_KEY` | AI routes |
| `OPENROUTER_API_KEY` | AI fallback (optional) |
| `UPSTASH_REDIS_URL` | Rate limit + cache |
| `UPSTASH_REDIS_TOKEN` | Rate limit + cache |
| `CRON_SECRET` | Cron auth |

**Not needed:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, Sentry vars, PostHog vars, GA/AdSense vars (code me wired nahi).

---

## Phase 1 — Adapter Skeleton

### 1.1 Dependencies

```bash
pnpm add -D @opennextjs/cloudflare wrangler
```

Latest version use karo — `next/og` ke security fixes include hain.

### 1.2 `wrangler.jsonc` (draft)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "yt-toolkit",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-10-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "observability": {
    "enabled": true
  },
  "r2_buckets": [
    {
      "binding": "NEXT_INC_CACHE_R2_BUCKET",
      "bucket_name": "yt-toolkit-cache"
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "NEXT_CACHE_DO_QUEUE",
        "class_name": "DOQueueHandler"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["DOQueueHandler"]
    }
  ],
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "yt-toolkit"
    }
  ],
  "triggers": {
    "crons": ["15 0 * * *"]
  }
}
```

> Phase 2 ke baad `wrangler.jsonc` ka `main` field `./worker.ts` kar denge (custom worker).

### 1.3 `open-next.config.ts` (draft)

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: "long-lived",
  }),
  queue: doQueue,
  enableCacheInterception: true,
});
```

**D1 tag cache nahi chahiye** — code me `revalidateTag`/`revalidatePath` use nahi hua.

### 1.4 `next.config.ts` changes

- [ ] `vercel.json` ke security headers `headers()` me move karo
- [ ] `/tools` → `/` redirect `redirects()` me move karo
- [ ] `images.unoptimized: true` (abhi ke liye safe)
- [ ] `serverExternalPackages` test karo — OpenNext ise honor karta hai ya nahi

### 1.5 Static assets headers

`public/_headers`:

```
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable

/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

> `next.config.ts` ke headers static assets (`public/`, `_next/static`) pe apply nahi hote — isliye `_headers` chahiye.

### 1.6 Scripts + gitignore

`package.json`:

```json
{
  "scripts": {
    "cf:build": "opennextjs-cloudflare build",
    "cf:preview": "opennextjs-cloudflare preview",
    "cf:deploy": "opennextjs-cloudflare deploy"
  }
}
```

`.gitignore` me add:

```
/.open-next/
/.wrangler/
```

### 1.7 Cleanup (optional, recommended)

Grep ke hisaab se unused dependencies — remove karne se install/build fast hoga:

- `@sentry/nextjs`
- `@vercel/analytics`
- `@vercel/speed-insights`
- `posthog-js`
- `@upstash/ratelimit`

> Pehle confirm karo ki koi dynamic import ya config file inhe use nahi kar rahi.

### 1.8 First build gate

- [ ] Workers Builds pe `pnpm cf:build` green
- [ ] Preview URL open ho raha hai
- [ ] Home page render ho raha hai
- [ ] `@googleapis/youtube` build/runtime me issue de raha hai ya nahi — note karo

**Yahin pehla real risk pata chalega.**

---

## Phase 2 — Middleware Replacement (main refactor)

### 2.1 `src/middleware.ts` hatao

OpenNext Cloudflare Next 16 ka Node middleware/proxy support nahi karta. Isliye:

- Security headers → `next.config.ts` + `public/_headers`
- Rate limiting → custom worker
- `x-request-id` → custom worker
- HSTS → headers config

### 2.2 Custom worker `worker.ts` (draft)

```ts
// @ts-ignore — `.open-next/worker.js` build time pe generate hota hai
import { default as handler } from "./.open-next/worker.js";

export default {
  fetch: handler.fetch,

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(
      env.WORKER_SELF_REFERENCE.fetch(
        "https://yttools.pro/api/internal/rankings-snapshot",
        {
          headers: {
            authorization: `Bearer ${env.CRON_SECRET}`,
          },
        },
      ),
    );
  },
} satisfies ExportedHandler<CloudflareEnv>;

// DO queue ke liye re-export zaroori hai
// @ts-ignore
export { DOQueueHandler } from "./.open-next/worker.js";
```

`wrangler.jsonc`:

```jsonc
"main": "./worker.ts"
```

### 2.3 Rate limiting

**Option A — Upstash REST (recommended):** existing global sliding-window behavior same rahega.

**Option B — Cloudflare Rate Limiting binding:** simple, per-colo, approximate; abuse protection ke liye kaafi.

Agar Option B:

```jsonc
"ratelimits": [
  {
    "name": "RL_YOUTUBE",
    "namespace_id": "1001",
    "simple": { "limit": 60, "period": 60 }
  },
  {
    "name": "RL_AI",
    "namespace_id": "1002",
    "simple": { "limit": 20, "period": 60 }
  },
  {
    "name": "RL_COMPUTE",
    "namespace_id": "1003",
    "simple": { "limit": 120, "period": 60 }
  },
  {
    "name": "RL_RESOLVE",
    "namespace_id": "1004",
    "simple": { "limit": 60, "period": 60 }
  },
  {
    "name": "RL_EXTERNAL",
    "namespace_id": "1005",
    "simple": { "limit": 80, "period": 60 }
  }
]
```

Worker me `env.RL_AI.limit({ key })` etc.

### 2.4 IP source badlo

- Vercel: `x-forwarded-for`
- Cloudflare: `cf-connecting-ip` (preferred), fallback `x-forwarded-for`

Rate limit key `cf-connecting-ip` se banao, warna spoofing possible hai.

### 2.5 Test

- [ ] `/api/youtube/*` pe 429 + `Retry-After`
- [ ] `/api/ai/*` pe 20/min limit
- [ ] `X-RateLimit-*` headers
- [ ] Security headers response me
- [ ] `x-request-id` response me

---

## Phase 3 — Runtime Compatibility

### 3.1 `@googleapis/youtube`

- [ ] Pehle as-is test karo
- [ ] Fail hua toh `src/lib/youtube/client.ts` ke andar REST `fetch` se replace karo
- [ ] Exports same rakho — baaki app untouched rahega

**Kyun safe hai:** poora googleapis usage sirf ek file me hai.

### 3.2 `youtube-transcript`

- [ ] Transcript route test: `/api/youtube/transcript?v=...`
- [ ] Language probe + caption parsing test
- [ ] `youtube-transcript` fetch-based hai, Node built-ins use nahi karta

### 3.3 OG routes

- [ ] `src/app/opengraph-image.tsx` se `runtime = 'edge'` hatao
- [ ] `src/app/og/tool/[category]/route.tsx` se hatao
- [ ] `src/app/logo/route.tsx` se hatao
- [ ] `/opengraph-image`, `/og/tool/<category>`, `/logo` test karo
- [ ] Fail hua toh `workers-og` fallback

### 3.4 AI routes

- [ ] Gemini call test
- [ ] OpenRouter fallback test
- [ ] Timeout behavior test (30s CPU paid plan pe fine)
- [ ] Streaming nahi hai, toh simple JSON response

### 3.5 Images

- [ ] `images.unoptimized: true` set karo
- [ ] `next/image` ka ek usage already `unoptimized` hai
- [ ] Cloudflare Images abhi mat kharido

---

## Phase 4 — ISR + Cron

### 4.1 R2 incremental cache

- [ ] R2 bucket `yt-toolkit-cache` create
- [ ] `NEXT_INC_CACHE_R2_BUCKET` binding
- [ ] `WORKER_SELF_REFERENCE` service binding
- [ ] `open-next.config.ts` me R2 cache + regional cache
- [ ] Deploy init se build-time cache R2 me populate

### 4.2 ISR pages test

| Page | Revalidate |
|---|---|
| `/` | 1 hour |
| `/youtube-rankings` | 6 hours |
| `/youtube-rankings/most-subscribed` | 6 hours |
| `/youtube-rankings/fastest-growing` | 6 hours |
| `/youtube-trending` | 3 hours |
| `/youtube-trending/[country]` | 3 hours |
| `/youtube-views-ratio-calculator` | 6 hours |

- [ ] R2 me cache objects aa rahe hain
- [ ] Revalidation ke baad fresh content
- [ ] Cold start pe page render ho raha hai

### 4.3 Cron

- [ ] `wrangler.jsonc` me `triggers.crons: ["15 0 * * *"]`
- [ ] `worker.ts` scheduled handler
- [ ] `CRON_SECRET` set
- [ ] Manual trigger test (Cloudflare dashboard → Cron Triggers → Trigger)
- [ ] Response 200 + snapshot write

> Vercel cron `Authorization: Bearer <CRON_SECRET>` bhejta tha; Cloudflare me ye header manually set karna padega.

---

## Phase 5 — Cutover

### 5.1 Smoke test — 10 critical routes

- [ ] `/`
- [ ] `/youtube-thumbnail-downloader` (ya koi simple tool)
- [ ] `/youtube-title-generator` (AI route)
- [ ] `/youtube-transcript-extractor`
- [ ] `/youtube-tags-extractor`
- [ ] `/youtube-rankings`
- [ ] `/blog`
- [ ] `/sitemap.xml`
- [ ] `/robots.txt`
- [ ] `/opengraph-image`

Plus:

- [ ] `/api/youtube/video-stats?v=...`
- [ ] `/api/ai/generate-titles` (POST)
- [ ] `/api/internal/health`
- [ ] Rate limit 429
- [ ] Cron
- [ ] ISR revalidation

### 5.2 Domain cutover

- [ ] `workers.dev` preview pe sab green
- [ ] Custom domain `yttools.pro` add
- [ ] `www.yttools.pro` → apex redirect
- [ ] DNS TTL pehle se low rakho
- [ ] SSL/TLS mode: Full (strict)

### 5.3 SEO checks

- [ ] Canonical URLs `https://yttools.pro`
- [ ] OG image URL absolute
- [ ] `sitemap.xml` URLs correct
- [ ] `robots.txt` correct
- [ ] `/tools` → `/` 301
- [ ] `/blog/youtube-seo-tips-2026` → `/blog/youtube-seo-tips-2027` 301
- [ ] `NEXT_PUBLIC_SITE_URL` build-time pe set tha

### 5.4 Monitoring

- [ ] `/api/internal/health` se Supabase env check hatao (warna false 503)
- [ ] UptimeRobot health check
- [ ] Cloudflare observability logs on
- [ ] Sentry abhi nahi — baad me `@sentry/cloudflare` + custom worker wrapper

### 5.5 Rollback

- [ ] Vercel project delete mat karo
- [ ] DNS wapas Vercel pe point karne ka plan
- [ ] Cutover ke 1–2 hafte baad Vercel cleanup decide karo

---

## File-by-File Change Map

| File | Action |
|---|---|
| `package.json` | Add OpenNext/wrangler; add `cf:*` scripts; remove unused deps |
| `wrangler.jsonc` | New |
| `open-next.config.ts` | New |
| `worker.ts` | New (custom worker) |
| `src/middleware.ts` | Delete on branch |
| `next.config.ts` | Move headers/redirects; `images.unoptimized`; test `serverExternalPackages` |
| `public/_headers` | New |
| `src/app/opengraph-image.tsx` | Remove `runtime = 'edge'` |
| `src/app/og/tool/[category]/route.tsx` | Remove `runtime = 'edge'` |
| `src/app/logo/route.tsx` | Remove `runtime = 'edge'` |
| `src/app/api/internal/health/route.ts` | Remove Supabase env requirements |
| `src/lib/youtube/client.ts` | Only if googleapis fails — REST `fetch` replacement |
| `.gitignore` | Add `.open-next/`, `.wrangler/` |
| `vercel.json` | Keep for fallback until cutover; then decide |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| `@googleapis/youtube` Workers pe fail | API routes break | Test first; REST `fetch` replacement (1 file) |
| Next 16 + OpenNext edge case | Build/runtime errors | Latest adapter; Workers Builds preview; Vercel fallback |
| ISR cache init galat | Stale/empty pages | R2 + DO queue config; deploy init; manual revalidation test |
| OG image fail | Social previews break | Remove edge runtime; test `next/og`; `workers-og` fallback |
| Build-time env miss | Wrong canonical/OG URLs | Build vars separately set karo |
| Windows local build | Cannot preview locally | Workers Builds (Linux) use karo |
| Rate limit per-colo | Limits approximate | Upstash REST choose karo exact global limits ke liye |
| Cron secret mismatch | Snapshot job 401 | Manual trigger test; secret verify |
| Cloudflare cache rule galat | Stale HTML | "Cache Everything" page rule mat lagao |

---

## Timeline

| Day | Work |
|---|---|
| Day 1 | Phase 0 + Phase 1: branch, adapter, wrangler config, first build green, preview URL |
| Day 2 | Phase 2 + Phase 3: custom worker, rate limit, cron, OG routes, googleapis test |
| Day 3 | Phase 4 + Phase 5: ISR cache, smoke tests, domain cutover, monitoring |
| Buffer | 1–2 days for surprises (OpenNext/Next 16) |

**Total: 2–3 days realistic.**

---

## Open Decisions (tumhare input chahiye)

1. **Rate limit:** Upstash REST (global, exact) ya Cloudflare binding (simple, per-colo)?
   - Recommendation: Upstash REST.
2. **`@googleapis/youtube`:** test-first ya REST replacement abhi?
   - Recommendation: test-first, fail pe REST.
3. **Health route:** Supabase env check hata dein?
   - Recommendation: haan, Supabase runtime me use nahi hota.
4. **Unused deps:** Sentry/Vercel analytics/PostHog/Upstash ratelimit remove karein?
   - Recommendation: haan, migration se pehle.
5. **Cutover timing:** pre-launch Cloudflare ya Vercel pe launch karke parallel migration?
   - Recommendation: agar launch 1 week se zyada door hai toh pre-launch Cloudflare.

---

## What NOT To Do

- `master` branch pe direct migration mat karo — alag branch
- DNS cutover se pehle `vercel.json` / `middleware.ts` delete mat karo
- `NEXT_PUBLIC_*` vars sirf runtime secrets me mat daalo — build vars me bhi chahiye
- Cloudflare "Cache Everything" page rule mat lagao
- Cloudflare Images abhi mat kharido — ek hi `next/image` usage hai
- Supabase/Sentry migration me mat ghuso — runtime me use nahi ho rahe
- `vinext` pe switch mat karo — existing Next app ke liye OpenNext sahi path hai

---

## References

- OpenNext Cloudflare overview: https://opennext.js.org/cloudflare
- OpenNext caching: https://opennext.js.org/cloudflare/caching
- OpenNext custom worker: https://opennext.js.org/cloudflare/howtos/custom-worker
- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare Rate Limiting binding: https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- Next.js 16 Proxy (Node runtime): https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- Workers Builds: https://developers.cloudflare.com/workers/ci-cd/builds/

---

**Next step:** Phase 0 ke 5 inputs complete karo, phir `cloudflare-opennext` branch pe Phase 1 start hoga.
