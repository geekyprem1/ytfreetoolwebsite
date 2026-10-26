# TASKS — Competitor Gaps (yttools.co)

Goal: yttools.co ke paas jo tools/features hain aur hamare paas nahi, woh add karna. Sirf woh jo SEO traffic la sakte hain aur policy-safe hain.
Source: yttools.co ka sitemap + `/tools` page (28 Sep 2026). Priority mera andaza hai; search volume Keyword Planner / Search Console se confirm karna.

Status legend: `[ ]` pending · `[~]` in progress · `[x]` done

---

## Ground rules

1. **Naya tool pattern** wahi hai jo `TASKS-NEW-TOOLS.md` → Ground rules mein hai: `page.tsx` + `client.tsx` (last child `<RelatedTools currentSlug=… />`) + `src/content/tool-seo/<slug>.tsx` (min 6 FAQs, 900–1400 words) + `tools-metadata.ts` entry. `answerFirst` mandatory.
2. **API route pattern**: `validate → getCachedOrFetch → apiSuccessResponse`, `catch → apiErrorResponse(handleApiError(err))`.
3. **Quota**: sirf 1-unit calls (`channels.list`, `videos.list`). `search.list` (100 units) nahi.
4. **Verify before done**: `pnpm typecheck` + `pnpm build` pass. Lint baseline = **8 errors, 10 warnings** (pre-existing); koi naya error nahi.
5. **Nahi banayenge**: YouTube downloader / MP3 / MP4 (ToS + AdSense + API key risk), Channel Finder (`search.list` = 100 units), Pro keyword volume (paid data chahiye).

---

## Phase 0 — Rankings wrap-up (pehle ye)

- [x] **0.1 — Revalidate 3h → 6h** ✅ Saare 4 rankings pages `revalidate = 21600`, `TTL.rankingsPool` 6h. ISR writes ~aadhe.
  Files: `src/app/(site)/youtube-rankings/**/page.tsx`, `src/lib/cache/cache-policies.ts`
- [x] **0.2 — Redis pipelines merge** ✅ `loadBaseline()` + `trackingSince()` → ek `loadGrowthHistory()` (29 EXISTS + 1 HGETALL). Per render ≈58 → 30 commands.
  File: `src/lib/rankings/snapshots.ts`, `src/lib/rankings/rankings.ts`
- [x] **0.3 — Top 100 HTML halka** ✅ Per-cell utility classes → `.rk*` CSS (`src/styles/globals.css`). Row 1,648 → 672 bytes. Top 100: HTML 528 → 311 KB, RSC 276 → 165 KB (total −42%). Filter pages 310 → 202 KB. Live-count links plain `<a>` (100 `Link` prefetches hataye).
  File: `src/components/rankings/channel-table.tsx`
- [ ] **0.4 — Commit** rankings feature (user ke bolne pe).

---

## Phase 1 — Quick wins (high traffic, kam mehnat)

- [x] **1.1 — YouTube Tag Generator** · `/youtube-tag-generator` · AI ✅
  Topic + optional focus keywords → 10–40 tags grouped primary / related / long-tail. Click-to-exclude, live 500-char meter (commas + spaces-in-tag +2, Studio jaisa), "Trim to fit", copy/download comma-separated.
  Files: `src/app/api/ai/generate-tags/route.ts`, `src/lib/youtube/tag-budget.ts` (sanitize, count, dedupe, salvage), `tagGenerationPrompt`, `tagGeneratorSchema`.
  Robustness: AI output sanitize (`#`, `<`, `>`, `"`, emoji hataye), truncated JSON se complete tags salvage, 1 retry. Local test (OpenRouter): 5/6 topics pass with full 30 tags; baaki failure provider ka empty response tha (neeche note).

- [x] **1.2 — Channel Age Checker** · `/youtube-channel-age-checker` · API (1 unit) ✅
  Creation date, exact age (years/months/days, month-end safe), total days, videos/year, subs/day, views/day. `?url=` deep link.
  Files: naya `src/app/api/youtube/channel-overview/route.ts` (raw numbers + `publishedAt`, 1.3 bhi use karta hai), `src/lib/youtube/channel-age.ts`, shared `src/components/tools/channel-lookup-form.tsx`.

- [x] **1.3 — Views-to-Subscribers Ratio Calculator** · `/youtube-views-ratio-calculator` ✅
  Do mode: channel URL (auto-fetch) ya manual. Views/sub, avg views/video, avg video reach (% of subs), subs/video.
  Benchmark real data se: Top-100 rankings ka median (abhi ~598 views/sub, ~16.6% reach), page ISR 6h. Fake "good/bad" bands nahi daale.
  File: `src/lib/youtube/views-ratio.ts`.

- [x] **1.4 — Subscribe Link Generator** · `/youtube-subscribe-link-generator` · client-only ✅
  @handle / bare handle / `/channel/UC…` / `/c/` / `/user/` URLs → `?sub_confirmation=1` link + Test link + HTML (escaped) + Markdown snippets. Koi API call nahi. QR code skip kiya (nayi dependency lagti).
  File: `src/lib/youtube/subscribe-link.ts`.

> ⚠️ **AI note:** local `.env.local` sirf OpenRouter use karta hai (`AI_MODEL=meta/muse-spark-1.2-contributor`, Gemini key empty). Ye model kabhi-kabhi empty response deta hai. Isse saare AI tools pe asar hota hai, sirf Tag Generator pe nahi. Production mein `GEMINI_API_KEY` set ho to Gemini primary rahega.

---

## Phase 2 — Transcript Extractor upgrade (unka core tool)

- [x] **2.1 — Export formats** ✅ TXT (timestamps ke saath / bina), SRT, VTT, JSON (start/end/duration).
  Shared lib: `src/lib/youtube/transcript-format.ts`. Subtitle Downloader bhi ab isi ko use karta hai (+ JSON button + language menu). `-->` cue text mein neutralise hota hai taaki SRT/VTT na toote.
- [x] **2.2 — Timestamp toggle + stats** ✅ "Show timestamps" preview, Copy aur TXT teeno pe lagta hai. Bina timestamps ke text 4s+ pause pe paragraphs mein toot jaata hai. Stats: words, characters, reading time (238 wpm), video covered.
- [x] **2.3 — Language selector** ✅ + **bug fix**: pehle API hamesha `lang=en` maangta tha, isliye sirf Hindi/Bengali/Punjabi captions wale videos "Transcript unavailable" dete the. Ab API video ki saari caption languages nikaalta hai (cached 30 din) aur English → English variant → pehla track chunta hai. `de` → `de-DE`, `pt` → `pt-BR` match hota hai. Live test: 7/7 videos (6 Indian trending) pass.
  File: `src/app/api/youtube/transcript/route.ts`. Invalid video ID ab 400 deta hai.
- [x] **2.4 — SEO copy** ✅ Title description, `answerFirst`, HowTo steps, keywords update. FAQs: duplicate timestamp FAQ hataya, 3 naye (formats, bina timestamps, languages). Naya section "Which transcript format should you download?".
  ✅ Pehle se maujood unsourced "40-60 char titles ~21% higher CTR" claim transcript, title, aur tags copy se hata diya.

---

## Phase 3 — Small text tools (ek saath banao)

Sab client-only hain, API call nahi. Ek shared layout component bana sakte ho.

- [x] **3.1 — Title Length Checker** · `/youtube-title-length-checker` ✅ live char counter (code points, emoji = 1), 100 max, colour bar, desktop (~60) + mobile (~40) truncation previews. Client-only.
- [x] **3.2 — Title Capitalizer** · `/youtube-title-capitalizer` ✅ Title / Sentence / UPPER / lower, per-style copy + char count. Title Case minor-words lowercase, and **preserves brand casing** (iPhone, macOS) when the input already has it. Client-only.
- [x] **3.3 — Description Extractor** · `/youtube-description-extractor` ✅ full description + copy/TXT download, plus detected links, hashtags, chapter timestamps. Reuses `/api/youtube/video-stats` (1 unit) — no new API.
- [x] **3.4 — Title Extractor** · `/youtube-title-extractor` ✅ exact title + channel + char count + copy. Same API as 3.3.

Shared: `src/lib/youtube/title-text.ts` (case + length) and `src/lib/youtube/description-parse.ts` (links/hashtags/chapters). All 4 registered + in sitemap; build now 248 pages. Video Info tool skip kiya — Video Statistics already description/tags/category/thumbnail dikhata hai.

---

## Phase 4 — Content

- [x] **4.1 — Audience landing page**: `/for-students` (transcript + summarizer + timestamps for lectures). Baad mein `/for-researchers`, `/for-journalists`.
- [x] **4.2 — Blog posts** (har hafte 2):
  - [x] YouTube SEO tips 2027
  - [x] YouTube keyword research guide
  - [x] How to grow a YouTube channel in 2027
  - [x] Best free YouTube tools 2027
  - [x] How to get the transcript of a YouTube video (YouTube to text)
  - [x] SRT vs VTT vs TXT — transcript formats explained
  - [x] How to download YouTube thumbnails (all sizes)
- [x] **4.3 — Data page titles check**: `/data/youtube-cpm-by-country` aur `/data/youtube-rpm-by-niche` ke titles query-aligned kiye. 2026 estimate data ko 2027 relabel nahi kiya.

---

## Deploy checklist (Vercel)

- [~] Env: Vercel `yttools` production mein `UPSTASH_REDIS_URL`, `UPSTASH_REDIS_TOKEN`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`, `YOUTUBE_API_KEY` sab names present hain. Values aur `NEXT_PUBLIC_SITE_URL` exact setting abhi verify nahi hui (public sitemap `www.yttools.pro` use karta hai).
- [ ] Redeploy → Settings → Cron Jobs → rankings-snapshot manually Run → `"success": true`
- [~] Production sitemap `https://www.yttools.pro/sitemap.xml` HTTP 200, 180 entries, saare `www.yttools.pro`, koi `localhost` nahi. Naye pages deploy ke baad Search Console mein sitemap resubmit baaki.
- [ ] Pehle hafte Usage: ISR Writes, Function Invocations, Upstash commands
- [ ] ⚠️ AdSense on karne se pehle: Vercel Hobby commercial use allow nahi karta → Pro ya dusra host
