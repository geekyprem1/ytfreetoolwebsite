# SEO / GEO / AEO Audit — YT Toolkit

**Date:** 15 Sep 2026
**Scope:** `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`, `lib/seo/schema-graph.ts`, 45 tool `page.tsx`, GEO pages (`data/vs/glossary/tags-for/best-time-to-post/blog`), `llms.txt`, `site.ts`, `opengraph-image.tsx`, `icon.tsx`
**Method:** Code-level re-verification (har claim file:line se check kiya gaya)

---

## 1. Critical Bugs

### 1.1 Domain / Brand split — HIGH
- `src/content/site.ts:3` fallback `https://yttoolkit.com`, `site.ts:18` email `hello@yttools.pro`
- Saare tool/blog titles `| yttools.pro` (ex. `live-subscriber-count/[channel]:19`, `blog/[slug]:22`), par `layout.tsx:29` template `%s | YouTube Toolkit AI` hai. Sab pages `absolute` title use karte hai, isliye template kabhi lagta hi nahi — 3 brand strings live hai.
- Hardcoded URLs `site.url` bypass karte hai:
  - `src/app/(site)/vs/[slug]/page.tsx:45` → `https://yttoolkit.com/vs/...#faq`
  - `src/app/(site)/api-docs/page.tsx:41,62,79` → `https://yttoolkit.com/api/...`
- Extra risk: `.env.local:3` me `NEXT_PUBLIC_SITE_URL=http://localhost:3000`. Agar Vercel env me ye set nahi hai to production canonical/sitemap/OG `localhost` ya fallback pe jayega.
- **Fix:** Ek brand suffix decide kar (`| YT Toolkit`), saare hardcoded URLs `site.url` se banao, production `NEXT_PUBLIC_SITE_URL` assert karo (build-time check).

### 1.2 OG / Twitter images missing — MEDIUM (CTR bug, ranking bug nahi)
- Grep `openGraph.*images / twitter.*images` poore `src/app` me **zero match**. Koi tool/GEO page `images` define nahi karta.
- Sirf `src/app/opengraph-image.tsx` hai (homepage auto-cover).
- `layout.tsx:40-44` me `twitter.card: summary_large_image` hai par image hi nahi — X/Twitter `summary` pe downgrade karega, WhatsApp/Discord pe blank preview.
- **Fix:** Root layout me `images: ['/opengraph-image']` add karo (quick win), phir 6 category-wise OG templates banao.

### 1.3 Infinite thin dynamic URLs (live counters) — MEDIUM
- `live-subscriber-count/[channel]/page.tsx` (aur `live-view-count/[videoId]/page.tsx`) me `generateStaticParams` nahi hai = infinite URLs.
- Dono indexable hai (koi `noindex` nahi), self-canonical hai (`alternates.canonical: /live-subscriber-count/${channel}`).
- `sitemap.ts` me ye children include nahi hai (sahi hai), par phir bhi crawlable hai agar link/share hua.
- **Fix:** Either (a) dynamic pages ko `noindex, follow` karo, parent hi index ho, ya (b) top 100 channels pre-render + baaki `noindex`.

---

## 2. Schema Gaps (GEO/AEO)

### 2.1 Duplicate WebApplication + SoftwareApplication — LOW
- `schema-graph.ts:59-91` (homepage) aur `:115-145` (tool pages) dono me dono types same `featureList` ke saath emit hote hai.
- Invalid nahi, penalty nahi — bas redundant. **Cleanup:** ek `SoftwareApplication` rakho.

### 2.2 Organization logo too small — LOW
- `schema-graph.ts:20` `logo: ${site.url}/icon`, par `src/app/icon.tsx:3` size 32x32 hai.
- Google logo rich result min 112x112 mangta hai. Favicon ke liye 32px ok hai, schema ke liye alag 512px PNG (`/logo.png`) banao aur schema me wahi point karo.

### 2.3 HowTo builder ready par never wired — MEDIUM
- Builder `schema-graph.ts:187-199` ready hai, par `components/tools/tool-page-schema.tsx:21-27` me `howToSteps` pass hi nahi hota.
- Natija: zero HowTo rich results. **Fix:** Har tool pe 4-5 steps pass karo (2-line wiring + per-tool steps data).

### 2.4 Blog Article schema thin — MEDIUM
- `blog/[slug]/page.tsx:39-48` me sirf `datePublished`, `author: Organization`, `mainEntityOfPage: string` hai.
- Missing: `image`, `dateModified`, `author: Person`, `mainEntityOfPage` as object, `BreadcrumbList`.
- 2027 E-E-A-T ke liye `Person + Organization` author chahiye.

### 2.5 Dataset schema me distribution nahi — LOW
- `datasetNode` me `distribution` param hi nahi, `data/[slug]/page.tsx:42` bhi pass nahi karta, jabki page pe CSV download hai.
- **Fix:** `distribution: { @type: DataDownload, contentUrl: <csv>, encodingFormat: text/csv }` + `temporalCoverage` add karo.

### 2.6 Speakable missing — LOW
- Poore `src` me `speakable` zero match. `answerFirst` already hai, usko `speakable: { @type: SpeakableSpecification, cssSelector: [".answer-first"] }` se mark karo (voice/AEO bonus).

### 2.7 SearchAction — NOT A BUG (correction)
- `SearchAction/potentialAction` zero hai, ye sahi pakda tha.
- Par site pe `/search?q=` page hi nahi hai. Bina search page ke `SearchAction` lagana invalid hoga.
- **Future task:** pehle site search page, tab schema. Abhi kuch mat karo.

---

## 3. Freshness / Hygiene (LOW-MEDIUM)

| # | Finding | Evidence | Fix |
|---|---------|----------|-----|
| 3.1 | Sitemap me `lastModified` sirf blog me | `sitemap.ts:30` hai, `:8-18` tools/geo me nahi | Tools/GEO me `lastModified` add karo (git date ya content `lastUpdated`) |
| 3.2 | Hardcoded `2026` titles stale honge | `comparisons.ts:32,73,114,155`, `datasets.ts:36,81,118,147` | Year ko data-driven karo ya yearly refresh cron + `dateModified` |
| 3.3 | `viewport` / `theme-color` export nahi | `layout.tsx` me koi `viewport` export nahi | Next 16 pattern me `export const viewport` add karo |
| 3.4 | `og:url` explicit nahi | Koi page `openGraph.url` set nahi karta | Optional — Next `metadataBase + canonical` se infer karta hai |
| 3.5 | `llms.txt` me `/#tools` fragment | `llms.txt/route.ts:19` `All tools: /#tools` | Minor — `/` ya `/tools` rakho, fragment crawler strip karta hai |
| 3.6 | `sameAs: []` — NOT A BUG | `site.ts:22` intentional + comment | Jab tak real YouTube/X na ho, empty rakhna correct hai |

---

## 4. Kya sahi paya gaya (good parts — mat todna)

- `robots.ts`: GPTBot / ChatGPT-User / PerplexityBot / ClaudeBot / Google-Extended allow + `/api/` disallow — GEO ke liye correct.
- `sitemap.ts`: tools + geoPages() + blog sab auto-include — naya tool/page apne aap sitemap me aata hai.
- `answerFirst` har tool page pe present — GEO core strong hai.
- `llms.txt` + `llms-full.txt` `force-static`, correct `Content-Type: text/plain` — AI crawlers ke liye ready.
- Canonical har page pe relative path se set hai (`metadataBase` se resolve hota hai) — pattern sahi hai, bas domain env pe dhyan do.
- Security headers (`middleware.ts` + `vercel.json`): nosniff / DENY / Referrer-Policy / HSTS — ok.

---

## 5. 2027 Roadmap (improvement chances)

1. **AnswerFirst → Speakable + Takeaways:** H1 ke neeche 40-60 word answer (hai) + `speakable` schema + `Pros/Cons table` + `TL;DR bullets`. AI Overviews yahi extract karta hai.
2. **HowTo wiring on:** har tool pe 4-5 steps — sabse sasta rich-result win.
3. **Programmatic scale (GEO moat):** `tags-for 20→100 niches`, `best-time 30→50 countries`, `glossary 25→100 terms`, `vs 4→10`, `data 4→8` (Sponsorship rates, Shorts RPM 2027, Upload frequency benchmarks).
4. **Freshness automation:** har data/vs page pe visible `Last reviewed + Methodology + Sources` + `dateModified` schema. Jan 2027 se pehle year roll.
5. **Author E-E-A-T:** `/about` pe Person schema + ek author page, blog/data pe `author: Person`.
6. **OG per-category + theme:** 6 category OG templates + `viewport.themeColor`.
7. **Hindi/Hinglish hreflang:** `/hi/<tool>` ya kam se kam glossary Hindi me — India traffic + low competition.
8. **Live pages decision:** `noindex` ya top-100 pre-render (Section 1.3).

---

## 6. Naye tools jo add kar sakte ho (no ToS violation)

Downloader/MP3/MP4 mat banana — ToS + AdSense ban risk.

**High priority (recurring + low quota):**
1. Sponsorship Rate Calculator — subs/views/niche se shoutout price (backlink magnet)
2. Monetization Roadmap Calculator — 1000 subs + 4000 hrs progress tracker (returning users)
3. YouTube Text Formatter (Bold/Italic/Strike) — unicode, zero API, viral
4. Character Counter (Title/Desc/Tags) — 100/5000/500 limits live meter, pure client
5. End Screen / Cards Planner — last 20s template generator
6. Community Post Generator (AI) — poll + post, existing AI infra reuse
7. Video Outline Generator (AI) — summarizer ka ulta, GEO strong
8. Channel Audit Checklist (interactive) — 20-point packaging score, localStorage

**Medium (differentiation):**
9. Shorts vs Long-form Pay Comparator
10. Thumbnail Text Readability Scorer (preview tester ka companion)
11. Banner Safe-Area Preview (pure client crop preview)
12. Playlist Title/Desc Generator (AI)
13. Comment Reply Generator (AI)
14. Faceless Niche Finder (AI)

Quota note: naye tools me `playlistItems` (uploads playlist) prefer karo, `search.list` (100 units/call) avoid karo.

---

## 7. Verification note (honesty log)

- Pehle audit me `SearchAction missing` ko bug bola tha — **wapas liya**: bina `/search` page ke schema invalid hoga.
- `og:url` aur `llms.txt /#tools` ki severity zyada boli thi — ab LOW/hygiene mark kiya.
- `sameAs: []` gap bola tha — actually intentional + correct hai.
- Baaki core findings (1.1, 1.2, 1.3, 2.3, 2.4) dobara file:line se confirm hai.
