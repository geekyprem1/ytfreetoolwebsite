# TASKS — New Tools & GEO Expansion

Goal: 27 tools se ~45 tools tak jaana, aur saath mein GEO layer (AI engines mein cite hone wala content) khada karna.
Priority: recurring traffic > one-time traffic. Effort estimates single-dev, focused hours mein hain.

Status legend: `[ ]` pending · `[~]` in progress · `[x]` done

---

## Ground rules (har task pe apply)

1. **Naya tool banane ka repeatable pattern** — 4 files minimum:
   - `src/app/(tools)/<slug>/page.tsx` — static `metadata` export (`title: { absolute: '...' }`, `alternates.canonical`, `openGraph`), `ToolPageShell` render. URL-based tools async hote hain aur `searchParams: Promise<{ url?: string }>` lete hain.
   - `src/app/(tools)/<slug>/client.tsx` — `'use client'`, `useToolApi` + `ToolInput`/`ToolOutput`/`ToolLoading`/`ToolError`/`OutputActions`, aur **last child mein `<RelatedTools currentSlug="<slug>" />`** (shell ise render nahi karta).
   - `src/content/tool-seo/<slug>.tsx` — `export const faqs: ToolFaq[]` (min 6) + `export function SeoContent()` (900–1400 words, unstyled semantic HTML, sibling tools ko internal `<Link>`).
   - `src/content/tools-metadata.ts` — registry entry. Yahi se sitemap, footer, header dropdown, mobile nav, homepage grid, related tools, JSON-LD featureList — sab auto update hota hai.
2. **`answerFirst` prop mandatory hai** har naye tool page pe. Yeh GEO ka core hai — 40–60 word ka direct answer jo AI engines extract karte hain.
3. **API route pattern**: `validate → getCachedOrFetch(cacheKeys.x, TTL, fetcher) → apiSuccessResponse` aur `catch → apiErrorResponse(handleApiError(err))`. Rate limiting `src/middleware.ts` se automatic milti hai (`/api/youtube/*` = 60/min, `/api/ai/*` = 20/min).
4. **Icons**: sirf `src/lib/utils/tool-icons.ts` edit karo (Phase 0.3 ke baad ek hi jagah hai). Render mein plain lookup use karo: `const Icon = iconMap[tool.icon] ?? FallbackToolIcon;`. Phase 1–3 ke saare planned icons already added hain.
5. **Verify before done**: `pnpm typecheck` + `pnpm build` pass + `pnpm lint` mein koi **naya** error nahi (4 pre-existing errors baseline hain, neeche Phase 0 verification dekho).
6. **Kya NAHI banayenge**: video downloader, YouTube-to-MP3, sub4sub, view bots. YouTube ToS violation + AdSense ban risk + DMCA exposure. Traffic high hai par site burn ho jayegi.

### YouTube API quota budget (important constraint)

Default quota **10,000 units/day**. Costs:

| Call | Units | Note |
|---|---|---|
| `channels.list` | 1 | live counters ke liye sasta |
| `videos.list` | 1 | per call, 50 IDs tak |
| `playlistItems.list` | 1 | per 50 items |
| `commentThreads.list` | 1 | per 100 comments |
| `search.list` | **100** | mehenga — avoid karo |

Note: `getChannelVideos()` (`src/lib/youtube/client.ts:134`) `search.list` use karta hai = 100 units per call. Naye tools mein `playlistItems` (uploads playlist) route prefer karna, jaise `getRecentVideosMonetizationProbe` karta hai.

---

## Phase 0 — Foundation (tools add karne se PEHLE)

Yeh 15+ tools add karne se pehle karna zaroori hai, warna har tool pe 11 files manually touch karni padengi.

- [x] **0.1 — `phase` field widen karo** ✅
  `phase: 1 | 2 | 3` → `phase: number`. Saath mein `ToolCategory` type export kiya (pehle category union inline tha) — isse `Record<ToolCategory, string>` maps possible hue jo naye category pe build fail karte hain.
  `TOOL_PHASES` mein `4: 'Growth'` aur `5: 'GEO'` add kiya.
  Files: `src/content/tools-metadata.ts`, `src/lib/utils/constants.ts`

- [x] **0.2 — Hardcoded tool counts derive karo** ✅
  `tools-metadata.ts` se `toolCount`, `calculatorCount`, aur `getToolsByCategory()` export kiye. Sab 11 locations replace ho gaye:
  `site.ts` (tagline + description), `layout.tsx` (ek `siteTitle` const banaya, teen jagah use hota hai), `schema-graph.ts` (WebPage name), `hero.tsx`, `tools-grid.tsx`, `featured-tools.tsx`, `tools-dropdown.tsx`, `home-faqs.ts`, `constants.ts`, `changelog/page.tsx`, `about/page.tsx`.
  Extra: `SITE_DESCRIPTION` se `NEXT_PUBLIC_SITE_DESCRIPTION` env override hata diya — `.env.local` mein woh abhi bhi "15+ tools" keh raha tha aur har naye tool pe stale hota rehta.
  Verify: `src/**` mein hardcoded count ka ek bhi match nahi bacha (sirf ek genuine "27%" FAQ prose mein hai).

- [x] **0.3 — Single shared iconMap** ✅
  Naya file `src/lib/utils/tool-icons.ts` — `iconMap`, `FallbackToolIcon`, `categoryLabels`, `categoryLabelsLong`, `categoryDesc`. **5** duplicate maps replace hue (featured-tools.tsx mein bhi ek chhota 7-icon map tha jo miss ho raha tha): tools-grid, tools-dropdown, mobile-nav, related-tools, featured-tools. `footer.tsx` bhi shared `categoryLabels` use karta hai ab.
  `HashIcon: Hash` alias preserve. Category labels ke do variants rakhe (`categoryLabels` = nav ke liye "Calculators", `categoryLabelsLong` = homepage grid ke liye "YouTube Calculators") taaki existing UI/SEO copy na badle.
  **Phase 1–3 ke icons pre-add kar diye** (verified lucide-react v1.24 mein exist karte hain): `Fingerprint`, `UserCircle`, `GalleryHorizontal`, `Captions`, `ListVideo`, `Code2`, `Gift`, `MessageSquare`, `ScrollText`, `FileEdit`, `Signature`, `ImagePlay`. Matlab naye tools ke liye icon map edit karne ki zaroorat hi nahi padegi.
  ⚠️ Note: `Panorama` lucide mein nahi hai — banner downloader (task 1.3) `GalleryHorizontal` use karega.
  ⚠️ Gotcha: icon resolve karne ke liye render mein **plain lookup** karo (`iconMap[tool.icon] ?? FallbackToolIcon`), helper function call nahi — `getToolIcon()` wala approach React Compiler ka `react-hooks/static-components` rule trigger karta hai.

- [x] **0.4 — llms.txt registry se auto-generate karo** ✅
  `public/llms.txt` delete kiya (static file route ko shadow kar deta). Naye routes:
  - `src/app/llms.txt/route.ts` — category-wise grouped tool list, site pages, key facts (public data only / estimates disclaimer / no login), citation notes. Build output: 5.8 KB, `force-static`.
  - `src/app/llms-full.txt/route.ts` — per-tool detail + data-source limits + homepage FAQs + citation guidance. Build output: 9.4 KB.
  Dono `Content-Type: text/plain; charset=utf-8` ke saath serve hote hain (build meta se verify kiya) aur URLs `site.url` se aate hain, to production domain automatically sahi rahega.
  Verified: build output mein `● /llms.txt` aur `● /llms-full.txt` static prerendered hain, aur generated body mein sab 27 tools correct categories ke saath hain.

- [x] **0.5 — Missing npm scripts** ✅
  Added: `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `test:watch`, `test:e2e` (`playwright test`).
  Note: `tests/` folders abhi bhi khaali hain — `pnpm test` chalega par zero tests milenge. Test likhna alag task hai (user ne explicitly nahi maanga).

- [x] **0.6 — Homepage discovery surfaces update karo** ✅ (Phase 1 ke saath)
  `url-search-box.tsx` `toolSuggestions` update: video → subtitle-downloader; channel → channel-id-finder + profile-picture-downloader. Naye channel/video tools ab paste-URL flow mein dikhte hain aur `?url=` deep-link se auto-run hote hain.
  `featuredSlugs` (featured-tools.tsx) abhi original 6 pe hi rakha — homepage curation intentional hai, naye utility tools featured strip ke layak nahi (grid + dropdown + footer mein already dikhte hain).

### Phase 0 verification (done)

- `pnpm typecheck` — clean
- `pnpm build` — exit 0, sab 27 tool pages + `/llms.txt` + `/llms-full.txt` generate hue
- `pnpm lint` — 4 errors bache hain, **sab pre-existing** aur Phase 0 se unrelated: `cookie-consent.tsx:13`, `theme-toggle.tsx:11`, `use-recent-searches.ts:16` (`react-hooks/set-state-in-effect`) aur `textarea.tsx:3` (`no-empty-object-type`). Inme se koi file Phase 0 mein touch nahi hui. Alag cleanup task ke layak hai.

---

## Phase 1 — Quick wins (7 tools) ✅ DONE

Sab ban gaye, registered, build pass. Tool count 27 → **34** (calculators 11 → 12). `pnpm typecheck` clean, `pnpm build` exit 0, naya code lint-clean.

Shared infra jo add hui:
- **`/api/youtube/channel-branding`** — channel URL/@handle/UC-ID → id + avatar + banner. 1.1/1.2/1.3 teeno reuse (1 quota unit, 3-day cache for UC-ID).
- **`getPlaylistSummary()`** + **`/api/youtube/playlist`** — playlistItems paginate + videos.contentDetails chunks, 500-video cap + `truncated` flag.
- `YouTubeChannel` type mein `thumbnailHigh` + `bannerUrl` (channel-stats route unaffected).
- `parseYouTubePlaylistId()` url-parser mein.
- `src/lib/utils/download-image.ts` — blob-fetch download with new-tab CORS fallback.
- `cacheKeys.playlist` (6h) + `cacheKeys.channelBranding` (3d).
- `getToolsByPhase` param `1|2|3` → `number` (0.1 mein reh gaya tha).
- url-search-box (0.6): new channel tools + subtitle-downloader suggestions add.

- [x] **1.1 — Channel ID Finder** · `/channel-id-finder` — `extractor` · `Fingerprint`. URL/@handle/UC → UC id + copy + RSS feed URL. Deviation: `channel-branding` route (resolve avatar/customUrl bhi chahiye the).
- [x] **1.2 — Profile Picture Downloader** · `/youtube-profile-picture-downloader` — `downloader` · `UserCircle`. Avatar 800/240/176/88 (`=sNNN-c` swap).
- [x] **1.3 — Banner Downloader** · `/youtube-banner-downloader` — `downloader` · `GalleryHorizontal`. 2560/2048/1280 crops + size guide + "no banner" empty state.
- [x] **1.4 — Subtitle / SRT Downloader** · `/subtitle-downloader` — `downloader` · `Captions`. Transcript route reuse; SRT/VTT/TXT client-side.
- [x] **1.5 — Playlist Length Calculator** · `/playlist-length-calculator` — `calculator` · `ListVideo`. Total/count/avg + 1.25x–2x. Follow-up: per-video select list abhi nahi.
- [x] **1.6 — Embed Code Generator** · `/youtube-embed-code-generator` — `seo` · `Code2`. Responsive/fixed, start/end, autoplay+mute, loop+playlist, controls, nocookie, rel=0, live preview.
- [x] **1.7 — Timestamp Link Generator** · `/youtube-timestamp-link-generator` — `seo` · `Clock`. Single + bulk chapter mode.

Note: embed + timestamp tools `searchParams` (`?url=`) lete hain → Dynamic render (calculators static). Deep-linking ke liye acceptable.

---

## Phase 2 — Recurring traffic engines (6 tools) ✅ DONE

Sab ban gaye, registered, build pass. Tool count 34 → **40** (analytics category badha). `pnpm typecheck` clean, `pnpm build` exit 0, naya code lint-clean. Trending ne **30 country pages** pre-render kiye (`generateStaticParams`).

Shared infra jo add hui:
- **`src/lib/youtube/quota.ts`** — daily Redis quota counter. `trackQuota(units)` har live/comment/trending call pe, `isLivePollAllowed()` soft limit 8000 units pe check karta hai (fail-open bina Redis). Live routes limit cross hone pe fresh fetch skip karke sirf cached serve karte hain aur `livePaused: true` bhejte hain.
- **`src/hooks/use-animated-number.ts`** — ease-out interpolation hook, dono live counters share karte hain (smooth "live" feel bina fast poll ke).
- Client helpers `client.ts` mein: `getLiveChannelCount`, `getLiveVideoCount`, `getComments`, `getTrendingVideos`, `getCachedTrending` (ISR ke liye cached wrapper, fail pe empty).
- Cache keys: `liveSubs`, `liveViews`, `comments`, `channelCompare`, `trending`. TTL: `liveCount` 60s, `comments` 30m, `trending` 3h.
- `src/content/trending-regions.ts` — 30-country registry with slugs.
- Types: `LiveChannelCount`, `LiveVideoCount`, `YouTubeComment(sResult)`, `TrendingVideo/Result`.

- [x] **2.0 — Quota guard infra** ✅
  Design deviation: client-side **1s interpolation via requestAnimationFrame** (poll 60s) — ye plan ke "interpolate between two real points" ko ease-out animation se implement karta hai (do arbitrary points nahi, current→target). Soft limit + livePaused state done. **Cron prewarm abhi nahi banaya** — on-demand + 60s shared cache MVP ke liye kaafi; prewarm tab add karna jab specific channels consistently hot hon. Honesty note dono live tools ke UI + tool-seo mein.

- [x] **2.1 — Live Subscriber Count** · `/live-subscriber-count` + `/[channel]` ✅ — `analytics` · `Radio`. **Pehla `generateMetadata`** codebase mein (per-channel titles). Client 60s poll + animated number + live/paused dot.

- [x] **2.2 — Live View Count** · `/live-view-count` + `/[videoId]` ✅ — `analytics` · `Eye`. 2.1 ka poll+animate infra reuse, likes+comments bhi.

- [x] **2.3 — Comment Picker** · `/youtube-comment-picker` ✅ — `analytics` · `Gift`. `/api/youtube/comments` (cap 2000 = 20 units, 30m cache). Dedupe/keyword/min-likes filters, N winners, **seeded Fisher–Yates draw** (mulberry32) + proof seed + timestamp.

- [x] **2.4 — Comment Exporter** · `/youtube-comment-exporter` ✅ — `extractor` · `MessageSquare`. Same route, CSV/JSON export, sort likes/newest/oldest, search.

- [x] **2.5 — Channel Comparison** · `/channel-comparison` ✅ — `analytics` · `GitCompare`. 2–3 channels, subs/views/videos/avg-per-video/age, winner-per-row highlight. Naya `/api/youtube/channel-compare` route (distinct `channelCompare` cache key — channel-stats key se collide na ho, alag shape hai).
  Deviation: **`/compare/[a]-vs-[b]` static pairs abhi nahi banaye** — main tool live hai; programmatic vs-pages ko Phase 4 (comparison pages) mein fold kar sakte hain.

- [x] **2.6 — Trending Videos by Country** · `/youtube-trending` + `/youtube-trending/[country]` ✅ — `analytics` · `TrendingUp`. ISR `revalidate: 10800` (3h). 30 countries `generateStaticParams` se pre-rendered. Client country selector `router.push`.
  Deviation: per-category split abhi nahi (sirf "all"); regions 30 rakhe (50+ nahi) — quota + build-time ke balance ke liye, baad mein badha sakte hain.

**Phase 2 total: 40 tools + 30 programmatic trending pages + 2 live-counter dynamic route families.**
⚠️ Runtime note: build machine pe `YOUTUBE_API_KEY` nahi tha to trending ISR pages empty aaye (try/catch fail-open) — production mein key ke saath fill honge. Live counters aur comment/compare routes ko real API key ke saath dev pe test karna baaki hai.

---

## Phase 3 — AI tools & differentiation (5 tools) ✅ DONE

Sab ban gaye, registered, build pass. Tool count 40 → **45** (target hit). AI Generators category 8 → 11. `pnpm typecheck` clean, `pnpm build` exit 0, naya code lint-clean.

Shared infra jo add hui:
- 3 naye prompt builders in `prompts.ts`: `scriptGenerationPrompt`, `channelNamePrompt`, `videoIdeasPrompt` (existing structured-JSON convention follow karte hain).
- 3 naye zod schemas: `scriptGeneratorSchema`, `channelNameSchema`, `videoIdeasSchema`.
- 3 naye AI routes: `/api/ai/generate-script` (maxTokens 6144), `/api/ai/generate-channel-names` (3072), `/api/ai/generate-video-ideas` (4096).

- [x] **3.1 — Video Summarizer** · `/youtube-video-summarizer` ✅ — `ai-generator` · `ScrollText`.
  Two-step flow: transcript route → `/api/ai/summarize-transcript` (dono already the). No new route needed. Output = bullet takeaways (summarize route `{summary: string[]}` deta hai).
  Deviation: TL;DR/chapter-wise output modes abhi nahi — summarize route ek hi shape deta hai; mode selector future enhancement.

- [x] **3.2 — Script Generator** · `/youtube-script-generator` ✅ — `ai-generator` · `FileEdit`.
  Length (short/5/8/15min/long) + tone + audience → hook/intro/body/CTA sections. **`maxOutputTokens` per-call 6144 pass kiya** (default 2048 script ke liye kam) — `generateContent` already `options.maxTokens` support karta hai, gemini.ts change nahi karna pada.

- [x] **3.3 — Channel Name Generator + Handle Checker** · `/youtube-channel-name-generator` ✅ — `ai-generator` · `Signature`.
  AI names + suggested @handle + reason. Per-name handle check.
  Deviation: `/api/youtube/resolve` ke bajaye **`/api/youtube/channel-branding`** se check kiya — resolve not-found ko swallow karke bare id return karta (hamesha "taken" dikhata); branding `getChannelDetails` use karta hai jo proper 404 deta hai. On-click check (auto-batch/debounce nahi — user manually check karta hai, quota-friendly).

- [x] **3.4 — Video Ideas Generator** · `/youtube-video-ideas-generator` ✅ — `ai-generator` · `Lightbulb`.
  Niche + audience + format → ~20 ideas with title/intent/difficulty/angle.

- [x] **3.5 — Thumbnail Preview / A-B Tester** · `/thumbnail-preview-tester` ✅ — `seo` · `ImagePlay`.
  Pure client (object URLs, zero upload/API). 4 layouts (grid/sidebar/search/mobile) × light/dark, 2 side-by-side + editable titles.
  Deviation: URL input abhi nahi (sirf file upload/drop) — thumbnail-downloader se URL grab karke drop kar sakte hain; direct-URL add karna easy follow-up.

**Phase 3 total: 45 tools. `pnpm typecheck` clean, `pnpm build` exit 0.**
⚠️ Runtime note: AI tools ko `GEMINI_API_KEY` (ya OpenRouter fallback) chahiye — build/typecheck pe verify nahi hota, real key ke saath dev pe test karna baaki. Summarizer ko captions-wali video chahiye.

---

## Phase 4 — GEO layer (content, not tools)

Tools classic SEO laate hain. AI engines mein cite hone ke liye **original numbers + clean structure** chahiye. 2026 ke GEO guides consistently yeh kehte hain: pehle ~200 words mein complete answer, original statistics, aur page ka entity/author unambiguous ho. ([kickads GEO guide](https://www.kickads.co/en/generative-engine-optimization), [frase GEO playbook](https://www.frase.io/blog/how-to-get-cited-by-ai-search-engines-the-complete-geo-playbook) — content was rephrased for compliance with licensing restrictions)

## Phase 4 — GEO layer (content, not tools) ✅ DONE

Sab GEO pages ban gaye. Build mein **210 static pages** generate hue (pehle ~90), sitemap mein **145 URLs**. `pnpm typecheck` clean, `pnpm build` exit 0, naya code lint-clean. Har content page pe answer-first summary block + JSON-LD.

Naya wiring:
- **`src/content/geo-pages.ts`** — GEO pages ka registry (data/vs/glossary/api-docs/tags-for/best-time-to-post + sab dynamic slugs). `sitemap.ts` isko consume karta hai, to naye entries automatically sitemap mein aate hain.
- Ye pages `(site)` route group mein hain (tools nahi), `ContentPageShell` use karte hain, `tools-metadata` mein register nahi.

- [x] **4.1 — Original data pages** · `/data` + `/data/[slug]` ✅
  4 datasets: CPM by country (22 rows), RPM by niche (14), engagement benchmarks (6 tiers), avg video length (11 niches). Big table + methodology + last-updated + **CSV download** + `Dataset` schema + answer-first block.
  Deviation: Supabase aggregate usage data ke bajaye **publicly-documented ranges** use kiye (ranges, single numbers nahi — false precision se bachne ke liye). Methodology mein clearly "estimates, not payouts/private data" likha. Aggregate-usage data tab plug karna jab enough traffic ho.

- [x] **4.2 — Comparison / alternative pages** · `/vs/[slug]` ✅
  4 pages: vidiq-alternatives, tubebuddy-alternatives, social-blade-alternative, free-youtube-tools. Feature table + **"where they win" (honest limitations)** + "where we win" + FAQPage schema + answer-first. Internal tools ko link.
  Note: index page nahi banaya (`/vs` bare) — har page dusre 3 ko link karta hai, aur footer/nav se nahi jodna tha; slug pages hi kaafi hain.

- [x] **4.3 — Glossary hub** · `/glossary` + `/glossary/[term]` ✅
  25 terms (CPM, RPM, watch time, AVD, CTR, impressions, YPP, monetization, Shorts, mid-roll, end screen, thumbnail, tags, metadata, chapters, session time, retention, hook, super chat, handle, channel ID, engagement rate, suggested videos, browse features, evergreen). Har term: short def + detail + formula + example + related tool. `DefinedTermSet`/`DefinedTerm` schema.
  Deviation: 25 terms (40-60 target ka lower end) — core creator vocabulary cover ho gaya; baaki incrementally add kar sakte hain.

- [x] **4.4 — Public JSON API docs** · `/api-docs` ✅
  4 endpoints documented (thumbnail, video-stats, channel-stats, playlist) + response envelope + rate limits + curl/JS/Python examples + ToS line. `robots.ts` sirf `/api/` disallow karta hai — `/api-docs` crawlable hai (confirmed).
  Note: naya public API endpoint nahi banaya — existing routes hi document kiye (woh already public GET hain, middleware rate-limit lagti hai). Per-IP daily cap alag task agar abuse dikhe.

- [x] **4.5 — Programmatic long-tail sets** ✅
  - `/tags-for` + `/tags-for/[niche]` — 20 niches, curated starter tag sets + copy-all + AI-generator CTA.
  - `/best-time-to-post` + `/best-time-to-post/[country]` — 30 countries, timezone + posting-window table + "find your real best time via Studio" honesty note.
  `generateStaticParams`, build-time, zero runtime quota.
  Deviation: 20 niches (80-100 target) aur 30 countries (40+) — solid launch set; scale data files se easily badhega, koi code change nahi.

- [x] **4.6 — Answer-first audit** ✅
  Sab **48 tool page.tsx** (45 tools + 3 dynamic sub-routes) pe `answerFirst` present aur genuine direct-answer confirm kiya. Live counter dynamic routes + trending country page mein bhi hai. GEO content pages (data/vs/best-time) pe bhi answer-first block add kiya. Koi rewrite zaroori nahi tha — sab already question-form answers hain.

- [x] **4.7 — Schema upgrades** ✅
  `schema-graph.ts` mein naye builders: `breadcrumbNode`, `datasetNode`, `definedTermNode`, `definedTermSetNode`, `itemListNode`. `toolPageGraph` mein optional `howToSteps` param add (`HowTo` node emit karta hai jab pass ho). Dead files `tool-schema.tsx` + `breadcrumb-schema.tsx` **delete** (zero importers confirm karke).
  Deviation: `HowTo`/`ItemList` builders bane aur data/glossary/tags/best-time index pages pe `ItemList` use ho raha hai, par existing 45 tool pages ko `howToSteps` abhi pass nahi kiya (builder ready hai, wiring incremental). Homepage grid `ItemList` bhi future — homepageGraph already `featureList` deta hai.

**Phase 4 total: DONE. 210 static pages, 145 sitemap URLs. typecheck clean, build exit 0.**
⚠️ Data pages ke numbers estimated ranges hain (public reports se) — periodically refresh karna aur `lastUpdated` badhana. Best-time windows general best-practice hain, per-country measured nahi (page pe clearly likha).

---

## Recommended order

1. **Phase 0** poora (6.5 h) — warna har naye tool pe 11 files ka manual overhead
2. **Phase 1** ke 1.1 → 1.2 → 1.3 → 1.7 → 1.6 (quick wins, momentum + tool count 32)
3. **1.5 Playlist calculator** aur **1.4 Subtitle downloader** (thoda bada, par high volume)
4. **3.1 Video Summarizer** (GEO ke liye highest leverage single tool)
5. **4.1 Data pages** + **4.2 Comparison pages** (AI citations shuru hone mein 4-8 weeks lagte hain, isliye jaldi start)
6. **2.0 + 2.1 + 2.2 Live counters** (quota infra ke saath, sabse bada traffic bet)
7. **2.3 Comment picker** (backlinks)
8. Baaki Phase 2 → Phase 3 → Phase 4 remaining

---

## Success metrics (har phase ke baad check)

- Indexed pages count (GSC) — Phase 2 ke baad 10x hona chahiye
- Organic clicks per tool page (GSC), naye tools ka 90-day trend
- AI referral traffic — PostHog mein referrer filter: `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`. Yeh GEO ka only real proof hai.
- YouTube API quota usage per day (Redis counter) — 80% se upar consistently jaaye to quota increase apply karo
- Returning visitor % — live counters ke baad badhna chahiye
