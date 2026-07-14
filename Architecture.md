# Architecture Document — YouTube Toolkit AI

**Version:** 1.0
**Author:** Senior Software Architect
**Date:** 2026-07-14
**Status:** Production-Ready

---

## Table of Contents

1. [PRD Weaknesses & Recommendations](#0-prd-weaknesses--recommendations)
2. [High-Level System Architecture](#1-high-level-system-architecture)
3. [Folder Structure](#2-folder-structure)
4. [Frontend Architecture](#3-frontend-architecture)
5. [Backend Architecture](#4-backend-architecture)
6. [Database Schema](#5-database-schema)
7. [API Design for Every Tool](#6-api-design-for-every-tool)
8. [Authentication Strategy](#7-authentication-strategy)
9. [AI Integration Architecture](#8-ai-integration-architecture)
10. [Caching Strategy](#9-caching-strategy)
11. [Error Handling Strategy](#10-error-handling-strategy)
12. [Rate Limiting Strategy](#11-rate-limiting-strategy)
13. [Security Considerations](#12-security-considerations)
14. [SEO Architecture](#13-seo-architecture)
15. [Performance Optimization Plan](#14-performance-optimization-plan)
16. [Analytics Architecture](#15-analytics-architecture)
17. [Deployment Architecture](#16-deployment-architecture)
18. [Environment Variables List](#17-environment-variables-list)
19. [Third-Party Services & APIs](#18-third-party-services--apis)
20. [Future Scalability Plan](#19-future-scalability-plan)
21. [Development Roadmap](#20-development-roadmap)

---

## 0. PRD Weaknesses & Recommendations

### Critical Gaps Found

| # | Issue | Severity | Recommendation |
|---|-------|----------|----------------|
| 1 | No YouTube Data API quota strategy. Free quota is 10,000 units/day; one video stats call costs 1 unit, search costs 100 units. At scale this burns instantly. | **Critical** | Implement a quota-aware proxy layer. Cache aggressively (1h for video data, 24h for channel data). Apply for quota increase immediately. Budget for a second API key as overflow. Use `youtubei.googleapis.com` innertube scraping as a free fallback for read-only metadata like thumbnails and basic info. |
| 2 | Transcript extraction is technically fragile. The YouTube Data API does not expose transcripts. The only reliable method is scraping `youtranscript` endpoints or using unofficial libraries (`youtube-transcript` npm package) which YouTube may block. | **Critical** | Use `youtube-transcript` (v1.x) with rotating User-Agent headers. Implement exponential backoff on 429s. Cache transcripts indefinitely since they rarely change. Provide a "paste transcript manually" fallback for failed extractions. |
| 3 | No observability/monitoring stack defined. A free tool will be scraped, abused, and hit edge cases constantly. Without monitoring, issues will go undetected. | **High** | Add Sentry for error tracking and Vercel Analytics for performance. Set up UptimeRobot (free tier) for health checks on all critical API routes. |
| 4 | "Trending Videos" on homepage has no data source. | **High** | Seed with a curated static JSON file of manually selected popular YouTube videos. Update periodically. Future: use YouTube Data API `videos.list` with `chart=mostPopular` — but this burns heavy quota. Keep it static for MVP. |
| 5 | Homepage URL search box UX is ambiguous. Pasting a URL should auto-detect the tool, but the PRD doesn't specify the flow. | **High** | Implement smart URL routing: parse the URL → if it's a video URL, offer contextually relevant tools (Thumbnail, Tags, Transcript, Stats) as quick actions. If it's a channel URL, offer channel tools. Add a tool picker dropdown next to the search bar. |
| 6 | Channel Tags Extractor has no viable API endpoint. The YouTube Data API does not expose channel-level tags/keywords. | **High** | This tool is infeasible via official APIs. Use the channel's video tags aggregation as a heuristic (fetch last 10 videos, collect all unique tags). Display as "Inferred Channel Tags" with a caveat. Or: use innertube API scraping. |
| 7 | Title A/B Tester is a prediction tool, not true A/B testing. The PRD calls it "A/B Tester" which is misleading. | **Medium** | Rename to "Title Analyzer" or "Title Score Predictor." Make clear it's an AI prediction, not real split testing. Add a note that YouTube doesn't support native A/B testing for titles. |
| 8 | No GDPR/cookie consent strategy. AdSense requires consent management. | **Medium** | Implement CookieYes or Osano (free tier) for consent management. Defer non-essential scripts (analytics, ads) until consent is granted. Use Vercel Edge config for geo-detection to serve appropriate consent UI. |
| 9 | No testing strategy defined. | **Medium** | Unit tests with Vitest for utility functions (URL parsing, rate limiting). Component tests with React Testing Library for interactive tools. E2E smoke tests with Playwright for critical user flows. |
| 10 | No PWA or offline strategy. | **Low** | Lower priority for MVP since tools require API calls. Add PWA manifest and basic service worker in Phase 2 for caching static assets and enabling "Add to Home Screen." |
| 11 | No i18n strategy despite AI tools supporting multiple languages. | **Low** | The site UI remains English-only for MVP. AI tools accept language as an input parameter (passed to Gemini prompt). Future: next-intl for full i18n. |
| 12 | No accessibility (a11y) plan. | **Medium** | Target WCAG 2.1 AA. shadcn/ui components already have good a11y foundations. Add axe DevTools to CI pipeline. Manual keyboard navigation testing. |
| 13 | "SEO Score Checker" scoring algorithm is undefined. | **Medium** | Implement as a rules engine: weighted formula based on title length (10%), description length (10%), tag count (15%), keyword density (20%), hashtag usage (10%), readability score via `text-readability` npm (15%), estimated watch-time fit (10%), thumbnail quality heuristics (10%). No API calls needed — purely computational. |
| 14 | Dark mode implementation details missing. | **Low** | Use Tailwind CSS `dark:` class strategy with `next-themes` provider. Respect `prefers-color-scheme` system setting. Persist preference in localStorage. |
| 15 | No content moderation for AI-generated outputs. | **High** | Wrap all Gemini responses through a safety filter: block outputs containing hate speech, violence, adult content. Use Gemini's built-in safety settings. Log flagged outputs for review. |

---

## 1. High-Level System Architecture

### Architecture Diagram (Logical)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLOUDFLARE CDN                             │
│                    (DNS, DDoS Protection, Cache)                     │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                         VERCEL EDGE                                  │
│              (Middleware: Rate Limiting, Geo Detection,              │
│               A/B Routing, Header Injection)                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                     NEXT.JS 16 APP ROUTER                            │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐    │
│  │ Server Components│  │  Client         │  │  API Routes      │    │
│  │ (Static/ISR      │  │  Components     │  │  (Route Handlers)│    │
│  │  Pages, SEO)     │  │  (Interactive   │  │                   │    │
│  │                  │  │   Tools, Forms) │  │  /api/youtube/*   │    │
│  │                  │  │                  │  │  /api/ai/*        │    │
│  └────────┬─────────┘  └────────┬────────┘  └────────┬─────────┘    │
│           │                     │                     │              │
└───────────┼─────────────────────┼─────────────────────┼──────────────┘
            │                     │                     │
   ┌────────▼─────────┐  ┌───────▼────────┐  ┌────────▼──────────┐
   │ STATIC CONTENT   │  │ BROWSER APIs   │  │ SERVER SERVICES   │
   │                  │  │                │  │                   │
   │ - Blog (MDX)     │  │ - localStorage │  │ - YouTube Data API│
   │ - FAQ            │  │ - Clipboard API│  │ - Gemini 2.5 Flash│
   │ - Landing Pages  │  │ - Share API    │  │ - Supabase        │
   │ - Schema JSON-LD │  │ - Download     │  │ - Upstash Redis   │
   └──────────────────┘  └────────────────┘  │ - Sentry          │
                                             │ - PostHog         │
                                             └───────────────────┘
```

### Data Flow

```
User Action → Client Component → API Route → Rate Limit Check (Redis)
                                                  │
                                    ┌─────────────┴─────────────┐
                                    │                           │
                              Cache Hit?                    Cache Miss?
                                    │                           │
                              Return Cached            YouTube/YouTube/YouTube/
                              Data from Redis           YouTube Data API
                                    │                 or Gemini API
                                    │                           │
                                    └─────────────┬─────────────┘
                                                  │
                                          Store in Cache
                                          (TTL varies by tool)
                                                  │
                                          Return to Client
                                                  │
                                          Client Renders Output
```

### Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 16 App Router | Server Components for SEO; streaming for slow AI responses; ISR for blog/landing pages |
| Language | TypeScript (strict) | Type safety across entire codebase |
| Styling | Tailwind CSS + shadcn/ui | Utility-first for maintainability; shadcn/ui for accessible, customizable primitives |
| State Management | URL search params + React Context | No global state library needed. URL params for tool inputs (shareable/bookmarkable), Context for theme/preferences |
| API Layer | Next.js Route Handlers | Co-located with frontend; no separate backend needed for MVP |
| Caching | Upstash Redis (Serverless) | Global rate limiting; response caching; quota-aware cache TTLs |
| Database | Supabase (PostgreSQL) | Future user accounts, history, saved searches. Used minimally in MVP |
| Monitoring | Sentry + Vercel Analytics | Error tracking; Web Vitals; user behavior |
| Package Manager | pnpm | Disk-efficient; strict dependency resolution |
| Formatting | Prettier + ESLint (flat config) | Consistent code style |
| Testing | Vitest + React Testing Library + Playwright | Unit → Component → E2E pyramid |

---

## 2. Folder Structure

```
yt-toolkit/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                          # Lint + TypeCheck + Test + Build
│       └── preview.yml                     # Vercel preview deployments
│
├── public/
│   ├── icons/                              # Favicons, PWA icons
│   ├── images/                             # Static images, OG images
│   │   └── og/                             # Pre-generated OG images for tools
│   ├── robots.txt
│   ├── sitemap.xml                         # Generated at build time
│   └── manifest.json                       # PWA manifest
│
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── layout.tsx                      # Root layout (providers, fonts, metadata)
│   │   ├── page.tsx                        # Homepage
│   │   ├── not-found.tsx                   # 404 page
│   │   ├── error.tsx                       # Global error boundary
│   │   ├── loading.tsx                     # Global loading skeleton
│   │   ├── global-error.tsx                # Root-level error fallback
│   │   ├── sitemap.ts                      # Dynamic sitemap generation
│   │   ├── robots.ts                       # Dynamic robots.txt
│   │   ├── manifest.ts                     # Dynamic PWA manifest
│   │   │
│   │   ├── (marketing)/                    # Route group: marketing pages
│   │   │   ├── layout.tsx                  # Marketing layout (header, footer)
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── blog/
│   │   │       ├── page.tsx               # Blog listing
│   │   │       └── [slug]/
│   │   │           └── page.tsx           # Blog post (MDX)
│   │   │
│   │   ├── (tools)/                        # Route group: tool pages
│   │   │   ├── layout.tsx                 # Tool layout (breadcrumbs, sidebar, ads)
│   │   │   ├── thumbnail-downloader/
│   │   │   │   └── page.tsx
│   │   │   ├── tags-extractor/
│   │   │   │   └── page.tsx
│   │   │   ├── channel-tags/
│   │   │   │   └── page.tsx
│   │   │   ├── transcript-extractor/
│   │   │   │   └── page.tsx
│   │   │   ├── title-generator/
│   │   │   │   └── page.tsx
│   │   │   ├── description-generator/
│   │   │   │   └── page.tsx
│   │   │   ├── hashtag-generator/
│   │   │   │   └── page.tsx
│   │   │   ├── video-statistics/
│   │   │   │   └── page.tsx
│   │   │   ├── channel-statistics/
│   │   │   │   └── page.tsx
│   │   │   ├── keyword-generator/
│   │   │   │   └── page.tsx
│   │   │   ├── hook-generator/
│   │   │   │   └── page.tsx
│   │   │   ├── timestamp-generator/
│   │   │   │   └── page.tsx
│   │   │   ├── shorts-ideas/
│   │   │   │   └── page.tsx
│   │   │   ├── seo-score-checker/
│   │   │   │   └── page.tsx
│   │   │   └── title-analyzer/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                            # API Routes (Route Handlers)
│   │       ├── youtube/
│   │       │   ├── thumbnail/
│   │       │   │   └── route.ts            # GET /api/youtube/thumbnail?v=VIDEO_ID
│   │       │   ├── tags/
│   │       │   │   └── route.ts            # GET /api/youtube/tags?v=VIDEO_ID
│   │       │   ├── channel-tags/
│   │       │   │   └── route.ts            # GET /api/youtube/channel-tags?c=CHANNEL_ID
│   │       │   ├── transcript/
│   │       │   │   └── route.ts            # GET /api/youtube/transcript?v=VIDEO_ID
│   │       │   ├── video-stats/
│   │       │   │   └── route.ts            # GET /api/youtube/video-stats?v=VIDEO_ID
│   │       │   ├── channel-stats/
│   │       │   │   └── route.ts            # GET /api/youtube/channel-stats?c=CHANNEL_ID
│   │       │   └── resolve/
│   │       │       └── route.ts            # GET /api/youtube/resolve?url=... (smart router)
│   │       │
│   │       ├── ai/
│   │       │   ├── generate-titles/
│   │       │   │   └── route.ts            # POST /api/ai/generate-titles
│   │       │   ├── generate-description/
│   │       │   │   └── route.ts            # POST /api/ai/generate-description
│   │       │   ├── generate-hashtags/
│   │       │   │   └── route.ts            # POST /api/ai/generate-hashtags
│   │       │   ├── generate-hooks/
│   │       │   │   └── route.ts            # POST /api/ai/generate-hooks
│   │       │   ├── generate-keywords/
│   │       │   │   └── route.ts            # POST /api/ai/generate-keywords
│   │       │   ├── generate-timestamps/
│   │       │   │   └── route.ts            # POST /api/ai/generate-timestamps
│   │       │   ├── generate-shorts-ideas/
│   │       │   │   └── route.ts            # POST /api/ai/generate-shorts-ideas
│   │       │   ├── summarize-transcript/
│   │       │   │   └── route.ts            # POST /api/ai/summarize-transcript
│   │       │   ├── analyze-title/
│   │       │   │   └── route.ts            # POST /api/ai/analyze-title
│   │       │   └── seo-score/
│   │       │       └── route.ts            # POST /api/ai/seo-score (computational)
│   │       │
│   │       └── internal/
│   │           ├── sitemap/
│   │           │   └── route.ts            # Internal sitemap data
│   │           └── health/
│   │               └── route.ts            # Health check endpoint
│   │
│   ├── components/                         # Shared React components
│   │   ├── ui/                             # shadcn/ui primitives (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── separator.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                         # Layout components
│   │   │   ├── header.tsx                  # Main navigation header
│   │   │   ├── footer.tsx                  # Global footer
│   │   │   ├── mobile-nav.tsx              # Mobile hamburger menu
│   │   │   ├── breadcrumbs.tsx             # Auto-generated breadcrumbs
│   │   │   ├── sidebar.tsx                 # Tool sidebar (related tools, ads)
│   │   │   └── theme-toggle.tsx            # Dark/light mode toggle
│   │   │
│   │   ├── home/                           # Homepage-specific components
│   │   │   ├── hero.tsx                    # Hero section with URL input
│   │   │   ├── url-search-box.tsx          # Smart URL input with tool detection
│   │   │   ├── popular-tools.tsx           # Popular tools grid
│   │   │   ├── trending-videos.tsx         # Trending videos section
│   │   │   ├── blog-preview.tsx            # Latest blog posts
│   │   │   └── faq-section.tsx             # Homepage FAQ
│   │   │
│   │   ├── tools/                          # Shared tool components
│   │   │   ├── tool-input.tsx              # Generic tool input wrapper
│   │   │   ├── tool-output.tsx             # Generic tool output display
│   │   │   ├── tool-loading.tsx            # Loading skeleton for tools
│   │   │   ├── tool-error.tsx              # Error display for tools
│   │   │   ├── output-actions.tsx          # Copy, Download, Share buttons
│   │   │   ├── related-tools.tsx           # Related tools section
│   │   │   ├── tool-faq.tsx                # Tool-specific FAQ
│   │   │   ├── tool-schema.tsx             # JSON-LD schema for tool page
│   │   │   ├── recent-searches.tsx         # Recent searches (localStorage)
│   │   │   └── ad-placeholder.tsx          # AdSense slot wrapper
│   │   │
│   │   ├── thumbnail-downloader/           # Tool-specific components
│   │   │   ├── thumbnail-preview.tsx
│   │   │   ├── quality-selector.tsx
│   │   │   └── download-button.tsx
│   │   │
│   │   ├── tags-extractor/
│   │   │   ├── tags-list.tsx
│   │   │   └── tag-badge.tsx
│   │   │
│   │   ├── transcript-extractor/
│   │   │   ├── transcript-viewer.tsx
│   │   │   └── language-selector.tsx
│   │   │
│   │   ├── title-generator/
│   │   │   ├── title-form.tsx
│   │   │   ├── title-results.tsx
│   │   │   └── tone-selector.tsx
│   │   │
│   │   ├── description-generator/
│   │   │   ├── description-form.tsx
│   │   │   └── description-output.tsx
│   │   │
│   │   ├── video-statistics/
│   │   │   ├── stats-card.tsx
│   │   │   └── engagement-chart.tsx
│   │   │
│   │   ├── channel-statistics/
│   │   │   ├── channel-header.tsx
│   │   │   └── recent-uploads.tsx
│   │   │
│   │   ├── keyword-generator/
│   │   │   ├── keyword-results.tsx
│   │   │   └── difficulty-badge.tsx
│   │   │
│   │   ├── hook-generator/
│   │   │   ├── hook-form.tsx
│   │   │   └── hook-cards.tsx
│   │   │
│   │   ├── shorts-ideas/
│   │   │   ├── ideas-grid.tsx
│   │   │   └── virality-meter.tsx
│   │   │
│   │   ├── seo-score-checker/
│   │   │   ├── seo-form.tsx
│   │   │   ├── score-display.tsx
│   │   │   └── suggestion-list.tsx
│   │   │
│   │   └── title-analyzer/
│   │       ├── title-compare-form.tsx
│   │       └── comparison-result.tsx
│   │
│   ├── lib/                                # Core business logic (no React)
│   │   ├── youtube/                        # YouTube-specific logic
│   │   │   ├── client.ts                   # YouTube Data API v3 client wrapper
│   │   │   ├── url-parser.ts               # Extract video/channel ID from URLs
│   │   │   ├── thumbnail.ts                # Thumbnail URL construction
│   │   │   ├── transcript.ts               # Transcript fetching (youtube-transcript)
│   │   │   ├── quota.ts                    # Quota tracking & management
│   │   │   └── types.ts                    # YouTube API response types
│   │   │
│   │   ├── ai/                             # AI-specific logic
│   │   │   ├── gemini.ts                   # Gemini 2.5 Flash client
│   │   │   ├── prompts/                    # Prompt templates
│   │   │   │   ├── title-generation.ts
│   │   │   │   ├── description-generation.ts
│   │   │   │   ├── hashtag-generation.ts
│   │   │   │   ├── hook-generation.ts
│   │   │   │   ├── keyword-generation.ts
│   │   │   │   ├── timestamp-generation.ts
│   │   │   │   ├── shorts-ideas.ts
│   │   │   │   ├── transcript-summary.ts
│   │   │   │   └── title-analysis.ts
│   │   │   ├── safety.ts                   # Content safety filter
│   │   │   └── token-counter.ts            # Estimate token usage
│   │   │
│   │   ├── seo/                            # SEO utilities
│   │   │   ├── score-calculator.ts         # SEO score rules engine
│   │   │   ├── readability.ts              # Readability scoring (Flesch-Kincaid)
│   │   │   └── keyword-density.ts          # Keyword density calculator
│   │   │
│   │   ├── cache/                          # Caching layer
│   │   │   ├── redis.ts                    # Upstash Redis client
│   │   │   ├── cache-keys.ts               # Cache key generation
│   │   │   └── cache-policies.ts           # TTL constants per data type
│   │   │
│   │   ├── rate-limit/                     # Rate limiting
│   │   │   ├── limiter.ts                  # Rate limiter using Redis
│   │   │   └── config.ts                   # Rate limit tiers
│   │   │
│   │   ├── analytics/                      # Analytics helpers
│   │   │   ├── posthog-server.ts           # Server-side PostHog client
│   │   │   └── events.ts                   # Event name constants
│   │   │
│   │   ├── db/                             # Database client
│   │   │   └── supabase.ts                 # Supabase server client
│   │   │
│   │   ├── utils/                          # General utilities
│   │   │   ├── cn.ts                       # Tailwind class merge (clsx + twMerge)
│   │   │   ├── url.ts                      # URL validation & sanitization
│   │   │   ├── format.ts                   # Number/date formatting
│   │   │   ├── download.ts                 # Client-side file download helper
│   │   │   ├── clipboard.ts               # Clipboard API wrapper
│   │   │   └── constants.ts               # Site-wide constants
│   │   │
│   │   └── validators/                     # Input validation schemas
│   │       ├── youtube-url.ts              # YouTube URL validation (Zod)
│   │       └── tool-inputs.ts              # Tool-specific input schemas
│   │
│   ├── hooks/                              # Custom React hooks
│   │   ├── use-youtube-url.ts              # YouTube URL state + validation
│   │   ├── use-tool-api.ts                 # Generic tool API call hook (SWR-like)
│   │   ├── use-copy-to-clipboard.ts        # Copy with feedback toast
│   │   ├── use-download.ts                 # Trigger file download
│   │   ├── use-recent-searches.ts          # localStorage recent searches
│   │   ├── use-debounce.ts                 # Debounced value
│   │   └── use-media-query.ts             # Responsive breakpoint detection
│   │
│   ├── contexts/                           # React contexts
│   │   ├── theme-provider.tsx              # Dark mode context (next-themes)
│   │   └── toast-provider.tsx              # Toast notification context
│   │
│   ├── content/                            # Static content
│   │   ├── blog/                           # Blog posts in MDX
│   │   │   ├── how-to-download-youtube-thumbnails.mdx
│   │   │   ├── youtube-seo-complete-guide.mdx
│   │   │   └── ...
│   │   ├── faq/                            # FAQ data per tool
│   │   │   ├── thumbnail-downloader.ts
│   │   │   ├── tags-extractor.ts
│   │   │   └── ...
│   │   ├── tools-metadata.ts               # Tool names, descriptions, slugs, icons
│   │   ├── trending-videos.json            # Curated trending videos data
│   │   └── affiliate-links.ts              # Affiliate link configurations
│   │
│   ├── styles/
│   │   └── globals.css                     # Tailwind directives + CSS variables
│   │
│   └── middleware.ts                       # Next.js middleware (rate limiting, headers)
│
├── tests/
│   ├── unit/                               # Vitest unit tests
│   │   ├── lib/
│   │   │   ├── youtube/
│   │   │   │   ├── url-parser.test.ts
│   │   │   │   └── thumbnail.test.ts
│   │   │   ├── seo/
│   │   │   │   ├── score-calculator.test.ts
│   │   │   │   └── keyword-density.test.ts
│   │   │   └── utils/
│   │   │       └── url.test.ts
│   │   └── ...
│   │
│   ├── components/                         # React Testing Library tests
│   │   ├── url-search-box.test.tsx
│   │   ├── tags-list.test.tsx
│   │   └── ...
│   │
│   └── e2e/                                # Playwright E2E tests
│       ├── homepage.spec.ts
│       ├── thumbnail-downloader.spec.ts
│       └── ...
│
├── supabase/
│   └── migrations/                         # Database migrations
│       └── 00001_initial_schema.sql
│
├── .env.example                            # Environment variable template
├── .env.local                              # Local environment variables (gitignored)
├── .eslintrc.json                          # ESLint configuration
├── .prettierrc                             # Prettier configuration
├── components.json                         # shadcn/ui configuration
├── next.config.ts                          # Next.js configuration
├── tailwind.config.ts                      # Tailwind CSS configuration
├── postcss.config.mjs                      # PostCSS configuration
├── tsconfig.json                           # TypeScript configuration
├── vitest.config.ts                        # Vitest configuration
├── playwright.config.ts                    # Playwright configuration
├── vercel.json                             # Vercel deployment configuration
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 3. Frontend Architecture

### Component Architecture

```
┌─────────────────────────────────────────────────┐
│                  RootLayout                      │
│  ┌───────────────────────────────────────────┐  │
│  │  ThemeProvider                             │  │
│  │  ToastProvider                             │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  Header (Server Component)          │  │  │
│  │  │  - Logo, Nav Links, Theme Toggle    │  │  │
│  │  │  - Mobile Menu (Client Component)   │  │  │
│  │  ├─────────────────────────────────────┤  │  │
│  │  │  Page Content (Server Component)    │  │  │
│  │  │  ┌───────────────────────────────┐  │  │  │
│  │  │  │ Tool Page Layout              │  │  │  │
│  │  │  │ ├── Breadcrumbs (Server)      │  │  │  │
│  │  │  │ ├── SEO Content (Server)      │  │  │  │
│  │  │  │ ├── Tool Interactive Area     │  │  │  │
│  │  │  │ │   (Client Component)        │  │  │  │
│  │  │  │ ├── FAQ (Server)              │  │  │  │
│  │  │  │ └── Related Tools (Server)    │  │  │  │
│  │  │  └───────────────────────────────┘  │  │  │
│  │  ├─────────────────────────────────────┤  │  │
│  │  │  Footer (Server Component)           │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Rendering Strategy Per Page Type

| Page Type | Strategy | Rationale |
|-----------|----------|-----------|
| Homepage | ISR (revalidate: 3600) | Mostly static content; periodic updates for trending/blog |
| Tool Landing Pages | Static + Client Islands | SEO content is static; the interactive tool widget is a client component |
| Blog Posts | SSG (static at build) | MDX content; no runtime data |
| About/Contact | Static | Pure static pages |
| 404/Error | Static | Always available |

### Client vs Server Component Split

**Server Components (default for all pages):**
- Layouts (header, footer, breadcrumbs)
- SEO content sections (1200+ word descriptions, FAQs)
- Blog content (MDX rendering)
- Related tools sections
- Schema markup injection

**Client Components (only where interactivity is needed):**
- URL search box
- Tool input forms
- Tool output displays
- Copy/Download/Share buttons
- Dark mode toggle
- Mobile navigation menu
- Ad placements (AdSense requires client-side)
- Recent searches (localStorage)

### State Management

No global state library. Three-tier approach:

1. **URL Search Params** — Shareable tool state. When a user enters a YouTube URL and gets results, the URL becomes `/thumbnail-downloader?v=dQw4w9WgXcQ`. Bookmarkable, shareable.

2. **React Context** — Theme preference, toast notifications. Lightweight, infrequently updated.

3. **localStorage** — Recent searches (last 10 per tool type), theme persistence. No server sync needed.

### Responsive Design

Breakpoints follow Tailwind defaults:
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (wide desktop)

Mobile-first approach. Tool output cards stack vertically on mobile, side-by-side on desktop. The URL search box is full-width on mobile.

### Accessibility (WCAG 2.1 AA)

- All interactive elements have focus styles (Tailwind `focus-visible:ring`)
- Color contrast ratios ≥ 4.5:1 (verified via axe DevTools)
- All images have alt text
- Forms have associated labels
- Skip-to-content link at top of page
- ARIA labels on icon-only buttons
- Keyboard-navigable tool outputs
- Screen reader announcements for loading/error states

---

## 4. Backend Architecture

### API Layer Design

All APIs are Next.js Route Handlers under `/api/`. Each handler follows a consistent pattern:

```
1. Parse & Validate Input (Zod)
2. Rate Limit Check (Upstash Redis)
3. Cache Lookup (Upstash Redis)
4. Fetch/Compute Data (YouTube API / Gemini / Local Computation)
5. Store in Cache
6. Return Response
7. Track Analytics Event (fire-and-forget)
```

### Middleware Pipeline

Next.js `middleware.ts` runs on the Vercel Edge Network for every request:

1. **Rate Limiting** — Token bucket per IP. 60 requests/minute for YouTube API endpoints, 20 requests/minute for AI endpoints.
2. **Security Headers** — Inject CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
3. **HTTPS Enforcement** — Redirect HTTP to HTTPS.
4. **Geo Detection** — Set `x-vercel-ip-country` for analytics and GDPR consent.
5. **Bot Protection** — Basic user-agent filtering for known bad bots.
6. **Request ID** — Attach `x-request-id` for tracing.

### YouTube Data API Client

A singleton wrapper around `@googleapis/youtube`:

```
lib/youtube/client.ts
├── getVideoDetails(videoId)     → videos.list(id, snippet, statistics, contentDetails)
├── getChannelDetails(channelId) → channels.list(id, snippet, statistics, brandingSettings)
├── getVideoTags(videoId)        → videos.list(id, snippet.tags)
├── getChannelVideos(channelId)  → search.list(channelId, type: video, order: date, maxResults: 10)
├── searchVideos(query)          → search.list(q, type: video, maxResults: 20)
├── resolveUrl(url)              → Parse URL → determine video/channel ID → return type + ID
└── checkQuota()                 → Track API unit consumption
```

### AI Service Layer

```
lib/ai/gemini.ts
├── generate(prompt, options)   → Gemini 2.5 Flash generateContent
├── generateStreaming(prompt)   → Streaming response for real-time UX
├── countTokens(text)           → Estimate input token count
└── applySafetyFilter(response) → Check against safety thresholds
```

All AI calls use structured prompts from `lib/ai/prompts/` with:
- System instructions for role/persona
- Structured output format (JSON when possible)
- Temperature: 0.7 for creative tasks, 0.3 for analytical
- Max output tokens: 2048 for titles/hashtags, 4096 for descriptions/transcripts
- Safety settings: BLOCK_MEDIUM_AND_ABOVE for all harm categories

### YouTube URL Parser

```
lib/youtube/url-parser.ts

Supported formats:
- https://www.youtube.com/watch?v=VIDEO_ID
- https://youtu.be/VIDEO_ID
- https://youtube.com/shorts/VIDEO_ID
- https://www.youtube.com/embed/VIDEO_ID
- https://www.youtube.com/@HANDLE
- https://www.youtube.com/channel/CHANNEL_ID
- https://www.youtube.com/c/CUSTOM_NAME

Returns: { type: 'video' | 'channel', id: string, rawUrl: string }
```

---

## 5. Database Schema (Supabase)

Supabase is used minimally in MVP. The schema is designed for future user accounts and Pro features.

### MVP Tables

```sql
-- Tool usage analytics (anonymous, for popularity tracking)
CREATE TABLE tool_usage (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug     VARCHAR(100) NOT NULL,
  input_hash    VARCHAR(64),           -- SHA-256 of input (for dedup, not storing raw input)
  success       BOOLEAN NOT NULL,
  duration_ms   INTEGER,
  country       VARCHAR(2),            -- From Vercel geo header
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tool_usage_slug ON tool_usage(tool_slug, created_at);
CREATE INDEX idx_tool_usage_created ON tool_usage(created_at);

-- API quota tracking
CREATE TABLE quota_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_name      VARCHAR(50) NOT NULL,   -- 'youtube' | 'gemini'
  units_used    INTEGER NOT NULL,
  endpoint      VARCHAR(200),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quota_log_created ON quota_log(created_at);

-- Cached affinity data (affiliate link clicks)
CREATE TABLE affiliate_clicks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id       VARCHAR(50) NOT NULL,
  tool_slug     VARCHAR(100),
  country       VARCHAR(2),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Blog post views
CREATE TABLE blog_views (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          VARCHAR(200) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_views_slug ON blog_views(slug);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(200),
  email         VARCHAR(320) NOT NULL,
  subject       VARCHAR(500),
  message       TEXT NOT NULL,
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Future Tables (Phase 3+)

```sql
-- User accounts (when authentication is added)
CREATE TABLE users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id),
  plan          VARCHAR(20) DEFAULT 'free',  -- 'free' | 'pro' | 'enterprise'
  daily_ai_uses INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Saved searches / history (Pro feature)
CREATE TABLE saved_searches (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) NOT NULL,
  tool_slug     VARCHAR(100) NOT NULL,
  input_data    JSONB NOT NULL,
  result_data   JSONB,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- User API keys (Pro feature)
CREATE TABLE api_keys (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) NOT NULL,
  key_hash      VARCHAR(64) NOT NULL UNIQUE,
  name          VARCHAR(200),
  last_used_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
```

---

## 6. API Design for Every Tool

### Common Response Envelope

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "cached": boolean,
    "duration_ms": number,
    "quota_used": number
  }
}

// Error
{
  "success": false,
  "error": {
    "code": string,        // 'INVALID_URL' | 'RATE_LIMITED' | 'YOUTUBE_API_ERROR' | 'AI_GENERATION_FAILED' | 'TRANSCRIPT_UNAVAILABLE'
    "message": string,     // User-friendly message
    "details"?: string     // Optional technical details
  }
}
```

### Tool API Specifications

#### 1. Thumbnail Downloader

```
GET /api/youtube/thumbnail?v={videoId}&quality={max|hd|sd|hq|mq}

Response:
{
  "success": true,
  "data": {
    "videoId": "dQw4w9WgXcQ",
    "videoTitle": "Rick Astley - Never Gonna Give You Up",
    "thumbnails": [
      { "quality": "max", "url": "https://img.youtube.com/vi/.../maxresdefault.jpg", "width": 1280, "height": 720 },
      { "quality": "hd", "url": "https://img.youtube.com/vi/.../hqdefault.jpg", "width": 480, "height": 360 },
      { "quality": "sd", "url": "https://img.youtube.com/vi/.../sddefault.jpg", "width": 640, "height": 480 },
      { "quality": "hq", "url": "https://img.youtube.com/vi/.../hqdefault.jpg", "width": 480, "height": 360 },
      { "quality": "mq", "url": "https://img.youtube.com/vi/.../mqdefault.jpg", "width": 320, "height": 180 }
    ]
  }
}

Quota: 1 unit (YouTube Data API: videos.list with snippet only)
Cache TTL: 24 hours (thumbnails rarely change)
```

#### 2. Tags Extractor

```
GET /api/youtube/tags?v={videoId}

Response:
{
  "success": true,
  "data": {
    "videoId": "dQw4w9WgXcQ",
    "videoTitle": "Rick Astley - Never Gonna Give You Up",
    "tags": ["music", "rick astley", "80s", "pop"],
    "tagCount": 4,
    "formatted": "music, rick astley, 80s, pop"
  }
}

Quota: 1 unit
Cache TTL: 1 hour (tags can be updated by creator)
```

#### 3. Channel Tags Extractor

```
GET /api/youtube/channel-tags?c={channelId}

Response:
{
  "success": true,
  "data": {
    "channelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
    "channelTitle": "Channel Name",
    "inferredTags": ["tag1", "tag2", "tag3"],    // Aggregated from recent video tags
    "videoCount": 10,                              // Number of videos analyzed
    "disclaimer": "Tags are inferred from the channel's 10 most recent video tags. YouTube does not expose channel-level tag data."
  }
}

Quota: ~11 units (1 for channel + 10 for individual video snippets)
Cache TTL: 24 hours
```

#### 4. Transcript Extractor

```
GET /api/youtube/transcript?v={videoId}&lang={languageCode}

Response:
{
  "success": true,
  "data": {
    "videoId": "dQw4w9WgXcQ",
    "language": "en",
    "transcript": "We're no strangers to love...",
    "segments": [
      { "text": "We're no strangers to love", "duration": 3.2, "offset": 0 },
      ...
    ],
    "fullText": "We're no strangers to love...",
    "availableLanguages": ["en", "es", "fr"]
  }
}

Quota: 0 units (uses youtube-transcript scraping, not Data API)
Cache TTL: Indefinite (transcripts rarely change)
```

#### 5. AI Title Generator

```
POST /api/ai/generate-titles

Request Body:
{
  "topic": "How to Start a YouTube Channel",
  "keyword": "youtube beginners guide 2025",
  "language": "en",
  "tone": "professional",           // professional | casual | clickbait | educational | humorous
  "count": 10                        // 1-20
}

Response:
{
  "success": true,
  "data": {
    "titles": [
      { "title": "...", "seoScore": 85, "emotionalAppeal": "curiosity" },
      ...
    ],
    "meta": {
      "tokensUsed": 450,
      "model": "gemini-2.5-flash"
    }
  }
}

Cache TTL: 0 (not cached — each generation is unique)
Rate Limit: 20 requests/minute per IP
```

#### 6. AI Description Generator

```
POST /api/ai/generate-description

Request Body:
{
  "topic": "How to Start a YouTube Channel",
  "keyword": "youtube beginners guide",
  "summary": "A complete step-by-step guide for beginners...",
  "tone": "educational",
  "includeTimestamps": true,
  "includeHashtags": true,
  "includeCTA": true
}

Response:
{
  "success": true,
  "data": {
    "description": "Full description text...",
    "hashtags": ["#YouTubeTips", "#ContentCreator", ...],
    "timestamps": ["0:00 Introduction", "1:23 Step 1: ...", ...],
    "cta": "Subscribe for more YouTube tips! 🔔",
    "meta": {
      "tokensUsed": 1200,
      "model": "gemini-2.5-flash"
    }
  }
}
```

#### 7. AI Hashtag Generator

```
POST /api/ai/generate-hashtags

Request Body:
{
  "topic": "iPhone 16 Review",
  "count": 30
}

Response:
{
  "success": true,
  "data": {
    "hashtags": ["#iPhone16", "#AppleReview", "#TechReview", ...],
    "grouped": {
      "broad": ["#Tech", "#Review", ...],
      "niche": ["#iPhone16Review", "#Apple2025", ...],
      "trending": ["#iPhone16", "#NewTech", ...]
    }
  }
}
```

#### 8. Video Statistics

```
GET /api/youtube/video-stats?v={videoId}

Response:
{
  "success": true,
  "data": {
    "videoId": "dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up",
    "thumbnail": "https://img.youtube.com/vi/.../hqdefault.jpg",
    "channelTitle": "Rick Astley",
    "channelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
    "publishedAt": "2009-10-25T06:57:33Z",
    "duration": "3:33",
    "category": "Music",
    "viewCount": 1500000000,
    "likeCount": 17500000,
    "commentCount": 1500000,
    "tags": ["music", "rick astley", "80s"],
    "description": "..."
  }
}

Quota: 1 unit
Cache TTL: 1 hour for older videos (>1 week), 15 minutes for recent
```

#### 9. Channel Statistics

```
GET /api/youtube/channel-stats?c={channelId}

Response:
{
  "success": true,
  "data": {
    "channelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
    "title": "Channel Name",
    "description": "...",
    "thumbnail": "https://yt3.ggpht.com/...",
    "customUrl": "@handle",
    "publishedAt": "2010-01-01T00:00:00Z",
    "country": "US",
    "subscriberCount": 5000000,
    "videoCount": 500,
    "viewCount": 1000000000,
    "recentUploads": [
      {
        "videoId": "...",
        "title": "...",
        "thumbnail": "...",
        "publishedAt": "...",
        "viewCount": ...
      }
      // Last 5 videos
    ]
  }
}

Quota: 2 units (1 for channels.list + 1 for search.list)
Cache TTL: 24 hours
```

#### 10. Keyword Generator

```
POST /api/ai/generate-keywords

Request Body:
{
  "seedKeyword": "youtube seo",
  "language": "en"
}

Response:
{
  "success": true,
  "data": {
    "seedKeyword": "youtube seo",
    "keywords": [
      {
        "keyword": "youtube seo tips",
        "difficulty": "medium",
        "popularity": "high",
        "intent": "informational",
        "relatedKeywords": ["youtube ranking", "video seo"],
        "suggestedQuestions": ["How to rank YouTube videos?", ...]
      },
      ...
    ]
  }
}
```

#### 11. Timestamp Generator

```
POST /api/ai/generate-timestamps

Request Body:
{
  "transcript": "Full transcript text here..."
}

Response:
{
  "success": true,
  "data": {
    "chapters": [
      { "timestamp": "0:00", "title": "Introduction" },
      { "timestamp": "2:15", "title": "Main Topic" },
      ...
    ]
  }
}
```

#### 12. Hook Generator

```
POST /api/ai/generate-hooks

Request Body:
{
  "topic": "How to Save Money",
  "audience": "young professionals",
  "tone": "bold",
  "count": 10
}

Response:
{
  "success": true,
  "data": {
    "hooks": {
      "question": ["Are you making THIS money mistake...?", ...],
      "story": ["I was $50k in debt until I learned this...", ...],
      "curiosity": ["The 3-minute rule that changed my finances...", ...],
      "shock": ["You're losing $500/month because of this...", ...]
    }
  }
}
```

#### 13. Shorts Idea Generator

```
POST /api/ai/generate-shorts-ideas

Request Body:
{
  "topic": "cooking tips",
  "count": 50
}

Response:
{
  "success": true,
  "data": {
    "ideas": [
      {
        "idea": "The 30-second egg peeling hack that actually works",
        "trendScore": 85,
        "viralityScore": 78,
        "category": "lifehack"
      },
      ...
    ]
  }
}
```

#### 14. SEO Score Checker

```
POST /api/ai/seo-score            // Note: This is computational, not AI

Request Body:
{
  "title": "How to Start a YouTube Channel in 2025",
  "description": "A complete guide for...",
  "tags": ["youtube", "beginners", "guide"],
  "hashtags": ["#YouTube", "#ContentCreator"],
  "keyword": "youtube beginners guide",
  "category": "education"
}

Response:
{
  "success": true,
  "data": {
    "overallScore": 78,
    "breakdown": {
      "title": { "score": 85, "maxScore": 100, "suggestions": ["..."], "weight": 0.10 },
      "description": { "score": 72, "maxScore": 100, "suggestions": ["..."], "weight": 0.10 },
      "tags": { "score": 90, "maxScore": 100, "suggestions": [], "weight": 0.15 },
      "keywordDensity": { "score": 65, "maxScore": 100, "suggestions": ["..."], "weight": 0.20 },
      "hashtags": { "score": 80, "maxScore": 100, "suggestions": ["..."], "weight": 0.10 },
      "readability": { "score": 70, "maxScore": 100, "suggestions": ["..."], "weight": 0.15 },
      "structure": { "score": 85, "maxScore": 100, "suggestions": [], "weight": 0.10 },
      "engagementHooks": { "score": 75, "maxScore": 100, "suggestions": ["..."], "weight": 0.10 }
    },
    "topSuggestions": [
      "Increase keyword density from 1.2% to 2-3%",
      "Add more line breaks for readability",
      "Include a clear call-to-action in the description"
    ]
  }
}
```

#### 15. Title Analyzer (Renamed from Title A/B Tester)

```
POST /api/ai/analyze-title

Request Body:
{
  "titleA": "How to Start a YouTube Channel",
  "titleB": "I Started a YouTube Channel with $0 — Here's What Happened",
  "keyword": "youtube beginners guide"
}

Response:
{
  "success": true,
  "data": {
    "titleA": {
      "title": "How to Start a YouTube Channel",
      "ctrPrediction": 4.2,
      "seoScore": 82,
      "emotionScore": 35,
      "powerWords": ["Start"],
      "sentiment": "neutral"
    },
    "titleB": {
      "title": "I Started a YouTube Channel with $0 — Here's What Happened",
      "ctrPrediction": 7.8,
      "seoScore": 68,
      "emotionScore": 72,
      "powerWords": ["Started", "$0", "What Happened"],
      "sentiment": "curiosity-driven"
    },
    "winner": "B",
    "analysis": "Title B has 86% higher predicted CTR due to stronger emotional appeal and curiosity gap. However, Title A scores better on SEO keyword placement. Consider: 'I Started a YouTube Channel with $0 — Complete Beginner's Guide' to combine both strengths."
  }
}
```

### Smart URL Resolution Endpoint

```
GET /api/youtube/resolve?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ

Response:
{
  "success": true,
  "data": {
    "type": "video",
    "id": "dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up",    // If we can resolve it
    "suggestedTools": [
      { "slug": "thumbnail-downloader", "name": "Thumbnail Downloader", "icon": "..." },
      { "slug": "tags-extractor", "name": "Tags Extractor", "icon": "..." },
      { "slug": "transcript-extractor", "name": "Transcript Extractor", "icon": "..." },
      { "slug": "video-statistics", "name": "Video Statistics", "icon": "..." }
    ]
  }
}
```

This powers the homepage smart search box.

---

## 7. Authentication Strategy

### MVP: No Authentication

The entire product is designed to work without login. This is a core differentiator.

**No-auth benefits:**
- Zero friction for users
- No user data to manage or protect
- Simpler GDPR compliance
- Faster development

### Rate Limiting Without Auth (IP-Based)

```
lib/rate-limit/limiter.ts

Strategy: Sliding window counter per IP using Upstash Redis
- YouTube endpoints: 60 req/min per IP
- AI endpoints: 20 req/min per IP
- SEO score (computational): 120 req/min per IP
- Resolve URL: 60 req/min per IP
```

### Future Authentication (Phase 5+)

When the Pro plan launches:

- **Provider:** Supabase Auth (email/password + Google OAuth)
- **Session:** Supabase `sb-access-token` cookie (httpOnly, secure, sameSite: lax)
- **Protection:** Middleware checks for valid session on `/dashboard/*` and `/api/pro/*` routes
- **Upgrade Path:** Anonymous users can upgrade without losing their session
- **API Keys:** For public API access (Phase 4), HMAC-signed API keys stored hashed in Supabase

---

## 8. AI Integration Architecture

### Provider: Google Gemini 2.5 Flash

Primary choice over OpenRouter because:
- Free tier: 1,500 requests/day (sufficient for MVP)
- 1M token context window (handles full transcripts easily)
- Native JSON mode for structured outputs
- Lower latency than GPT-4o for creative tasks
- No separate billing account needed

### Fallback Provider: OpenRouter

Configured but disabled by default. Activated if:
- Gemini quota is exhausted
- Gemini returns persistent errors
- User preference (future setting)

### Prompt Architecture

All prompts follow a consistent template:

```typescript
interface PromptTemplate {
  system: string;       // Role, constraints, output format
  user: string;         // Parameterized user input
  examples?: string[];  // Few-shot examples
  outputFormat: 'json' | 'text' | 'markdown';
  temperature: number;
  maxTokens: number;
}
```

Prompts are stored as TypeScript template functions (not raw strings) to enable:
- Type-safe parameter interpolation
- Easy A/B testing of prompt variations
- Version control and diffing
- Token count estimation before API call

### Safety Layer

```
lib/ai/safety.ts

- Gemini native safety settings: HARM_CATEGORY_HARASSMENT, HARM_CATEGORY_HATE_SPEECH,
  HARM_CATEGORY_SEXUALLY_EXPLICIT, HARM_CATEGORY_DANGEROUS_CONTENT → BLOCK_MEDIUM_AND_ABOVE
- Post-generation keyword filter for known bad patterns
- Output length sanity check (reject if wildly off expected range)
- Log all flagged content for manual review (Supabase `flagged_content` table, future)
```

### Streaming

AI endpoints that generate long text (descriptions, transcripts, summaries) use Gemini streaming API with Server-Sent Events (SSE):

```
POST /api/ai/generate-description  →  Response: text/event-stream

Client consumes with:
const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  // Append chunk to UI
}
```

This provides real-time text generation UX instead of a spinner for 10+ seconds.

### Token Budget Tracking

```
lib/ai/token-counter.ts

- Pre-generation: Estimate token count from prompt + expected output
- Post-generation: Log actual usage
- Daily budget: Track in Redis with 24h TTL
  - Free tier budget: 1,500 requests/day across all users
  - Per-IP budget: 100 AI requests/day (for fairness)
- When budget approaches 80%, show warning in UI: "AI requests near daily limit"
- When budget exhausted, show friendly message with reset time
```

---

## 9. Caching Strategy

### Cache Layers

```
┌─────────────────────┐
│  Browser Cache       │  ← Cache-Control headers for static assets
├─────────────────────┤
│  Vercel Edge Cache   │  ← ISR for pages (revalidate)
├─────────────────────┤
│  Upstash Redis       │  ← API response cache (primary)
├─────────────────────┤
│  Next.js fetch Cache │  ← Per-request deduplication
└─────────────────────┘
```

### Redis Cache Key Design

```
Key format: {namespace}:{resource}:{identifier}

Examples:
  yt:video:stats:dQw4w9WgXcQ
  yt:video:tags:dQw4w9WgXcQ
  yt:channel:stats:UCuAXFkgsw1L7xaCfnd5JJOw
  yt:thumbnail:dQw4w9WgXcQ:max
  yt:transcript:dQw4w9WgXcQ:en
  yt:quota:daily:2026-07-14        ← quota counter
  rl:youtube:192.168.1.1           ← rate limit counter
  rl:ai:192.168.1.1                ← rate limit counter
```

### Cache TTL Policies

| Data Type | TTL | Rationale |
|-----------|-----|-----------|
| Thumbnails | 7 days | Rarely change; immutable once uploaded |
| Video tags | 1 hour | Creators update tags occasionally |
| Channel tags (inferred) | 24 hours | Aggregated; changes slowly |
| Transcripts | 30 days | Very rarely change after upload |
| Video statistics | 1 hour for old, 15 min for < 7 days | Views/comments change rapidly on new videos |
| Channel statistics | 24 hours | Subscriber count changes slowly |
| AI prompt results | 0 (no caching) | Each generation is unique; user expects fresh results |
| SEO score | 0 (no caching) | Computational; cheap to re-calculate |

### Cache Invalidation

- **TTL-based expiration:** Default strategy. No manual invalidation needed for MVP.
- **Quota-aware caching:** If YouTube API quota reaches 80%, automatically extend all cache TTLs by 4x to preserve quota.
- **Manual purge:** Admin endpoint `/api/internal/cache/purge?key=...` (protected by `CRON_SECRET`) for emergency cache clearing.

### ISR Strategy for Pages

```typescript
// Homepage
export const revalidate = 3600; // Rebuild every hour

// Tool pages
export const revalidate = 86400; // Rebuild daily (SEO content rarely changes)

// Blog pages
export const dynamicParams = true; // ISR on-demand for new blog posts
```

---

## 10. Error Handling Strategy

### Error Boundary Architecture

```
┌──────────────────────────────────────────┐
│  global-error.tsx                         │  ← Catches errors outside RootLayout
│  (Root-level fallback for fatal errors)   │
├──────────────────────────────────────────┤
│  error.tsx (per route segment)            │  ← Catches rendering errors in pages
│  - Homepage error boundary                │
│  - Tool page error boundary               │
│  - Blog error boundary                    │
├──────────────────────────────────────────┤
│  Client Component Error Boundaries        │  ← Catches interactive widget errors
│  - ToolError component                    │
│  - URLSearchBoxError component            │
├──────────────────────────────────────────┤
│  API Error Handler                        │  ← Unified API error responses
│  - try/catch in each route handler        │
│  - Structured error codes                 │
└──────────────────────────────────────────┘
```

### Error Code System

```typescript
// lib/errors.ts
const ErrorCodes = {
  // Input validation
  INVALID_YOUTUBE_URL:    { status: 400, message: 'Invalid YouTube URL. Please check and try again.' },
  MISSING_VIDEO_ID:       { status: 400, message: 'Could not extract video ID from URL.' },
  MISSING_CHANNEL_ID:     { status: 400, message: 'Could not extract channel ID from URL.' },
  INVALID_TOOL_INPUT:     { status: 400, message: 'Invalid input. Please check your entries.' },

  // Rate limiting
  RATE_LIMITED:           { status: 429, message: 'Too many requests. Please wait {retryAfter} seconds.' },
  AI_DAILY_LIMIT:         { status: 429, message: 'AI daily limit reached. Resets at midnight UTC.' },

  // YouTube API
  VIDEO_NOT_FOUND:        { status: 404, message: 'Video not found. It may be private or deleted.' },
  CHANNEL_NOT_FOUND:      { status: 404, message: 'Channel not found.' },
  YOUTUBE_API_ERROR:      { status: 502, message: 'YouTube API is temporarily unavailable.' },
  YOUTUBE_QUOTA_EXCEEDED: { status: 503, message: 'Service temporarily limited. Please try again in a few hours.' },
  TAGS_NOT_AVAILABLE:     { status: 404, message: 'This video has no tags or they are not publicly available.' },
  TRANSCRIPT_UNAVAILABLE: { status: 404, message: 'Transcript is not available for this video.' },
  TRANSCRIPT_DISABLED:    { status: 404, message: 'Transcripts are disabled for this video.' },

  // AI
  AI_GENERATION_FAILED:   { status: 500, message: 'AI generation failed. Please try again.' },
  AI_SAFETY_BLOCKED:      { status: 422, message: 'Content could not be generated due to safety filters.' },
  AI_TIMEOUT:             { status: 504, message: 'AI generation timed out. Please try with a simpler request.' },

  // General
  INTERNAL_ERROR:         { status: 500, message: 'Something went wrong. Please try again.' },
} as const;
```

### Client-Side Error UX

Each tool's error state:
1. **Friendly message** (not raw error text)
2. **Suggested action** (e.g., "Try a different video URL")
3. **Retry button** (when appropriate)
4. **Fallback mode** (e.g., Transcript tool → "Paste transcript manually" link)

### Server-Side Error Tracking

```
lib/sentry.ts

- Capture all 5xx errors with full context (request URL, IP hash, timestamp)
- Capture YouTube API errors for quota monitoring
- Capture Gemini errors with prompt truncated to first 200 chars
- Rate-limit Sentry events (max 1/sec for repeated errors)
- Do NOT capture 4xx errors (they're expected client mistakes)
```

---

## 11. Rate Limiting Strategy

### Implementation

```typescript
// lib/rate-limit/limiter.ts

interface RateLimitConfig {
  windowMs: number;        // Time window in milliseconds
  maxRequests: number;     // Max requests in window
}

// Tiers
const FREE_TIER: Record<string, RateLimitConfig> = {
  'youtube':   { windowMs: 60_000, maxRequests: 60 },   // 60 req/min
  'ai':        { windowMs: 60_000, maxRequests: 20 },   // 20 req/min
  'compute':   { windowMs: 60_000, maxRequests: 120 },  // 120 req/min (SEO score)
  'resolve':   { windowMs: 60_000, maxRequests: 60 },   // 60 req/min
};

// Future Pro tier
const PRO_TIER: Record<string, RateLimitConfig> = {
  'youtube':   { windowMs: 60_000, maxRequests: 300 },
  'ai':        { windowMs: 60_000, maxRequests: 100 },
  'compute':   { windowMs: 60_000, maxRequests: 600 },
  'resolve':   { windowMs: 60_000, maxRequests: 300 },
};
```

### Algorithm: Sliding Window Counter

```
Redis Key: rl:{tier}:{identifier}
Value: Sorted set of timestamps

On each request:
1. Remove entries older than window
2. Count remaining entries
3. If count >= max → reject with 429 + Retry-After header
4. If count < max → add current timestamp, allow
```

Alternative for Vercel Edge (lower latency): Token bucket using `INCR` + `EXPIRE` on a counter key. Less accurate but runs at edge speed.

### Response Headers

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1699900000
Retry-After: 30
```

### Global YouTube API Quota Protection

Beyond per-IP rate limiting, the system monitors the global YouTube API quota:

```
lib/youtube/quota.ts

- Track daily quota usage in Redis: yt:quota:daily:{date}
- At 80% usage: Double all cache TTLs, reject non-essential requests (channel tags)
- At 95% usage: Serve cached data only, reject all non-cached YouTube API requests
- At 100%: Show "Service temporarily unavailable" with estimated reset time
- Log quota usage hourly with alert threshold
```

---

## 12. Security Considerations

### Header Security

Injected via `middleware.ts` on every response:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://*.ytimg.com https://*.googleusercontent.com https://pagead2.googlesyndication.com;
  connect-src 'self' https://*.googleapis.com https://generativelanguage.googleapis.com https://*.supabase.co https://*.posthog.com https://*.sentry.io https://www.google-analytics.com;
  frame-src https://www.youtube.com https://googleads.g.doubleclick.net;
  font-src 'self';

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Input Validation

- All API inputs validated with Zod schemas at the route handler level
- YouTube URLs sanitized: strip tracking params (`si`, `pp`, `feature`), allowlist only YouTube domains
- AI prompt inputs: max length enforced (500 chars for topic, 2000 for transcript)
- All user-provided text is treated as untrusted

### API Key Protection

- YouTube API key, Gemini API key, Supabase keys → stored in Vercel environment variables, never exposed to client
- All YouTube API calls happen server-side only
- Gemini API calls happen server-side only
- No secrets in client code, even with `NEXT_PUBLIC_` prefix

### CSRF Protection

- All POST/PUT/DELETE API routes check `Origin` header against allowed origins
- Next.js built-in CSRF protection for Server Actions (not used, but available)

### Dependency Security

- `pnpm audit` in CI pipeline
- Dependabot enabled for automatic dependency updates
- Lock file (`pnpm-lock.yaml`) committed

### Content Security for AI Outputs

- AI-generated text is never rendered as HTML (no `dangerouslySetInnerHTML`)
- Outputs are sanitized: strip HTML tags, escape special characters
- URLs in AI outputs are validated before rendering as links

---

## 13. SEO Architecture

### URL Structure

```
/                                        Homepage
/tools/                                  Tool listing (redirect to homepage or dedicated page in future)
/thumbnail-downloader                    Tool landing page
/tags-extractor                          Tool landing page
/transcript-extractor                    Tool landing page
/title-generator                         Tool landing page
/description-generator                   Tool landing page
/video-statistics                        Tool landing page
... (all tools follow /{tool-slug}/ pattern)
/blog/                                   Blog listing
/blog/{slug}                             Blog post
/about                                   About page
/contact                                 Contact page
```

Clean, descriptive URLs. No `/tools/` prefix needed — each tool is a first-class page for SEO purposes.

### Per-Page SEO Components

Every tool page includes:

1. **Metadata (generateMetadata)**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free YouTube Thumbnail Downloader — Download HD Thumbnails Instantly',
    description: 'Download YouTube thumbnails in HD, SD, HQ, and MQ quality. No login required. Free, fast, and easy to use.',
    keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'youtube thumbnail grabber', 'free'],
    alternates: { canonical: 'https://yttoolkit.com/thumbnail-downloader' },
    openGraph: {
      title: 'Free YouTube Thumbnail Downloader — No Login Required',
      description: '...',
      url: 'https://yttoolkit.com/thumbnail-downloader',
      images: [{ url: '/images/og/thumbnail-downloader.png', width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: '...',
      description: '...',
      images: ['/images/og/thumbnail-downloader.png']
    }
  };
}
```

2. **Structured Data (JSON-LD)**
```typescript
// Each tool page injects WebApplication schema
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YouTube Thumbnail Downloader",
  "url": "https://yttoolkit.com/thumbnail-downloader",
  "description": "...",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

Plus homepage `Organization` schema and blog post `Article` schema.

3. **Breadcrumbs (BreadcrumbList schema)**
4. **FAQ (FAQPage schema)** — Render FAQ as structured data
5. **1200+ word content** — Server-rendered, keyword-rich
6. **Internal linking** — Related tools, blog posts, and breadcrumbs

### Sitemap

Generated via `app/sitemap.ts`:

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = getToolsMetadata();       // Static array
  const blogPosts = await getBlogPosts(); // Read MDX files

  return [
    { url: 'https://yttoolkit.com', priority: 1.0, changeFrequency: 'weekly' },
    ...tools.map(t => ({
      url: `https://yttoolkit.com/${t.slug}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
    ...blogPosts.map(b => ({
      url: `https://yttoolkit.com/blog/${b.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ];
}
```

### Page Speed for SEO

All SEO content is Server Component (static HTML at build or ISR). No client-side JavaScript required for content rendering. Interactive tool widgets are client components but content above the fold is always server-rendered HTML.

---

## 14. Performance Optimization Plan

### Build-Time Optimizations

| Optimization | Implementation |
|-------------|----------------|
| Static Generation | Tool landing pages, blog posts, about, contact → SSG |
| ISR | Homepage → revalidate every hour |
| Image Optimization | `next/image` for all images, including YouTube thumbnails. Use `unoptimized` only for external thumbnail downloads |
| Font Optimization | `next/font` with subsetting (Inter or Geist) |
| Bundle Analysis | `@next/bundle-analyzer` in CI, block merges that increase bundle > 10% |
| Tree Shaking | shadcn/ui individual imports (not barrel exports) |

### Runtime Optimizations

| Optimization | Implementation |
|-------------|----------------|
| Server Components | Default for all layouts and content. Client components only for interactivity |
| Streaming | AI text generation uses SSE streaming for progressive rendering |
| Suspense Boundaries | Each tool's interactive area wrapped in `<Suspense>` with skeleton fallback |
| Data Fetching | Parallel fetch for independent data (channel stats + recent uploads) |
| Route Segment Config | `export const dynamic = 'force-static'` for truly static pages |
| Partial Prerendering | Experimental for hybrid static/dynamic pages (Next.js 16 PPR) |

### Asset Optimizations

| Optimization | Implementation |
|-------------|----------------|
| CSS | Tailwind purges unused classes at build |
| JavaScript | Dynamic imports for heavy tool components: `dynamic(() => import('./TranscriptViewer'), { ssr: false })` |
| Fonts | Subset to Latin + common special characters |
| SVGs | Inline SVGs for icons; no icon font libraries |
| Third-Party Scripts | Load AdSense and Analytics with `next/script` strategy="lazyOnload" |

### Caching Headers

```
Static pages:        Cache-Control: public, max-age=31536000, immutable
ISR pages:           Cache-Control: public, max-age=3600, stale-while-revalidate=86400
API responses:       Cache-Control: public, max-age={TTL}, stale-while-revalidate=300
API (no-cache):      Cache-Control: no-store (AI generation endpoints)
Assets:              Cache-Control: public, max-age=31536000, immutable
```

### Performance Budgets

- Lighthouse Performance: ≥ 95
- Lighthouse SEO: 100
- Lighthouse Accessibility: ≥ 95
- Lighthouse Best Practices: ≥ 90
- First Contentful Paint: ≤ 1.2s
- Largest Contentful Paint: ≤ 2.5s
- Total Blocking Time: ≤ 200ms
- Cumulative Layout Shift: ≤ 0.1
- JavaScript bundle (per page): ≤ 150KB (compressed)
- CSS: ≤ 50KB (compressed)

Lighthouse CI integrated into GitHub Actions. PRs that drop scores by more than 5 points are blocked from merge.

---

## 15. Analytics Architecture

### Tools Used

| Tool | Purpose | Free Tier |
|------|---------|-----------|
| Google Analytics 4 | Page views, traffic sources, user flow | Yes (generous) |
| PostHog | Feature usage, tool popularity, retention | Yes (1M events/month) |
| Vercel Analytics | Web Vitals (LCP, FCP, CLS, INP) | Included with Pro |
| Sentry | Error tracking, performance monitoring | Yes (5K errors/month) |
| Google Search Console | SEO performance, indexing status | Free |
| Google AdSense | Revenue tracking | Built into AdSense |

### Data Collection Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT SIDE                            │
│                                                           │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │ Google        │  │ PostHog   │  │ Error Boundary   │  │
│  │ Analytics 4   │  │ (SDK)     │  │ → Sentry.capture │  │
│  │ (gtag)        │  │           │  │   Exception()    │  │
│  └──────────────┘  └───────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────┐
│                    SERVER SIDE                             │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │ API Analytics (Supabase tool_usage table)         │    │
│  │ - tool_slug, success/failure, duration, country   │    │
│  │ - Fire-and-forget (don't block API response)      │    │
│  └──────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Quota Tracking (Redis + Supabase)                 │    │
│  │ - Daily YouTube API unit consumption             │    │
│  │ - Daily Gemini request count                     │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Key Events to Track

```
// Page Views (automatic via GA4 + PostHog)
// Tool Usage
posthog.capture('tool_used', {
  tool_slug: 'thumbnail-downloader',
  success: true,
  duration_ms: 320,
  from_search_box: true,
  is_cached: false
});

// AI Generation
posthog.capture('ai_generated', {
  tool_slug: 'title-generator',
  tokens_used: 450,
  language: 'en',
  tone: 'professional'
});

// Downloads
posthog.capture('file_downloaded', {
  tool_slug: 'thumbnail-downloader',
  quality: 'max',
  format: 'jpg'
});

// Copy Actions
posthog.capture('content_copied', {
  tool_slug: 'tags-extractor'
});

// Errors
posthog.capture('tool_error', {
  tool_slug: 'transcript-extractor',
  error_code: 'TRANSCRIPT_UNAVAILABLE'
});

// Ad Revenue
posthog.capture('ad_impression', { position: 'sidebar' });
posthog.capture('ad_click', { position: 'sidebar' });
posthog.capture('affiliate_click', { link_id: 'tubebuddy', tool_slug: 'tags-extractor' });
```

### Privacy Considerations

- All analytics are anonymous (no user accounts in MVP)
- IP addresses are anonymized (GA4 does this automatically; PostHog configured with `maskPersonData: true`)
- No cross-site tracking
- Cookie consent modal blocks analytics scripts until user grants consent
- Server-side analytics (tool_usage in Supabase) only store anonymized data

---

## 16. Deployment Architecture

### Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        DNS LAYER                             │
│                    Cloudflare (yttoolkit.com)                 │
│           DDoS Protection, CDN, SSL/TLS, Proxy               │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      VERCEL EDGE                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ middleware.ts                                       │    │
│  │ - Rate Limiting (Upstash Redis @ Edge)              │    │
│  │ - Security Headers                                  │    │
│  │ - Geo Detection                                     │    │
│  │ - Bot Protection                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                   VERCEL SERVERLESS                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Next.js 16 App Router                                │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │   │
│  │  │ ISR/SSG     │  │ SSR         │  │ API Routes   │ │   │
│  │  │ Pages       │  │ (dynamic)   │  │ (serverless) │ │   │
│  │  └─────────────┘  └─────────────┘  └──────┬───────┘ │   │
│  └─────────────────────────────────────────────┼────────┘   │
└────────────────────────────────────────────────┼────────────┘
                                                 │
                    ┌────────────────────────────┼────────────┐
                    │                            │            │
          ┌─────────▼────────┐    ┌─────────────▼──────────┐ │
          │  Upstash Redis   │    │  External APIs          │ │
          │  (Global)        │    │  - YouTube Data API v3  │ │
          │  - Cache         │    │  - Gemini 2.5 Flash     │ │
          │  - Rate Limiting │    │  - OpenRouter (fallback)│ │
          └──────────────────┘    └────────────────────────┘ │
          ┌──────────────────┐    ┌────────────────────────┐ │
          │  Supabase        │    │  Sentry + PostHog +    │ │
          │  - Database      │    │  GA4                   │ │
          │  - Future Auth   │    │  (Monitoring)          │ │
          └──────────────────┘    └────────────────────────┘ │
                    └────────────────────────────────────────┘
```

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "regions": ["iad1"],              // US East (closest to North America + Europe)
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/tools",
      "destination": "/",
      "permanent": true
    }
  ],
  "crons": [
    {
      "path": "/api/internal/sitemap",
      "schedule": "0 0 * * *"       // Rebuild sitemap daily at midnight
    }
  ]
}
```

### CI/CD Pipeline (GitHub Actions)

```
Push to main →
  1. Install dependencies (pnpm install)
  2. Lint (ESLint)
  3. Type check (tsc --noEmit)
  4. Unit tests (vitest)
  5. Build (next build)
  6. Lighthouse CI (budget check)
  7. Deploy to Vercel Production

Pull Request →
  1. Same steps 1-5
  2. Vercel Preview Deployment
  3. E2E tests on preview URL (Playwright)
  4. Lighthouse CI (budget check, no blocking)
```

### Environment Configuration

```
Vercel Environments:
  - Production:    main branch
  - Preview:       all PR branches (automatic)
  - Development:   local (.env.local)

Supabase:
  - Production project + Development project (separate)
  - Database migrations run via `supabase db push` (dev) and `supabase migration` (CI)

Upstash Redis:
  - Single global database (low latency accessed from Vercel)
```

---

## 17. Environment Variables List

```bash
# =============================================================================
# Required for MVP
# =============================================================================

# YouTube Data API v3
YOUTUBE_API_KEY=AIza...                  # Primary API key
# YOUTUBE_API_KEY_SECONDARY=AIza...      # Overflow key (future)

# Google Gemini
GEMINI_API_KEY=AIza...                   # Gemini 2.5 Flash API key

# Upstash Redis
UPSTASH_REDIS_URL=https://...            # Redis REST URL
UPSTASH_REDIS_TOKEN=...                  # Redis auth token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...     # Supabase project URL (safe for client)
SUPABASE_SERVICE_ROLE_KEY=sb...          # Service role key (SERVER ONLY)

# Vercel
VERCEL_URL=...                           # Deployment URL (auto-set by Vercel)
CRON_SECRET=...                          # Secret for cron job endpoints

# =============================================================================
# Analytics & Monitoring
# =============================================================================

# Sentry
SENTRY_DSN=https://...                   # Sentry DSN
SENTRY_AUTH_TOKEN=...                    # For source maps upload
SENTRY_ORG=...                           # Sentry organization slug
SENTRY_PROJECT=...                       # Sentry project slug

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...          # PostHog project API key (safe for client)
NEXT_PUBLIC_POSTHOG_HOST=https://...     # PostHog instance URL

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...      # GA4 measurement ID

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-... # AdSense publisher ID
NEXT_PUBLIC_ADSENSE_ENABLED=false        # Feature flag for ads (enable after approval)

# Google Search Console
# (Verified via DNS TXT record on Cloudflare — no env var needed)

# =============================================================================
# Site Configuration
# =============================================================================

NEXT_PUBLIC_SITE_URL=https://yttoolkit.com
NEXT_PUBLIC_SITE_NAME=YouTube Toolkit AI
NEXT_PUBLIC_SITE_DESCRIPTION=Free YouTube creator toolkit with 15+ tools. No login required.

# =============================================================================
# Feature Flags
# =============================================================================

NEXT_PUBLIC_ENABLE_AI_TOOLS=true         # Toggle all AI features
NEXT_PUBLIC_ENABLE_ADS=false             # Toggle AdSense
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true     # Toggle contact form
NEXT_PUBLIC_ENABLE_BLOG=true             # Toggle blog section

# =============================================================================
# Optional / Future
# =============================================================================

# OpenRouter (AI fallback)
OPENROUTER_API_KEY=sk-or-...             # OpenRouter API key

# Alternative AI providers
# ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...

# NextAuth (future Pro plan)
# NEXTAUTH_URL=https://yttoolkit.com
# NEXTAUTH_SECRET=...

# Email (future newsletter/notifications)
# RESEND_API_KEY=re_...

# Stripe (future Pro plan)
# STRIPE_SECRET_KEY=sk_live_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Cloudflare (only if using Cloudflare-specific features beyond DNS)
# CLOUDFLARE_API_TOKEN=...
# CLOUDFLARE_ZONE_ID=...
```

---

## 18. Third-Party Services & APIs

| Service | Purpose | Pricing Model | MVP Need |
|---------|---------|---------------|----------|
| **YouTube Data API v3** | Video/channel metadata, statistics, tags | Free: 10,000 units/day. Beyond: quota request form (free) or $0.002/unit | Required |
| **Google Gemini 2.5 Flash** | All AI features (titles, descriptions, hashtags, hooks, keywords, shorts ideas, timestamps, transcript summary, title analysis) | Free: 1,500 req/day. Pay-as-you-go beyond: ~$0.00002/1K chars input, ~$0.00005/1K chars output | Required |
| **Upstash Redis** | Caching, rate limiting | Free: 10,000 commands/day. Pay-as-you-go: $0.20/100K commands | Required |
| **Supabase** | Database, future auth | Free: 500MB DB, 2 projects. Pro: $25/month | Required (minimal) |
| **Vercel** | Hosting, serverless functions | Free: 100GB bandwidth, 6,000 build minutes. Pro: $20/month | Required (Pro) |
| **Cloudflare** | DNS, CDN, DDoS protection | Free: generous limits | Required |
| **Sentry** | Error tracking | Free: 5,000 errors/month. Team: $26/month | Required |
| **PostHog** | Product analytics | Free: 1M events/month. Scale: $0.00031/event | Required |
| **Google Analytics 4** | Page views, traffic | Free | Required |
| **Google AdSense** | Revenue | Free (Google takes ~32%) | Required (post-MVP) |
| **Google Search Console** | SEO monitoring | Free | Required |
| **OpenRouter** | AI fallback provider | Pay-per-use: varies by model | Optional |
| **youtube-transcript** | Transcript scraping (npm) | Free (open-source npm package) | Required |
| **text-readability** | Readability scoring (npm) | Free (open-source npm package) | Required |
| **CookieYes / Osano** | GDPR cookie consent | Free tier available | Required |
| **UptimeRobot** | Uptime monitoring | Free: 50 monitors, 5-min intervals | Recommended |
| **Resend** | Transactional emails (contact form) | Free: 100 emails/day | Optional (MVP uses console log) |
| **GitHub** | Code hosting, CI/CD | Free | Required |

---

## 19. Future Scalability Plan

### Scaling Dimensions

| Dimension | MVP Approach | Growth Approach | Massive Scale Approach |
|-----------|-------------|-----------------|----------------------|
| **Traffic** | Single Vercel region (iad1) | Multi-region Vercel (+fra1, +syd1) | Edge rendering via Vercel Edge Config + custom CDN rules |
| **YouTube API Quota** | 10,000 units/day (1 key) | 2-3 keys with load balancing and quota rotation | Apply for YouTube audit/quota increase (up to 4M units). Implement innertube scraping as fallback for read-only data |
| **AI Requests** | Gemini free tier (1,500/day) | Gemini pay-as-you-go + OpenRouter fallback | Multi-model load balancing (Gemini, Claude, GPT-4o-mini) based on cost/latency. Queue-based processing for bulk requests |
| **Database** | Supabase free tier (500MB) | Supabase Pro ($25/mo, 8GB) | Read replicas, connection pooling (PgBouncer), vertical scaling |
| **Caching** | Upstash Redis free tier (10K cmds) | Upstash pay-as-you-go | Redis Cluster with regional replicas + Cloudflare KV for global edge cache |
| **Rate Limiting** | IP-based (Redis) | IP + session-based | Dedicated rate limiting service (Upstash Ratelimit SDK) with hierarchical limits |
| **Monetization** | AdSense + affiliate | + Sponsored tools, direct ad sales | + Pro subscriptions, API access fees, enterprise licensing |
| **Team** | Solo developer | 1-2 developers | 3-5 engineers, dedicated DevOps |

### Codebase Scalability

- **Monorepo migration:** Move shared logic (`lib/`) to `packages/shared` using Turborepo if the API expands to a separate service
- **API extraction:** Move API routes to a dedicated service (Hono on Cloudflare Workers) if serverless cold starts become an issue
- **Database extraction:** If the Pro plan grows, consider a dedicated backend service instead of Supabase-only
- **Feature flags:** Already designed with boolean env vars. Migrate to LaunchDarkly or Vercel Edge Config flags for staged rollouts

### Pro Plan Architecture (Future)

```
┌─────────────────────────────────────────┐
│          PUBLIC (no auth)                │
│  - All 15 tools (rate limited)          │
│  - Blog                                  │
│  - SEO pages                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          PRO (authenticated)             │
│  - Unlimited AI generations              │
│  - Bulk analysis (up to 50 videos)       │
│  - PDF export                            │
│  - Saved history                         │
│  - API access (API keys)                 │
│  - Priority support                      │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Pro Features Architecture               │
│  - /dashboard/* (protected routes)       │
│  - Supabase Auth (email + Google)        │
│  - Stripe subscriptions                  │
│  - API key management                    │
│  - Usage billing (metered)               │
│  - Rate limit tier: 10x free limits      │
└─────────────────────────────────────────┘
```

---

## 20. Development Roadmap

### Phase 1: MVP Foundation (Weeks 1-4)

**Goal:** Launch 5 core tools with full SEO pages.

**Milestone 1.1 — Project Setup (Days 1-3)**
- [ ] Initialize Next.js 16 project with TypeScript, Tailwind, shadcn/ui
- [ ] Configure ESLint, Prettier, Vitest, Playwright
- [ ] Set up folder structure as defined above
- [ ] Configure environment variables (.env.example)
- [ ] Set up GitHub repo with CI/CD (lint, typecheck, test, build)
- [ ] Deploy empty shell to Vercel
- [ ] Configure Cloudflare DNS
- [ ] Set up Supabase project + run initial migration
- [ ] Set up Upstash Redis

**Milestone 1.2 — Core Infrastructure (Days 4-7)**
- [ ] `middleware.ts` with rate limiting, security headers
- [ ] `lib/youtube/client.ts` — YouTube Data API v3 wrapper
- [ ] `lib/youtube/url-parser.ts` — URL parsing with all format support
- [ ] `lib/youtube/thumbnail.ts` — Thumbnail URL construction
- [ ] `lib/cache/redis.ts` — Upstash Redis client with cache helpers
- [ ] `lib/rate-limit/limiter.ts` — Sliding window rate limiter
- [ ] `lib/ai/gemini.ts` — Gemini 2.5 Flash client
- [ ] `lib/errors.ts` — Error code system
- [ ] `lib/utils/cn.ts`, `lib/utils/format.ts` — Shared utilities
- [ ] Shared UI components: Header, Footer, ThemeToggle, ToolInput, ToolOutput, OutputActions, ToolError, ToolLoading

**Milestone 1.3 — Homepage (Days 8-10)**
- [ ] Hero section with smart URL search box
- [ ] Popular tools grid
- [ ] Trending videos section (static curated data)
- [ ] Blog preview
- [ ] FAQ section
- [ ] Full SEO metadata + JSON-LD schema

**Milestone 1.4 — Tool: Thumbnail Downloader (Days 11-13)**
- [ ] API route: `GET /api/youtube/thumbnail`
- [ ] Page: `/thumbnail-downloader` with 1200+ word SEO content
- [ ] Quality selector UI (Max, HD, SD, HQ, MQ)
- [ ] Preview + Download buttons
- [ ] FAQ + Schema + Breadcrumbs
- [ ] Component + E2E tests

**Milestone 1.5 — Tool: Tags Extractor (Days 14-16)**
- [ ] API route: `GET /api/youtube/tags`
- [ ] Page: `/tags-extractor` with SEO content
- [ ] Tags list with copy + download TXT
- [ ] Tests

**Milestone 1.6 — Tool: Transcript Extractor (Days 17-20)**
- [ ] API route: `GET /api/youtube/transcript`
- [ ] Integrate `youtube-transcript` npm package
- [ ] Page: `/transcript-extractor` with SEO content
- [ ] Transcript viewer with copy + TXT download
- [ ] Manual paste fallback
- [ ] Tests

**Milestone 1.7 — AI Tools: Title + Description Generator (Days 21-24)**
- [ ] Prompt templates for title and description generation
- [ ] API routes: `POST /api/ai/generate-titles`, `POST /api/ai/generate-description`
- [ ] Pages with forms, tone/language selectors, output display
- [ ] Streaming for description generation (SSE)
- [ ] Tests

**Milestone 1.8 — Launch Preparation (Days 25-28)**
- [ ] Analytics integration (PostHog, GA4, Sentry)
- [ ] Cookie consent implementation
- [ ] robots.txt, sitemap.xml generation
- [ ] OG image generation for all tool pages
- [ ] Lighthouse audit + perf optimization pass
- [ ] AdSense application + ad placeholder slots
- [ ] Google Search Console verification
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing
- [ ] Launch blog post

### Phase 2: Expansion Tools (Weeks 5-8)

**Milestone 2.1 — Video & Channel Statistics (Week 5)**
- [ ] API routes: video stats, channel stats
- [ ] Pages with stats display, engagement visualization
- [ ] Channel recent uploads gallery

**Milestone 2.2 — Keyword Generator + SEO Score Checker (Week 6)**
- [ ] AI prompt for keyword generation
- [ ] Computational SEO score engine (rules-based)
- [ ] Pages with rich output displays

**Milestone 2.3 — Hashtag Generator + Channel Tags (Week 7)**
- [ ] AI prompt for hashtag generation
- [ ] Inferred channel tags from video aggregation
- [ ] Pages with copy + download

**Milestone 2.4 — Blog + Content Expansion (Week 8)**
- [ ] 5-10 SEO-optimized blog posts
- [ ] Internal linking optimization across all pages
- [ ] Affiliate link integration (TubeBuddy, vidIQ, Canva)
- [ ] Ad placement optimization

### Phase 3: Advanced Tools (Weeks 9-12)

**Milestone 3.1 — Hook Generator + Shorts Ideas (Week 9)**
- [ ] AI prompts for hook types and shorts ideas
- [ ] Trend/virality scoring algorithm
- [ ] Pages with categorized output

**Milestone 3.2 — Timestamp Generator + Title Analyzer (Week 10)**
- [ ] Chapter generation from transcript
- [ ] Title comparison with CTR/emotion/SEO prediction
- [ ] Pages with detailed output

**Milestone 3.3 — Polish & Optimization (Weeks 11-12)**
- [ ] Full accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (Lighthouse 95+ on all pages)
- [ ] PWA manifest + service worker
- [ ] Advanced caching strategies
- [ ] YouTube API quota optimization
- [ ] Community feedback integration

### Phase 4: Ecosystem Expansion (Months 4-6)

- [ ] Browser extension (Chrome)
- [ ] WordPress plugin
- [ ] Public API (rate-limited, API key auth)
- [ ] Bulk video analyzer
- [ ] AI content calendar
- [ ] i18n support (top 5 languages)

### Phase 5: Monetization Pro (Months 7-12)

- [ ] Supabase Auth integration (email + Google OAuth)
- [ ] Stripe subscription (monthly/annual Pro plans)
- [ ] User dashboard with history
- [ ] Pro-only features (unlimited AI, bulk, PDF export, API access)
- [ ] Team/enterprise plans
- [ ] Sponsored tool placements
- [ ] Direct ad sales

---

## Appendix A: Tool Page SEO Content Template

Every tool page follows this content structure (all Server Components for SEO):

```
1. H1: {Tool Name} — {Primary Benefit}
2. URL input / form (Client Component island)
3. Tool output area (Client Component island)
4. H2: How to Use {Tool Name}
   - Step-by-step instructions (400 words)
5. H2: Features
   - Bullet list of capabilities
6. H2: Why Use Our {Tool Name}?
   - Unique value propositions (300 words)
7. H2: Frequently Asked Questions
   - 5-10 FAQ items with FAQPage schema
8. H2: Related Tools
   - Grid of 3-4 related tool cards
9. H2: Tips for Better Results
   - Educational content (300 words)
10. Breadcrumbs: Home > {Tool Name}
```

## Appendix B: AI Prompt Engineering Principles

All prompts in `lib/ai/prompts/` follow these rules:

1. **Role definition:** "You are an expert YouTube SEO specialist..."
2. **Output format specification:** "Return your response as a JSON array..."
3. **Constraints:** "Do not include placeholder text. Each title must be unique."
4. **Quality criteria:** "Titles should be SEO-optimized, click-worthy, and between 50-70 characters."
5. **Examples (few-shot):** Include 2-3 examples of ideal output
6. **Language handling:** "Respond in the same language as the input topic."
7. **Safety guardrails:** "Do not generate clickbait, misleading, or harmful content."
8. **Temperature per task:** Creative (0.7), Analytical (0.3), Balanced (0.5)

## Appendix C: Monitoring & Alerting Setup

```
Sentry Alerts:
  - New unhandled error (any environment)
  - Error rate spike (>10x baseline per hour)
  - YouTube API quota at 80% and 95%
  - Gemini API error rate >5%

Vercel Alerts:
  - Deployment failure
  - Edge function error rate spike

UptimeRobot:
  - Homepage health check (every 5 min)
  - API health check: GET /api/internal/health (every 5 min)
  - Notify via email on 2+ consecutive failures

Google Search Console:
  - Weekly review of:
    - Index coverage errors
    - Core Web Vitals
    - Search performance trends
```
