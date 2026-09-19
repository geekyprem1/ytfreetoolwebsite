# YT Toolkit — Organic Growth & New Tools Roadmap

**Created:** 18 September 2026  
**Goal:** Build search-first YouTube utilities that win long-tail traffic without duplicating the 45 tools already registered.  
**Primary strategy:** Fresh, problem-specific calculators and validators → supporting content clusters → strong internal linking → Search Console iteration.

## Status legend

- `[ ]` Pending
- `[~]` In progress
- `[x]` Complete
- `[!]` Blocked or requires a product decision

## Current baseline

- 45 registered tools
- 12 calculators, 11 AI generators, 8 analytics tools, 5 SEO tools, 5 extractors, 4 downloaders
- 20 niche tag pages
- 30 country best-time-to-post pages
- 25 glossary pages
- 4 datasets and 4 comparison pages
- 3 blog posts

## Definition of done for every new tool

- [ ] One clear search intent; no cannibalization with an existing route
- [ ] Static metadata with unique title, description and canonical
- [ ] 40–60 word `answerFirst` summary
- [ ] Functional client UI with validation, empty states and mobile layout
- [ ] Minimum 6 useful FAQs
- [ ] Approximately 900–1,400 words of genuinely useful SEO content
- [ ] Official/primary sources used for rules and changing platform facts
- [ ] `SoftwareApplication`, FAQ and breadcrumb schema emitted through the shared schema system
- [ ] At least 3 contextual internal links in and 3 links out to related pages
- [ ] Added to `src/content/tools-metadata.ts` so navigation and sitemap update automatically
- [ ] Core calculation/validation logic extracted into a testable utility
- [ ] Unit tests include valid, invalid, boundary and zero-input cases
- [ ] No YouTube API call when the tool can work entirely in the browser
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm lint` adds no new errors
- [ ] `pnpm build` passes

---

## Phase 0 — Fix foundations before scaling

### 0.1 Unify domain and brand signals

- [x] Confirm the production domain: `yttools.pro`
- [x] Make `site.url`, canonical URLs, sitemap URLs, OG URLs and API examples use the chosen domain
- [x] Align the support email and visible brand suffix with the chosen domain
- [x] Remove hardcoded runtime production URLs outside `src/content/site.ts`
- [ ] Confirm Vercel `NEXT_PUBLIC_SITE_URL` is the production URL, not localhost
- [ ] Verify one canonical domain redirects to the other with a permanent redirect

**Acceptance:** Page source, sitemap, structured data and social metadata all expose one domain and one brand name.

### 0.2 Centralize time-sensitive YPP requirements

- [x] Add `src/lib/youtube/ypp-requirements.ts`
- [x] Store current rules with effective dates rather than scattering numeric literals
- [x] Store announced 1 February 2027 rules separately
- [x] Include the unchanged early-access/fan-funding tier where relevant
- [x] Add source URLs and `lastVerified` date in code comments/data
- [x] Replace hardcoded `4000` and `10M` copy in the Watch Time Calculator
- [ ] Update Monetization Checker SEO content so it distinguishes status checking from progress planning

**Current full ads/Premium path:** 1,000 subscribers + 4,000 qualified long-form watch hours in 365 days, or 10M qualified Shorts views in 90 days.  
**From 1 February 2027 for new applicants:** 1,000 subscribers + 8,000 qualified watch hours, or 20M qualified Shorts views.

Official sources:

- https://support.google.com/youtube/answer/72857?hl=en
- https://support.google.com/youtube/answer/12843009?hl=en

### 0.3 Capture a measurement baseline

- [ ] Record current indexed-page count in Google Search Console
- [ ] Export the last 3 months of queries, clicks, impressions, CTR and average position
- [ ] Record the top 20 landing pages and top 50 non-branded queries
- [ ] Create a sheet/report tab for new-tool launch dates
- [ ] Confirm PostHog/Vercel events can distinguish tool visits, successful calculations and outbound referrals
- [ ] Track referrals from ChatGPT, Perplexity, Gemini, Claude and Copilot where referrer data is available

---

## Phase 1 — YouTube Monetization Progress Calculator (highest priority)

**Proposed route:** `/youtube-monetization-progress-calculator`  
**Primary keyword:** `youtube monetization progress calculator 2027`

### Product scope

- [x] Inputs: current subscribers, qualified watch hours, qualified Shorts views and public uploads in last 90 days
- [x] Optional inputs: average monthly watch hours, average daily Shorts views and target date
- [x] Show current-rule progress and 2027-rule progress side by side
- [x] Show subscriber, long-form and Shorts completion percentages separately
- [x] Show exact amount remaining for every route
- [x] Calculate daily/weekly pace needed before a chosen target date
- [x] Estimate completion date at the user's current pace
- [x] Clearly explain that numerical eligibility does not guarantee YPP approval
- [x] Explain which watch hours/views do and do not qualify
- [x] Keep all entered data local; no account or API call
- [ ] Add share/copy summary without exposing user data in the URL by default

### Implementation files

- [x] `src/app/(tools)/youtube-monetization-progress-calculator/page.tsx`
- [x] `src/app/(tools)/youtube-monetization-progress-calculator/client.tsx`
- [x] `src/content/tool-seo/youtube-monetization-progress-calculator.tsx`
- [x] `src/lib/youtube/ypp-requirements.ts`
- [x] `src/lib/youtube/monetization-progress.ts` calculation utility
- [x] Unit tests for requirements selection, percentages, remaining totals and target-date pace
- [x] Registry entry in `src/content/tools-metadata.ts`
- [ ] Add icon only if the existing shared icon map has no suitable entry

### SEO/GEO requirements

- [x] Title targets current and upcoming rules without making the title unreadable
- [x] Answer-first copy explains the current vs 2027 distinction immediately
- [x] Comparison table: current rules vs rules effective 1 February 2027
- [x] Visible `Last verified` date
- [x] Official YouTube Help citations near changing claims
- [x] FAQ covers qualified hours, Shorts watch time, existing YPP channels and early-access tier
- [x] Link to Watch Time Calculator, Monetization Checker, Shorts Earnings Calculator and Subscriber Growth Calculator
- [x] Add links back from all four related tools

### Target long-tail keywords

- [ ] `youtube monetization progress calculator 2027`
- [ ] `youtube 8000 watch hours calculator`
- [ ] `20 million shorts views calculator`
- [ ] `youtube ypp eligibility calculator 2027`
- [ ] `how many views for 8000 watch hours`
- [ ] `1000 subscribers 8000 watch hours tracker`
- [ ] `youtube monetization current vs 2027 calculator`
- [ ] `youtube monetization calculator india 2027`

---

## Phase 2 — Monetization topical cluster

Each article must answer the query directly, cite official YouTube documentation, link to the new calculator above the fold and avoid padded generic advice.

- [x] `/blog/youtube-monetization-requirements-2027`
  - Current vs 2027 table, effective date, who is affected and official sources
- [x] `/blog/how-many-views-for-8000-watch-hours`
  - Scenario table for 2, 4, 6, 8, 10 and 15-minute average view duration
- [x] `/blog/20-million-shorts-views-in-90-days`
  - Daily/weekly pace table and qualification caveats
- [x] `/blog/qualified-youtube-watch-hours-what-counts`
  - Public/unlisted/private/deleted/Shorts distinctions
- [x] `/blog/youtube-monetization-current-vs-2027`
  - Concise comparison page optimized for AI answers and featured snippets
- [x] Add Article schema, Person/Organization author and `dateModified`
- [x] Create a hub-and-spoke internal-link map among these five articles and related tools

---

## Phase 3 — YouTube Shorts Eligibility Checker

**Proposed route:** `/youtube-shorts-eligibility-checker`  
**Primary keyword:** `is my video eligible for youtube shorts`

- [x] Accept a local video file without uploading it to the server
- [x] Read duration, width, height, aspect ratio, size and format in-browser
- [x] Decide whether the video is square/vertical and up to 3 minutes
- [x] Explain why a file will likely become a Short or remain long-form
- [x] Flag files over 3 minutes
- [x] Add an informational warning for music/copyright limitations without claiming to scan copyright
- [x] Add privacy text: file never leaves the browser
- [x] Test boundary durations and common ratios: 9:16, 1:1, 4:5, 16:9
- [x] Cite: https://support.google.com/youtube/answer/15424877?hl=en

### Target keywords

- [x] `is my video eligible for youtube shorts`
- [x] `youtube shorts eligibility checker 3 minutes`
- [x] `youtube shorts aspect ratio checker online`
- [x] `will youtube make my video a short`
- [x] `check if video is short or long form youtube`

---

## Phase 4 — YouTube End Screen Layout Planner

**Proposed route:** `/youtube-end-screen-planner`  
**Primary keyword:** `youtube end screen safe zone template 1280x720`

- [x] Allow upload of a video's final frame or use a blank 16:9 canvas
- [x] Add draggable placeholders for video, playlist, subscribe, channel and link elements
- [x] Enforce or warn about the maximum of four elements on standard 16:9 videos
- [x] Show the official last 5–20 second timing window
- [x] Warn when video duration is under 25 seconds
- [x] Add grid/snap controls and a reset layout action
- [x] Export a reference PNG with guides, not misleading fake YouTube UI
- [x] Keep uploaded image local
- [x] Cite: https://support.google.com/youtube/answer/6388789?hl=en

### Target keywords

- [x] `youtube end screen safe zone template 1280x720`
- [x] `youtube end screen planner last 20 seconds`
- [x] `youtube end screen size calculator`
- [x] `youtube end screen layout preview`
- [x] `where to place youtube end screen elements`

---

## Phase 5 — YouTube Video Upload Time Calculator

**Proposed route:** `/youtube-upload-time-calculator`  
**Primary keyword:** `youtube video upload time calculator`

- [ ] Inputs: file size, size unit, upload Mbps and connection-efficiency percentage
- [ ] Reverse mode: calculate speed needed to finish by a target time
- [ ] Show ideal transfer time and practical estimated range
- [ ] Explain upload speed vs download speed
- [ ] Add presets for 5, 10, 25, 50, 100 and 500 Mbps
- [ ] Optional local-file picker to read size without uploading the file
- [ ] Add unit tests for bits/bytes and unit conversion

### Target keywords

- [ ] `youtube video upload time calculator`
- [ ] `how long to upload 10gb video to youtube`
- [ ] `youtube upload speed calculator for 4k video`
- [ ] `how much upload speed needed for youtube`
- [ ] `how long does a 4k video take to upload`

---

## Phase 6 — YouTube Banner Safe-Area Previewer

**Proposed route:** `/youtube-banner-safe-area-checker`  
**Primary keyword:** `youtube banner safe area checker mobile desktop`

- [ ] Upload a banner locally
- [ ] Show TV, desktop, tablet and mobile crops side by side
- [ ] Overlay the all-device safe area
- [ ] Flag text/logo regions outside the safe area where possible
- [ ] Export a guide image without permanently drawing guides over the user's source
- [ ] Cross-link with Banner Downloader and Profile Picture Downloader
- [ ] Verify current dimensions against official YouTube documentation before launch

### Target keywords

- [ ] `youtube banner safe area checker mobile desktop`
- [ ] `youtube channel art crop preview online`
- [ ] `youtube banner safe zone template`
- [ ] `preview youtube banner on all devices`

---

## Phase 7 — YouTube Chapter Timestamp Validator

**Proposed route:** `/youtube-chapter-validator`  
**Primary keyword:** `youtube chapters not showing checker`

- [ ] Paste timestamps or upload a TXT file
- [ ] Parse `MM:SS` and `HH:MM:SS`
- [ ] Check first timestamp starts at `00:00`
- [ ] Require at least three timestamps
- [ ] Check ascending order, duplicates, missing titles and malformed lines
- [ ] Check minimum 10-second chapter length
- [ ] Accept video length to validate the final chapter
- [ ] Produce a cleaned, normalized chapter block
- [ ] Copy and download corrected output
- [ ] Cross-link with Timestamp Generator and Description Generator
- [ ] Cite: https://support.google.com/youtube/answer/9884579?hl=en

### Target keywords

- [ ] `youtube chapters not showing checker`
- [ ] `youtube chapter timestamp validator`
- [ ] `fix youtube chapters not working`
- [ ] `check youtube timestamp format`

---

## Phase 8 — Playlist Title & Description Generator

**Proposed route:** `/youtube-playlist-title-description-generator`  
**Primary keyword:** `youtube playlist title and description generator`

- [ ] Inputs: topic, audience, target keyword, video themes, tone and language
- [ ] Generate multiple title/description pairs
- [ ] Show character count and exact keyword coverage
- [ ] Avoid invented ranking, CTR or search-volume claims
- [ ] Copy individual result, copy all and download TXT
- [ ] Link to Playlist Length Calculator, Keyword Generator and Description Generator
- [ ] Reuse the existing AI provider/error/rate-limit pattern

### Target keywords

- [ ] `youtube playlist title and description generator`
- [ ] `youtube playlist description generator free`
- [ ] `seo description for youtube playlist`
- [ ] `youtube playlist name ideas generator`

---

## Phase 9 — Improve existing tools instead of creating duplicates

### Thumbnail Preview Tester

- [ ] Add text/contrast/readability checks as a module inside the existing tester
- [ ] Do not make a second generic thumbnail preview page
- [ ] Add mobile-legibility and 1–4 word guidance without pretending to predict CTR

### YouTube Money Calculator

- [ ] Add reverse “views needed to earn target amount” mode
- [ ] Target `how many youtube views to earn $1000` and country/niche examples in supporting content
- [ ] Avoid a separate Revenue Goal Calculator unless Search Console proves distinct demand

### Watch Time Calculator

- [ ] Add current/2027 target selector backed by shared YPP constants
- [ ] Add remaining views and estimated completion date
- [ ] Keep generic watch-time intent separate from the full Monetization Progress Calculator

### Tools to defer

- [ ] Defer generic Sponsorship Rate Calculator until a defensible data source or India-specific differentiator exists
- [ ] Defer generic YouTube Character Counter because current SERPs are crowded
- [ ] Defer Shorts-vs-Long-form Earnings Calculator because multiple focused competitors already exist

---

## Phase 10 — Technical SEO and GEO cleanup

- [ ] Add default OG/Twitter image inheritance for every route
- [ ] Add category-specific OG images after the default works
- [ ] Wire `HowTo` steps into tool-page schema where the page genuinely contains a procedure
- [ ] Improve BlogPosting schema with image, author, organization, breadcrumb and `dateModified`
- [ ] Add `DataDownload` distribution schema to downloadable datasets
- [ ] Add accurate `lastModified` dates to tool/GEO sitemap entries
- [ ] Remove or dynamically update stale years in titles and datasets
- [ ] Decide whether live counter child URLs should be `noindex, follow` or curated/indexable
- [ ] Expand glossary only from real query evidence, not arbitrary page-count targets
- [ ] Keep AI crawlers allowed in `robots.txt`
- [ ] Validate representative pages with Google Rich Results Test and Schema.org Validator

---

## Phase 11 — Launch and measurement loop

### On every launch

- [ ] Submit the new URL in Google Search Console
- [ ] Submit/update sitemap in Google and Bing
- [ ] Verify canonical, indexability, schema and rendered content
- [ ] Confirm analytics event for successful tool use
- [ ] Add at least three internal links from already-indexed pages
- [ ] Add the launch date to the measurement sheet

### Review cadence

- [ ] Day 7: indexing and crawl check
- [ ] Day 30: impressions, query spread, CTR and average position
- [ ] Day 60: improve title/content using real queries
- [ ] Day 90: keep, consolidate, expand or redirect based on evidence
- [ ] Promote pages ranking positions 5–20 with internal links and supporting content
- [ ] Consolidate pages that compete for the same intent

## Recommended execution order

1. Phase 0.1–0.2 — domain decision and shared YPP rules
2. Phase 1 — Monetization Progress Calculator
3. Phase 2 — monetization content cluster
4. Phase 3 — Shorts Eligibility Checker
5. Phase 4 — End Screen Planner
6. Phase 5 — Upload Time Calculator
7. Phase 6 — Banner Safe-Area Previewer
8. Phase 7 — Chapter Validator
9. Phase 8 — Playlist Generator
10. Phase 9–11 — iterative enhancements, technical cleanup and measurement

## First implementation checkpoint

Start with these tasks:

- [x] Confirm primary production domain
- [x] Implement shared dated YPP requirement constants
- [x] Update existing Watch Time Calculator to consume the constants
- [x] Build and test the Monetization Progress Calculator
- [ ] Publish the 2027 requirements support article
