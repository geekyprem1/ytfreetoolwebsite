# YT Toolkit — Work Summary (15 Jul 2026)

Project: `yt-toolkit`  
Repo: https://github.com/geekyprem1/ytfreetoolwebsite

---

## 1. Bug audit & critical fixes

### Found (~26 issues)
Static review of API routes, YouTube/AI libs, tool clients, rate limiting.

**Critical (fixed):**
- Rate limit **fail-open** when Redis missing → now **in-memory fail-closed** (`src/lib/rate-limit/limiter.ts`)
- Transcript timestamps treated **ms as seconds** → normalize in API (`src/app/api/youtube/transcript/route.ts`)

**Also done:**
- Homepage **Analyze** button removed (paste → detect chips is intentional) — `src/components/home/url-search-box.tsx`
- Middleware uses correct rate-limit max header via `getRateLimitMax`

**Commit pushed:** `d4b937e` — `fix: harden rate limits and transcript timestamps`

**Still open (not fixed in this session):** manual paste UX on transcript, Title Analyzer empty keyword, `/c/` channel URLs, AI JSON crashes, video stats TTL, SEO regex, thumbnail HD map, etc. See canvas / earlier audit if needed.

---

## 2. Apple-like UI redesign

### Design system
- Font: **Instrument Sans** sitewide (Geist Mono for code only)
- Variables on `<html>`; body `font-sans` (fixed serif/Times footer fallback)
- Type scale: body **16px**, UI **14px**, captions **12px** min
- Utilities: `text-heading-xl/lg/md`, `text-lead`, `text-ui`, `text-caption`, `tool-prose`, `section-pad`
- File: `src/styles/globals.css`, `src/app/layout.tsx`

### Homepage
- Hero: brand + H1 + one line + URL only (no floating cards/stats/pills)
- Featured / Trust / Tools grid / How it works / FAQ: dividers, less card chrome
- Header: quieter sticky blur; Footer: lighter type
- Files under `src/components/home/*`, `src/components/layout/*`

### Tool pages
- Shared **`ToolPageShell`**: breadcrumb, black H1, workspace, SEO prose
- Quieter Related tools, ToolOutput, ToolError, YouTube URL input
- Thumbnail preview as large visual anchor
- All 15 tools under `src/app/(tools)/*/page.tsx`
- Layout width `max-w-5xl` — `src/app/(tools)/layout.tsx`

### CSS build fix
- `@apply prose` removed from `.tool-prose` (no typography plugin) — plain utilities instead

---

## 3. Site / legal pages (footer 404s)

Route group: `src/app/(site)/`

| Page | Path |
|------|------|
| About | `/about` |
| Contact | `/contact` (+ mailto form) |
| Privacy | `/privacy` |
| Terms | `/terms` |
| Docs | `/docs` |
| Changelog | `/changelog` |
| Roadmap | `/roadmap` |

Shared: `ContentPageShell` — `src/components/layout/content-page-shell.tsx`

---

## 4. SEO + GEO + AdSense plan (implemented)

### Trust / AdSense
- Publisher config: `src/content/site.ts`
- AdSense-ready Privacy (names Google AdSense, cookies, opt-outs)
- Expanded About / Terms / Contact
- Cookie banner copy aligned — `cookie-consent.tsx`
- `public/ads.txt` stub (replace `pub-PLACEHOLDER-REPLACE-ME`)
- Dynamic icon + OG: `src/app/icon.tsx`, `src/app/opengraph-image.tsx`
- Metadata titles without double brand (`About` → template adds `| YouTube Toolkit AI`)

### Schema / GEO
- Home FAQ data: `src/content/home-faqs.ts` + FAQPage JSON-LD in layout
- WebSite + Organization schema (no fake `sameAs`)
- Per-tool FAQPage via `ToolFaqSection` + `faqs` prop on `ToolPageShell`
- Breadcrumb “Tools” → `/#tools`
- `public/llms.txt`
- `robots.ts` allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended

### Tool content depth
All 15 tools have SEO modules under `src/content/tool-seo/*.tsx`:
- Unique long-form SEO (`SeoContent`)
- 6 FAQs each
- Wired into each `page.tsx` with `openGraph`

### Technical SEO
- Footer lists **all tools by category**
- `next.config.ts` — `images.remotePatterns` for YouTube CDNs
- Sitemap stable `lastModified` (`2026-07-15`) via `site.url`
- Hero H1: “Free YouTube tools for creators”

---

## 5. Key file map

```
src/content/site.ts
src/content/home-faqs.ts
src/content/tool-seo/*.tsx          (15 tools)
src/components/seo/json-ld.tsx
src/components/tools/tool-page-shell.tsx
src/components/tools/tool-faq-section.tsx
src/components/layout/content-page-shell.tsx
src/app/(site)/{about,contact,privacy,terms,docs,changelog,roadmap}/
src/app/icon.tsx
src/app/opengraph-image.tsx
public/ads.txt
public/llms.txt
src/lib/rate-limit/limiter.ts
src/app/api/youtube/transcript/route.ts
```

---

## 6. Before AdSense go-live (you must do)

1. Set `NEXT_PUBLIC_SITE_URL` to production domain  
2. Replace `pub-PLACEHOLDER-REPLACE-ME` in `public/ads.txt`  
3. Submit sitemap in Google Search Console  
4. Confirm Privacy/cookie behavior matches real ad scripts when you add them  
5. Apply AdSense only after deploy looks like a finished product  

---

## 7. Optional next work

- Remaining product bugs (transcript manual paste, Title Analyzer keyword, `/c/` URLs, etc.)
- HowTo schema on thumbnail/tags/transcript
- Blog cluster pages (not required for AdSense foundation)
- Gate AdSense scripts behind cookie consent when ads go live
