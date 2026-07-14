# TASKS.md — YouTube Toolkit AI

**Version:** 1.0
**Generated:** 2026-07-14
**Total Tasks:** ~320

---

## Legend

- 📋 **ID** — Unique task identifier (T-001 through T-NNN)
- 🎯 **Difficulty** — Easy / Medium / Hard
- ⏱️ **Time** — Estimated implementation time
- 🔗 **Depends On** — Tasks that must be completed first
- ⚡ **Parallel** — Tasks marked [P] can be done simultaneously
- ✅ **AC** — Acceptance Criteria

---

## 1. Project Setup

### 1.1 Repository & Environment

- [x] **T-001** — Initialize Next.js 16 project with TypeScript and App Router
  - 🎯 Medium | ⏱️ 30 min | 🔗 None | ⚡ [P]
  - **AC:** `pnpm create next-app@latest yt-toolkit --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` runs successfully. `pnpm dev` starts on port 3000.

- [x] **T-002** — Configure pnpm and verify lockfile
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm install` completes without errors. `pnpm-lock.yaml` is committed.

- [x] **T-003** — Initialize Git repository and create .gitignore
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `.gitignore` excludes `.env.local`, `node_modules/`, `.next/`, `coverage/`, `.vercel/`. Initial commit pushed.

- [x] **T-004** — Configure TypeScript strict mode
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `tsconfig.json` has `"strict": true`, `"noUncheckedIndexedAccess": true`, `"noImplicitReturns": true`. `tsc --noEmit` passes.

- [x] **T-005** — Configure ESLint with flat config
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `.eslintrc.json` extends `next/core-web-vitals`, `next/typescript`. `eslint .` runs without errors on boilerplate.

- [x] **T-006** — Configure Prettier
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `.prettierrc` with `semi: true`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: 'all'`, `printWidth: 100`. `.prettierignore` excludes build artifacts.

- [x] **T-007** — Install and configure shadcn/ui
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm dlx shadcn@latest init` completes. `components.json` created. Default button component renders.

- [x] **T-008** — Set up absolute path aliases (@/*)
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `tsconfig.json` paths resolve `@/*` to `./src/*`. IDE autocompletion works.

- [x] **T-009** — Create folder structure per Architecture.md
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-001
  - **AC:** All folders from the architecture exist: `src/app/(marketing)/`, `src/app/(tools)/`, `src/app/api/youtube/`, `src/app/api/ai/`, `src/components/`, `src/lib/`, `src/hooks/`, `src/contexts/`, `src/content/`, `src/styles/`, `tests/`.

- [x] **T-010** — Create .env.example with all required variables
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `.env.example` contains every variable from Architecture.md §17 with placeholder comments. No real values.

- [x] **T-011** — Create .env.local with development values
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-010
  - **AC:** `.env.local` created with real dev API keys. Gitignored. Variables load in `process.env`.

- [x] **T-012** — Install core dependencies (zod, clsx, tailwind-merge, next-themes)
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm add zod clsx tailwind-merge next-themes` completes. No peer dependency warnings.

- [x] **T-013** — Install YouTube and AI SDK dependencies
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm add @googleapis/youtube @google/generative-ai youtube-transcript` completes.

- [x] **T-014** — Install caching and rate-limiting dependencies
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm add @upstash/redis @upstash/ratelimit` completes.

- [x] **T-015** — Install analytics dependencies
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm add @sentry/nextjs posthog-js @vercel/analytics @vercel/speed-insights` completes.

- [x] **T-016** — Install testing dependencies
  - 🎯 Medium | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `pnpm add -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom @playwright/test` completes.

- [x] **T-017** — Configure Vitest
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-016
  - **AC:** `vitest.config.ts` configured with jsdom, path aliases, and `setupFiles`. `pnpm vitest run` passes (no tests yet).

- [x] **T-018** — Configure Playwright
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-016
  - **AC:** `playwright.config.ts` configured with baseURL, webServer config. `pnpm playwright install` succeeds.

- [ ] **T-019** — Set up GitHub Actions CI workflow
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-004, T-005, T-017
  - **AC:** `.github/workflows/ci.yml` runs lint, typecheck, vitest, and build on every push. CI passes on boilerplate.

- [ ] **T-020** — Set up GitHub Actions Vercel preview workflow
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-019
  - **AC:** `.github/workflows/preview.yml` triggers Vercel preview deployment on PR. Preview URL appears in PR.

### 1.2 Cloud Services Setup

- [ ] **T-021** — Create Vercel project and link repository
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-003
  - **AC:** `vercel.com` project linked to GitHub repo. Auto-deploys on push to main. Preview deploys on PRs.

- [ ] **T-022** — Configure Vercel environment variables
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-010, T-021
  - **AC:** All env vars from §17 entered in Vercel dashboard (Production + Preview). Build succeeds with env vars.

- [ ] **T-023** — Create Vercel project on Vercel dashboard and add vercel.json
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-021
  - **AC:** `vercel.json` with regions, headers, redirects, and cron jobs committed. Deploy uses config.

- [ ] **T-024** — Set up Cloudflare DNS for yttoolkit.com
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-021
  - **AC:** Domain resolves to Vercel. SSL active. www → apex redirect works.

- [ ] **T-025** — Create Supabase project
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** Supabase project created. Project URL and anon key added to env vars.

- [ ] **T-026** — Create Upstash Redis database
  - 🎯 Easy | ⏱️ 10 min | 🔗 None | ⚡ [P]
  - **AC:** Upstash Redis created. REST URL and token added to env vars.

- [ ] **T-027** — Create Sentry project
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** Sentry project created. DSN added to env vars. Test error appears in Sentry dashboard.

- [ ] **T-028** — Create PostHog project
  - 🎯 Easy | ⏱️ 10 min | 🔗 None | ⚡ [P]
  - **AC:** PostHog project created. API key and host added to env vars.

- [ ] **T-029** — Create Google Analytics 4 property
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** GA4 property created. Measurement ID added to env vars.

- [ ] **T-030** — Set up Google Search Console
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-024
  - **AC:** Site verified via DNS TXT record. Sitemap submitted (once generated).

---

## 2. UI Design System

- [x] **T-031** — Install shadcn/ui base components
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-007
  - **AC:** `pnpm dlx shadcn@latest add button input card dialog dropdown-menu tabs toast tooltip skeleton badge separator` completes. Components appear in `src/components/ui/`.

- [x] **T-032** — Configure Tailwind CSS theme (colors, fonts, dark mode)
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-001
  - **AC:** `tailwind.config.ts` has custom brand colors (primary: red/rose for YouTube brand), Inter or Geist font family, dark mode `"class"` strategy. CSS variables in `globals.css` for shadcn theming.

- [x] **T-033** — Configure next/font with Inter or Geist
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** Font loaded with `next/font/google` with Latin subset. Applied in root layout. No FOUT.

- [x] **T-034** — Set up next-themes provider
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `ThemeProvider` wraps root layout. `useTheme()` hook works. Respects `prefers-color-scheme`.

- [x] **T-035** — Create theme toggle component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-034
  - **AC:** Sun/Moon icon button toggles theme. State persists in localStorage. No flash on reload.

- [x] **T-036** — Create CSS custom animations and transitions
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-032
  - **AC:** `globals.css` has `@keyframes` for fade-in, slide-up, shimmer skeleton. Tailwind animation classes defined.

- [x] **T-037** — Create utility function: cn() with clsx + tailwind-merge
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-012 | ⚡ [P]
  - **AC:** `src/lib/utils/cn.ts` exports `cn()` function that merges Tailwind classes without conflicts.

- [ ] **T-038** — Create responsive container component
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-031
  - **AC:** `Container` component centers content with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

- [x] **T-039** — Create Toast notification system
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-031
  - **AC:** `ToastProvider` in root layout. `toast({ title, description, variant })` API works. Supports success, error, info variants. Auto-dismisses after 5s.

- [ ] **T-040** — Design and document color token system
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-032 | ⚡ [P]
  - **AC:** CSS variables defined for primary, secondary, accent, destructive, muted, background, foreground. Dark mode variants work.

---

## 3. Layout & Navigation

- [x] **T-041** — Create root layout (app/layout.tsx)
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-033, T-034, T-039
  - **AC:** Root layout renders `html` with `suppressHydrationWarning`, includes font, ThemeProvider, ToastProvider. Body has min-height and flex column layout.

- [x] **T-042** — Create marketing route group layout
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-041
  - **AC:** `src/app/(marketing)/layout.tsx` wraps children with Header + Footer. No side padding beyond parent.

- [ ] **T-043** — Create tools route group layout
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-041
  - **AC:** `src/app/(tools)/layout.tsx` wraps children with Header, Breadcrumbs, tool sidebar (ad slot + related tools), Footer.

- [x] **T-044** — Create Header component
  - 🎯 Medium | ⏱️ 40 min | 🔗 T-035
  - **AC:** Sticky header with logo (svg or text), navigation links (Home, Blog, About, Contact), theme toggle. Mobile hamburger menu opens slide-out drawer. Active link highlighted.

- [x] **T-045** — Create Footer component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-041
  - **AC:** Footer with logo, quick links (top 5 tools, Blog, About, Contact), legal links (Privacy Policy, Terms). Copyright year auto-updates.

- [x] **T-046** — Create mobile navigation component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-044
  - **AC:** Slide-out drawer from right. Links match desktop nav. Closes on link click or outside tap. Animated enter/exit.

- [ ] **T-047** — Create Breadcrumbs component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-043
  - **AC:** Auto-generates breadcrumbs from URL path. Shows "Home > Tool Name". Includes BreadcrumbList JSON-LD schema. Last item is aria-current="page".

- [ ] **T-048** — Create global loading skeleton (loading.tsx)
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-041 | ⚡ [P]
  - **AC:** `app/loading.tsx` shows skeleton layout (header skeleton, content skeleton grid, footer skeleton). Matches page structure.

- [ ] **T-049** — Create global error boundary (error.tsx)
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-041 | ⚡ [P]
  - **AC:** `app/error.tsx` catches rendering errors, shows friendly message with retry button. Logs to Sentry.

- [ ] **T-050** — Create global-error.tsx for root errors
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-041 | ⚡ [P]
  - **AC:** `app/global-error.tsx` catches errors outside root layout. Shows branded error page with `<html>` and `<body>` tags.

- [ ] **T-051** — Create 404 not-found page
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-041 | ⚡ [P]
  - **AC:** `app/not-found.tsx` shows 404 message, search box to find tools, link to homepage. Custom design, not default Next.js.

- [ ] **T-052** — Create cookie consent banner
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-041
  - **AC:** Banner appears at bottom on first visit. Accept/Reject buttons. Reject blocks analytics + ads scripts. Choice stored in cookie. Matches GDPR requirements.

- [ ] **T-053** — Create skip-to-content accessibility link
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-044 | ⚡ [P]
  - **AC:** Hidden link appears on first Tab press. Navigates to `<main id="main-content">`. Styled with focus ring.

- [ ] **T-054** — Add JSON-LD Organization schema to root layout
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-041 | ⚡ [P]
  - **AC:** `<script type="application/ld+json">` injected in `<head>` with Organization schema (name, url, logo, sameAs social links).

- [ ] **T-055** — Create XML sitemap generation (app/sitemap.ts)
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** `/sitemap.xml` returns all tool pages, blog posts, and static pages. Generated at build time. Submitted to Search Console.

- [ ] **T-056** — Create robots.txt generation (app/robots.ts)
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-055 | ⚡ [P]
  - **AC:** `/robots.txt` allows all crawlers, points to sitemap. Disallows `/api/` routes.

- [ ] **T-057** — Create PWA manifest (app/manifest.ts)
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** `/manifest.json` returns with name, short_name, icons, theme_color, background_color, display: standalone.

---

## 4. Shared Components

### 4.1 Tool Infrastructure

- [ ] **T-058** — Create ToolInput wrapper component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-031
  - **AC:** Reusable wrapper with label, description, children slot, error state. Styled consistently. Supports required indicator.

- [ ] **T-059** — Create ToolOutput wrapper component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-031
  - **AC:** Reusable output container with title, content slot, action buttons slot. Loading skeleton variant. Empty state variant.

- [ ] **T-060** — Create ToolLoading component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-031
  - **AC:** Skeleton placeholder that matches tool output shape. Pulsing animation. Multiple variants (card, list, text-block).

- [ ] **T-061** — Create ToolError component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-031
  - **AC:** Error display with icon, friendly message, suggested action, retry button. Maps error codes to user messages. Handles network errors.

- [ ] **T-062** — Create OutputActions component (Copy, Download, Share)
  - 🎯 Medium | ⏱️ 40 min | 🔗 T-031, T-039
  - **AC:** Three-button group: Copy (clipboard API with toast feedback), Download (triggers file download with specified name/format), Share (Web Share API with clipboard fallback). All disabled during loading.

- [x] **T-063** — Create copy-to-clipboard hook (useCopyToClipboard)
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-039 | ⚡ [P]
  - **AC:** Returns `[copied, copy]` tuple. Shows toast on success. Resets `copied` state after 2s. Falls back to `document.execCommand`.

- [x] **T-064** — Create download helper utility
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** `lib/utils/download.ts` exports `downloadFile(content, filename, mimeType)`. Creates Blob → ObjectURL → click link → revoke URL.

- [x] **T-065** — Create YouTube URL input component (shared across all tools)
  - 🎯 Medium | ⏱️ 35 min | 🔗 T-031
  - **AC:** Input with YouTube icon, placeholder "Paste YouTube URL here", paste button, clear button, validation indicator (green check/red X). Validates URL format on blur/change. Extracts video ID.

- [ ] **T-066** — Create RelatedTools component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-058
  - **AC:** Grid of 3-4 tool cards. Each card has icon, name, short description. Links to tool page. Tool metadata from `src/content/tools-metadata.ts`.

- [ ] **T-067** — Create ToolFAQ component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-031
  - **AC:** Accordion-style FAQ list. Uses shadcn accordion. FAQ data imported from `src/content/faq/{tool-slug}.ts`. Inject FAQPage JSON-LD schema.

- [ ] **T-068** — Create ToolSchema component (JSON-LD per tool page)
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** Injects WebApplication JSON-LD schema for each tool. Props: toolName, toolDescription, toolSlug.

- [ ] **T-069** — Create AdPlaceholder component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-052
  - **AC:** Wrapper for AdSense ad unit. Renders ad if consent granted AND `NEXT_PUBLIC_ADSENSE_ENABLED=true`. Shows placeholder in dev. Responsive sizing. Respects ad slot position prop.

- [ ] **T-070** — Create RecentSearches component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-065
  - **AC:** Shows last 5 searches for current tool (from localStorage). Click to re-fill input. Clear all button. Saves on successful tool execution. Per-tool storage keys.

- [ ] **T-071** — Create useYouTubeUrl hook
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-065
  - **AC:** Handles URL state, validation, parsing. Returns `{ url, isValid, videoId, channelId, type, setUrl, error }`. Uses Zod schema for validation.

- [ ] **T-072** — Create useToolApi hook
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-039
  - **AC:** Generic fetch hook for tool APIs. Returns `{ data, isLoading, error, execute }`. Handles loading state, error mapping, abort controller on unmount. Optional streaming support.

- [ ] **T-073** — Create useDebounce hook
  - 🎯 Easy | ⏱️ 10 min | 🔗 None | ⚡ [P]
  - **AC:** Debounces value by specified ms. Used for search inputs that trigger API calls.

- [x] **T-074** — Create tools metadata file
  - 🎯 Easy | ⏱️ 20 min | 🔗 None | ⚡ [P]
  - **AC:** `src/content/tools-metadata.ts` exports array of 15 tools with: slug, name, description, icon, category, route, phase (1-3). Used by homepage, navigation, related tools.

- [ ] **T-075** — Create affiliate links configuration
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** `src/content/affiliate-links.ts` exports affiliate link configs with link_id, name, url, description, tool associations.

- [ ] **T-076** — Create blog utility to read MDX posts
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-001 | ⚡ [P]
  - **AC:** `lib/blog.ts` exports `getBlogPosts()` (all posts sorted by date, with frontmatter) and `getBlogPost(slug)` (single post with content). Uses `next-mdx-remote` or `mdx-bundler`.

---

## 5. Database Setup

- [ ] **T-077** — Create Supabase server client
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-025
  - **AC:** `src/lib/db/supabase.ts` exports `createServerClient()` using `@supabase/ssr` with cookie-based session. Works in Server Components and Route Handlers.

- [ ] **T-078** — Write initial database migration
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-025
  - **AC:** `supabase/migrations/00001_initial_schema.sql` creates tables: `tool_usage`, `quota_log`, `affiliate_clicks`, `blog_views`, `contact_submissions`. All indexes defined.

- [ ] **T-079** — Apply migration to Supabase
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-078
  - **AC:** `pnpm supabase db push` succeeds. Tables visible in Supabase dashboard.

- [ ] **T-080** — Create tool usage logging utility
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-077, T-079
  - **AC:** `lib/db/log-tool-usage.ts` exports `logToolUsage({ toolSlug, inputHash, success, durationMs, country })`. Inserts into `tool_usage`. Called as fire-and-forget from API routes.

- [ ] **T-081** — Create quota logging utility
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-077, T-079
  - **AC:** `lib/db/log-quota.ts` exports `logQuotaUsage({ apiName, unitsUsed, endpoint })`. Inserts into `quota_log`.

- [ ] **T-082** — Create contact form submission logging utility
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-077, T-079
  - **AC:** `lib/db/log-contact.ts` exports `saveContactSubmission({ name, email, subject, message })`. Inserts into `contact_submissions`.

---

## 6. API Layer

### 6.1 Core Infrastructure

- [x] **T-083** — Create error code system
  - 🎯 Medium | ⏱️ 25 min | 🔗 None | ⚡ [P]
  - **AC:** `src/lib/errors.ts` exports `AppError` class with code, message, status. `ErrorCodes` constant with all error types defined. `apiErrorResponse(error)` helper returns NextResponse with proper status.

- [x] **T-084** — Create YouTube Data API client wrapper
  - 🎯 Medium | ⏱️ 35 min | 🔗 T-013
  - **AC:** `src/lib/youtube/client.ts` exports: `getVideoDetails(id)`, `getChannelDetails(id)`, `getVideoTags(id)`, `getChannelVideos(id)`, `searchVideos(query)`, `resolveUrl(url)`. All functions handle API errors gracefully. Uses singleton pattern for auth client.

- [x] **T-085** — Create YouTube URL parser utility
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-084
  - **AC:** `src/lib/youtube/url-parser.ts` exports `parseYouTubeUrl(url)`. Handles all URL formats: watch?v=, youtu.be/, /shorts/, /embed/, /@handle, /channel/, /c/. Returns `{ type, id }` or throws. Includes unit tests.

- [x] **T-086** — Create YouTube thumbnail URL builder
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-084 | ⚡ [P]
  - **AC:** `src/lib/youtube/thumbnail.ts` exports `getThumbnailUrls(videoId)`. Returns object with max, hd, sd, hq, mq quality URLs. Each with dimensions.

- [x] **T-087** — Create YouTube API type definitions
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-084 | ⚡ [P]
  - **AC:** `src/lib/youtube/types.ts` exports TypeScript interfaces for all YouTube API responses. Fully typed.

- [x] **T-088** — Create Upstash Redis client
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-014, T-026
  - **AC:** `src/lib/cache/redis.ts` exports singleton Redis client. Validates connection on import. Falls back to no-op cache if env vars missing.

- [x] **T-089** — Create cache key generation utility
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-088 | ⚡ [P]
  - **AC:** `src/lib/cache/cache-keys.ts` exports `cacheKeys` object with methods: `videoStats(id)`, `videoTags(id)`, `channelStats(id)`, `thumbnail(id, quality)`, `transcript(id, lang)`, `resolveUrl(url)`. Consistent key format.

- [x] **T-090** — Create cache TTL configuration
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-088 | ⚡ [P]
  - **AC:** `src/lib/cache/cache-policies.ts` exports `TTL` constant with TTLs for each data type (thumbnails: 7d, tags: 1h, transcripts: 30d, stats: 1h/15m, channel: 24h). Documented.

- [x] **T-091** — Create cache helper functions
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-088, T-089, T-090
  - **AC:** `getCachedOrFetch(key, ttl, fetcher)` helper. Checks Redis → on miss, calls fetcher → stores result → returns. Handles Redis errors gracefully (falls through to fetcher).

- [x] **T-092** — Create rate limiter
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-088
  - **AC:** `src/lib/rate-limit/limiter.ts` exports `checkRateLimit(identifier, tier)`. Returns `{ allowed, remaining, reset }`. Sliding window via Redis sorted sets. Falls back to memory if Redis unavailable.

- [x] **T-093** — Create rate limit configuration
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-092 | ⚡ [P]
  - **AC:** `src/lib/rate-limit/config.ts` exports tiers: FREE, PRO. Each with youtube/ai/compute/resolve limits.

- [x] **T-094** — Create Next.js middleware with rate limiting + security headers
  - 🎯 Hard | ⏱️ 45 min | 🔗 T-092, T-093
  - **AC:** `src/middleware.ts` applies rate limiting to `/api/` routes. Injects security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS). Adds x-request-id. Geo detection. Runs on Edge runtime.

### 6.2 Input Validation

- [x] **T-095** — Create YouTube URL validation schema (Zod)
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-012 | ⚡ [P]
  - **AC:** `src/lib/validators/youtube-url.ts` exports Zod schema validating YouTube URL formats. Extracts video ID or channel ID.

- [x] **T-096** — Create tool input validation schemas
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-012 | ⚡ [P]
  - **AC:** `src/lib/validators/tool-inputs.ts` exports Zod schemas for all AI tool inputs (title gen, description gen, hashtag gen, hook gen, keyword gen, shorts ideas, timestamp gen, title analyze, seo score). Each validates required fields, string lengths, enum values.

### 6.3 API Routes — YouTube

- [x] **T-097** — Implement GET /api/youtube/resolve
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-084, T-085, T-091, T-092, T-095
  - **AC:** Accepts `url` query param. Parses URL → determines video/channel → returns type, id, title, suggested tools. Rate limited. Cached (24h). Error codes: INVALID_YOUTUBE_URL.

- [x] **T-098** — Implement GET /api/youtube/video-stats
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-084, T-091, T-092, T-095
  - **AC:** Accepts `v` query param. Returns full video statistics (title, views, likes, comments, publishedAt, duration, category, channel, thumbnail, tags, description). Rate limited. Cached (1h old, 15m new). Error codes: VIDEO_NOT_FOUND, YOUTUBE_API_ERROR.

- [x] **T-099** — Implement GET /api/youtube/channel-stats
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-084, T-091, T-092, T-095
  - **AC:** Accepts `c` query param. Returns channel statistics + 5 recent uploads (with thumbnail, title, views). Rate limited. Cached (24h). Error codes: CHANNEL_NOT_FOUND, YOUTUBE_API_ERROR.

- [x] **T-100** — Implement GET /api/youtube/thumbnail
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-084, T-086, T-091, T-092
  - **AC:** Accepts `v` and optional `quality` params. Returns thumbnail URLs + video title + all quality variants. Rate limited. Cached (7d). Error codes: VIDEO_NOT_FOUND.

- [x] **T-101** — Implement GET /api/youtube/tags
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-084, T-091, T-092
  - **AC:** Accepts `v` query param. Returns video tags list + formatted string + tag count. Rate limited. Cached (1h). Error codes: TAGS_NOT_AVAILABLE, VIDEO_NOT_FOUND.

- [x] **T-102** — Implement GET /api/youtube/channel-tags
  - 🎯 Hard | ⏱️ 40 min | 🔗 T-084, T-091, T-092
  - **AC:** Accepts `c` query param. Fetches channel's 10 most recent videos → aggregates unique tags → returns inferred tags + disclaimer. Rate limited. Cached (24h). Error codes: CHANNEL_NOT_FOUND.

- [x] **T-103** — Implement GET /api/youtube/transcript
  - 🎯 Hard | ⏱️ 40 min | 🔗 T-013, T-091, T-092
  - **AC:** Accepts `v` and optional `lang` params. Fetches transcript via `youtube-transcript` with rotating User-Agent. Returns segments + full text + available languages. Rate limited. Cached (30d). Error codes: TRANSCRIPT_UNAVAILABLE, TRANSCRIPT_DISABLED.

### 6.4 API Routes — AI

- [x] **T-104** — Create Gemini AI client
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-013
  - **AC:** `src/lib/ai/gemini.ts` exports `generateContent(prompt, options)` using `@google/generative-ai`. Handles safety settings, generation config (temperature, maxTokens). Error handling with retry (1 attempt).

- [x] **T-105** — Create AI safety filter
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104
  - **AC:** `src/lib/ai/safety.ts` exports `filterResponse(text)`. Blocks outputs with hate speech/violence/adult patterns. Configures Gemini native safety settings: BLOCK_MEDIUM_AND_ABOVE for all harm categories. Logs flagged content.

- [ ] **T-106** — Create token counter utility
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/token-counter.ts` exports `estimateTokens(text)` and `getTokenUsage()`. Tracks daily usage in Redis.

- [x] **T-107** — Create title generation prompt template
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104
  - **AC:** `src/lib/ai/prompts/title-generation.ts` exports function. Structured prompt with system role (YouTube SEO expert), few-shot examples, JSON output format, tone mapping, language handling.

- [x] **T-108** — Create description generation prompt template
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/description-generation.ts` exports function. Handles chapters, hashtags, CTA, links in output format.

- [x] **T-109** — Create hashtag generation prompt template
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/hashtag-generation.ts` exports function. Returns grouped (broad/niche/trending) hashtags.

- [x] **T-110** — Create hook generation prompt template
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/hook-generation.ts` exports function. Returns 4 categories: question, story, curiosity, shock hooks.

- [x] **T-111** — Create keyword generation prompt template
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/keyword-generation.ts` exports function. Returns keywords with difficulty, popularity, intent, related, questions.

- [x] **T-112** — Create timestamp generation prompt template
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/timestamp-generation.ts` exports function. Generates chapters from transcript text.

- [x] **T-113** — Create shorts ideas prompt template
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/shorts-ideas.ts` exports function. Returns ideas with trend score and virality score.

- [x] **T-114** — Create transcript summary prompt template
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/transcript-summary.ts` exports function. Summarizes transcript in bullet points.

- [x] **T-115** — Create title analysis prompt template
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-104 | ⚡ [P]
  - **AC:** `src/lib/ai/prompts/title-analysis.ts` exports function. Compares two titles for CTR prediction, SEO score, emotion score, power words, winner.

- [x] **T-116** — Implement POST /api/ai/generate-titles
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-104, T-105, T-107, T-092, T-096
  - **AC:** Validates input with Zod. Calls Gemini with title prompt. Returns array of titles with SEO scores. Rate limited (20/min). No caching. Error codes: AI_GENERATION_FAILED, AI_SAFETY_BLOCKED.

- [x] **T-117** — Implement POST /api/ai/generate-description
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-104, T-105, T-108, T-092, T-096
  - **AC:** Validates input with Zod. Calls Gemini with streaming. Returns description + hashtags + timestamps + CTA. Rate limited. No caching.

- [x] **T-118** — Implement POST /api/ai/generate-hashtags
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-104, T-105, T-109, T-092, T-096
  - **AC:** Validates input. Returns grouped hashtags. Rate limited. No caching.

- [x] **T-119** — Implement POST /api/ai/generate-hooks
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104, T-105, T-110, T-092, T-096
  - **AC:** Returns 4-category hooks. Rate limited. No caching.

- [x] **T-120** — Implement POST /api/ai/generate-keywords
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104, T-105, T-111, T-092, T-096
  - **AC:** Returns keyword ideas with metadata. Rate limited. No caching.

- [x] **T-121** — Implement POST /api/ai/generate-timestamps
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-104, T-105, T-112, T-092, T-096
  - **AC:** Generates chapters from transcript text. Rate limited. No caching.

- [x] **T-122** — Implement POST /api/ai/generate-shorts-ideas
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104, T-105, T-113, T-092, T-096
  - **AC:** Returns 50 shorts ideas with scores. Rate limited. No caching.

- [x] **T-123** — Implement POST /api/ai/summarize-transcript
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-104, T-105, T-114, T-092
  - **AC:** Summarizes transcript text. Rate limited. No caching.

- [x] **T-124** — Implement POST /api/ai/analyze-title
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-104, T-105, T-115, T-092, T-096
  - **AC:** Compares two titles. Returns detailed analysis with winner. Rate limited. No caching.

- [x] **T-125** — Implement POST /api/ai/seo-score (computational)
  - 🎯 Hard | ⏱️ 45 min | 🔗 T-092, T-096
  - **AC:** Pure computation, no AI call. Validates SEO inputs (title, description, tags, hashtags, keyword, category). Calculates weighted score per Architecture.md §6 Tool 14. Returns breakdown + top suggestions. Rate limited (120/min). No caching.

### 6.5 Internal Routes

- [ ] **T-126** — Implement GET /api/internal/health
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-094
  - **AC:** Returns `{ status: "ok", timestamp, services: { redis, supabase, youtube } }`. Each service check is optional (doesn't fail if service unreachable, just reports status).

- [ ] **T-127** — Implement GET /api/internal/sitemap (cron-triggered)
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-055
  - **AC:** Protected by CRON_SECRET header. Triggers sitemap regeneration. Used by Vercel cron job.

---

## 7. Thumbnail Downloader

- [ ] **T-128** — Create thumbnail downloader page route
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-009
  - **AC:** `src/app/(tools)/thumbnail-downloader/page.tsx` exists. Renders tool layout.

- [ ] **T-129** — Write thumbnail downloader SEO metadata
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-128
  - **AC:** `generateMetadata()` with title, description, keywords, openGraph, twitter, alternates. Title: "Free YouTube Thumbnail Downloader — Download HD Thumbnails Instantly".

- [ ] **T-130** — Write thumbnail downloader 1200+ word SEO content
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-128
  - **AC:** Server component with H1, intro, how-to section, features list, why-use section, tips section. Keyword-rich, unique content.

- [ ] **T-131** — Create ThumbnailPreview component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-065
  - **AC:** Accepts videoId. Fetches thumbnails via API on submit. Shows video title + thumbnail preview in selected quality. Responsive image display.

- [ ] **T-132** — Create QualitySelector component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-131
  - **AC:** Radio button or button group for Max/HD/SD/HQ/MQ. Selected quality highlights. Changing quality updates preview and download URL.

- [ ] **T-133** — Create DownloadButton for thumbnails
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-064, T-132
  - **AC:** Downloads thumbnail in selected quality. Uses fetch → blob → download. Shows quality and format in filename.

- [ ] **T-134** — Assemble Thumbnail Downloader page UI
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-129, T-130, T-131, T-132, T-133, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page: URL input → quality selector → preview → download button. Loading, error, and empty states. SEO content below tool. FAQ section. Related tools.

- [ ] **T-135** — Add thumbnail downloader FAQ content
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-134
  - **AC:** `src/content/faq/thumbnail-downloader.ts` with 5-7 Q&A items. Imported into FAQ component.

- [ ] **T-136** — Add thumbnail downloader schema markup
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-068, T-134
  - **AC:** WebApplication schema injected. FAQPage schema injected.

---

## 8. Tags Extractor

- [ ] **T-137** — Create tags extractor page route
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-009
  - **AC:** `src/app/(tools)/tags-extractor/page.tsx` exists.

- [ ] **T-138** — Write tags extractor SEO metadata + 1200-word content
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-137
  - **AC:** Full SEO metadata + keyword-rich content. H1: "Free YouTube Tags Extractor — Extract Video Tags Instantly".

- [ ] **T-139** — Create TagsList component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-065
  - **AC:** Fetches tags via API on URL submit. Shows tags as styled badges. Empty state if no tags. Copy all tags button.

- [ ] **T-140** — Create TagBadge component
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-139
  - **AC:** Individual tag display. Click to copy single tag. Hover effect. Responsive sizing.

- [ ] **T-141** — Implement tags download (TXT format)
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-064, T-139
  - **AC:** Download button exports tags as comma-separated TXT file. Filename: `{videoId}-tags.txt`.

- [ ] **T-142** — Assemble Tags Extractor page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-138, T-139, T-140, T-141, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page with input, tag display, copy, download. SEO content. FAQ. Related tools. Schema.

- [ ] **T-143** — Add tags extractor FAQ content
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-142
  - **AC:** 5-7 relevant FAQ items.

---

## 9. Channel Tags Extractor

- [ ] **T-144** — Create channel tags extractor page route
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-009
  - **AC:** `src/app/(tools)/channel-tags/page.tsx` exists.

- [ ] **T-145** — Write channel tags SEO metadata + 1200-word content
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-144
  - **AC:** SEO content. H1: "Free YouTube Channel Tags Extractor — Find Channel Keywords". Content explains inferred tags methodology.

- [ ] **T-146** — Create ChannelTagsDisplay component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-071
  - **AC:** Accepts channel URL. Fetches inferred channel tags. Shows channel name + tags + video count analyzed + disclaimer notice.

- [ ] **T-147** — Assemble Channel Tags page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-145, T-146, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page with channel URL input, tag results, disclaimer. SEO content. FAQ. Related tools. Schema.

- [ ] **T-148** — Add channel tags FAQ content
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-147
  - **AC:** FAQ items explaining inference methodology.

---

## 10. Transcript Extractor

- [ ] **T-149** — Create transcript extractor page route
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-009
  - **AC:** `src/app/(tools)/transcript-extractor/page.tsx` exists.

- [ ] **T-150** — Write transcript extractor SEO metadata + content
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-149
  - **AC:** SEO metadata + content. H1: "Free YouTube Transcript Extractor — Get Video Transcript Instantly".

- [ ] **T-151** — Create TranscriptViewer component
  - 🎯 Medium | ⏱️ 35 min | 🔗 T-071
  - **AC:** Fetches transcript on URL submit. Shows full transcript text in scrollable container. Line numbers. Language selector if multiple languages available. Segments with timestamps.

- [ ] **T-152** — Create LanguageSelector for transcript
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-151
  - **AC:** Dropdown showing available transcript languages. Selecting new language refetches transcript.

- [ ] **T-153** — Implement transcript TXT download
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-064, T-151
  - **AC:** Downloads transcript as .txt file.

- [ ] **T-154** — Implement transcript copy
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-063, T-151
  - **AC:** Copy full transcript text to clipboard with confirmation.

- [ ] **T-155** — Implement AI transcript summary
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-123, T-151
  - **AC:** "Summarize with AI" button. Calls `/api/ai/summarize-transcript`. Shows summary below transcript. Loading state during generation.

- [ ] **T-156** — Add manual paste transcript fallback
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-151
  - **AC:** If transcript fetch fails, show textarea for manual paste. "Use this transcript" button proceeds to viewer with manual content. Tool actions (copy, download, summarize) still work.

- [ ] **T-157** — Assemble Transcript Extractor page UI
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-150, T-151, T-152, T-153, T-154, T-155, T-156, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page with all states. SEO content. FAQ. Related tools. Schema.

- [ ] **T-158** — Add transcript extractor FAQ content
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-157
  - **AC:** 5-7 FAQ items. Include "Why is transcript not available?" explanation.

---

## 11. AI Title Generator

- [ ] **T-159** — Create title generator page route
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-009
  - **AC:** `src/app/(tools)/title-generator/page.tsx` exists.

- [ ] **T-160** — Write title generator SEO metadata + content
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-159
  - **AC:** SEO content. H1: "Free AI YouTube Title Generator — SEO Optimized Titles".

- [ ] **T-161** — Create TitleForm component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-096
  - **AC:** Form with inputs: topic (textarea), keyword (input), language (select: top 20 languages), tone (select: professional/casual/clickbait/educational/humorous), count (slider 1-20). All validated.

- [ ] **T-162** — Create ToneSelector component
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-161
  - **AC:** Select dropdown with 5 tone options. Each with emoji and description.

- [ ] **T-163** — Create TitleResults component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-062
  - **AC:** Displays generated titles in numbered list. Each title has copy button. "Copy All" button. "Regenerate" button. SEO score badge per title.

- [ ] **T-164** — Assemble Title Generator page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-160, T-161, T-162, T-163, T-058, T-059, T-060, T-061
  - **AC:** Complete page. Form on left/above, results on right/below (responsive). SEO content below. FAQ. Related tools. Schema. Daily AI request counter.

---

## 12. AI Description Generator

- [ ] **T-165** — Create description generator page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free AI YouTube Description Generator — SEO Optimized Descriptions".

- [ ] **T-166** — Create DescriptionForm component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-096
  - **AC:** Form: topic, keyword, summary (textarea), tone, checkboxes (include timestamps, include hashtags, include CTA).

- [ ] **T-167** — Create DescriptionOutput component (with streaming)
  - 🎯 Hard | ⏱️ 40 min | 🔗 T-117
  - **AC:** Displays generated description with real-time streaming. Shows description text, separate hashtag section, timestamps, CTA. Copy individual sections or full description.

- [ ] **T-168** — Implement SSE streaming client for description
  - 🎯 Hard | ⏱️ 30 min | 🔗 T-167
  - **AC:** Client reads SSE stream from `/api/ai/generate-description`. Appends text chunks to display progressively. Handles connection errors with retry.

- [ ] **T-169** — Assemble Description Generator page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-165, T-166, T-167, T-168, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page with streaming output. SEO, FAQ, related tools, schema.

---

## 13. AI Hashtag Generator

- [ ] **T-170** — Create hashtag generator page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free AI YouTube Hashtag Generator — Trending Hashtags".

- [ ] **T-171** — Create HashtagForm + HashtagResults components
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-096, T-062
  - **AC:** Simple form (topic + count). Results show grouped hashtags (broad/niche/trending) in colored sections. Copy per-section and copy-all.

- [ ] **T-172** — Assemble Hashtag Generator page UI
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-170, T-171, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 14. Keyword Generator

- [ ] **T-173** — Create keyword generator page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free YouTube Keyword Generator — Find High-Ranking Keywords".

- [ ] **T-174** — Create KeywordForm component
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-096
  - **AC:** Input: seed keyword + language. Generate button.

- [ ] **T-175** — Create KeywordResults component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-062
  - **AC:** Table/card display of keywords with difficulty badge (color-coded), popularity indicator, intent tag, related keywords list, suggested questions. Sort/filter options.

- [ ] **T-176** — Create DifficultyBadge component
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-175
  - **AC:** Color-coded badge (green=easy, yellow=medium, red=hard). Shows difficulty label.

- [ ] **T-177** — Assemble Keyword Generator page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-173, T-174, T-175, T-176, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 15. Hook Generator

- [ ] **T-178** — Create hook generator page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free AI YouTube Hook Generator — Capture Attention in 3 Seconds".

- [ ] **T-179** — Create HookForm component
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-096
  - **AC:** Inputs: topic, audience (target demographic), tone, count.

- [ ] **T-180** — Create HookCards component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-062
  - **AC:** Four tabbed/carded sections: Question Hooks, Story Hooks, Curiosity Hooks, Shock Hooks. Each hook is a card with copy button. Tab navigation between types.

- [ ] **T-181** — Assemble Hook Generator page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-178, T-179, T-180, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 16. Shorts Idea Generator

- [ ] **T-182** — Create shorts ideas page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free YouTube Shorts Idea Generator — 50 Viral Ideas".

- [ ] **T-183** — Create ShortsIdeasGrid component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-062
  - **AC:** Input: topic + count. Output: grid of idea cards. Each card shows idea text, trend score bar, virality score bar, category tag.

- [ ] **T-184** — Create ViralityMeter component
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-183
  - **AC:** Progress bar showing score 0-100. Color gradient: red (low) → yellow → green (high). Animated fill.

- [ ] **T-185** — Assemble Shorts Ideas page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-182, T-183, T-184, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 17. Timestamp Generator

- [ ] **T-186** — Create timestamp generator page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free AI YouTube Timestamp Generator — Generate Video Chapters".

- [ ] **T-187** — Create TimestampInput component
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-096
  - **AC:** Large textarea for transcript paste. Or auto-fetch from transcript tool integration (pass transcript via URL state). Counter showing character count.

- [ ] **T-188** — Create TimestampResults component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-062
  - **AC:** Generated chapters displayed as list with timestamp + title. Copy all as YouTube chapter format. Copy individual.

- [ ] **T-189** — Assemble Timestamp Generator page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-186, T-187, T-188, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page with "Try with Transcript Extractor" integration link. SEO, FAQ, schema.

---

## 18. Video Statistics

- [ ] **T-190** — Create video statistics page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free YouTube Video Statistics — View Any Video Analytics".

- [ ] **T-191** — Create VideoStatsCard component
  - 🎯 Medium | ⏱️ 35 min | 🔗 T-071
  - **AC:** Fetches video stats on URL submit. Displays: thumbnail, title, channel, views, likes, comments, publish date, duration, category, tags (expandable). Format numbers (1.5M views). Relative dates.

- [ ] **T-192** — Create EngagementChart component
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-191
  - **AC:** Visual representation of likes vs views ratio. Simple bar or donut chart. CSS-only or lightweight chart (no heavy charting library).

- [ ] **T-193** — Assemble Video Statistics page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-190, T-191, T-192, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 19. Channel Statistics

- [ ] **T-194** — Create channel statistics page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free YouTube Channel Statistics — Analyze Any Channel".

- [ ] **T-195** — Create ChannelHeader component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-071
  - **AC:** Displays channel avatar, name, handle, subscriber count, video count, total views, joined date, country. Format large numbers.

- [ ] **T-196** — Create RecentUploads component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-195
  - **AC:** Grid of 5 recent videos. Each card: thumbnail, title, published date (relative), view count. Click to open on YouTube.

- [ ] **T-197** — Assemble Channel Statistics page UI
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-194, T-195, T-196, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 20. SEO Score Checker

- [x] **T-198** — Create SEO score calculator utility
  - 🎯 Hard | ⏱️ 45 min | 🔗 None | ⚡ [P]
  - **AC:** `src/lib/seo/score-calculator.ts` exports `calculateSEOScore(inputs)`. Implements weighted formula per Architecture.md §6 Tool 14. Title scoring (length, keyword placement). Description scoring (length, structure). Tag scoring (count, relevance). Keyword density. Hashtag usage. Readability (Flesch-Kincaid via text-readability npm). Structure scoring. Engagement hooks. Returns overall score + per-category breakdown + suggestions.

- [x] **T-199** — Create readability utility
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-013 | ⚡ [P]
  - **AC:** `src/lib/seo/readability.ts` wraps `text-readability` npm. Exports `getReadabilityScore(text)` with grade level and interpretation.

- [x] **T-200** — Create keyword density calculator
  - 🎯 Easy | ⏱️ 15 min | 🔗 None | ⚡ [P]
  - **AC:** `src/lib/seo/keyword-density.ts` exports `calculateKeywordDensity(text, keyword)`. Returns density percentage and analysis.

- [ ] **T-201** — Create SEO score checker page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free YouTube SEO Score Checker — Optimize Your Videos".

- [ ] **T-202** — Create SeoForm component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-096
  - **AC:** Form: title, description (textarea), tags (comma-separated input), hashtags, target keyword, category (select). All validated.

- [ ] **T-203** — Create ScoreDisplay component
  - 🎯 Medium | ⏱️ 35 min | 🔗 T-062
  - **AC:** Large circular score gauge (0-100) with color (red→yellow→green). Animated count-up. Below: breakdown cards per category with individual scores, bars, and suggestions.

- [ ] **T-204** — Create SuggestionList component
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-203
  - **AC:** Prioritized list of improvement suggestions. Each with severity icon (critical/warning/info) and actionable text.

- [ ] **T-205** — Assemble SEO Score Checker page UI
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-201, T-202, T-203, T-204, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema.

---

## 21. Title Analyzer (fka Title A/B Tester)

- [ ] **T-206** — Create title analyzer page route + SEO content
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-009
  - **AC:** Page exists. SEO content. H1: "Free YouTube Title Analyzer — Compare & Predict Title Performance". Content explains it's AI prediction, not real A/B testing.

- [ ] **T-207** — Create TitleCompareForm component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-096
  - **AC:** Side-by-side inputs: Title A, Title B, Target Keyword (optional). Character counter per title (50-70 recommended range highlighted).

- [ ] **T-208** — Create ComparisonResult component
  - 🎯 Hard | ⏱️ 40 min | 🔗 T-207
  - **AC:** Side-by-side comparison cards with: CTR prediction (%), SEO score, emotion score (with emoji), power words found (highlighted), sentiment label. Winner badge on better title. Analysis paragraph explaining why. Suggested combined title if appropriate.

- [ ] **T-209** — Assemble Title Analyzer page UI
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-206, T-207, T-208, T-058, T-059, T-060, T-061, T-062
  - **AC:** Complete page. SEO, FAQ, related tools, schema. Disclaimer about AI prediction nature.

---

## 22. Homepage

- [x] **T-210** — Create homepage route
  - 🎯 Easy | ⏱️ 5 min | 🔗 T-041
  - **AC:** `app/page.tsx` renders homepage content.

- [x] **T-211** — Write homepage SEO metadata
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-210
  - **AC:** Title: "YouTube Toolkit AI — 15+ Free YouTube Creator Tools | No Login Required". Full description, OG image, Twitter card.

- [x] **T-212** — Create HeroSection component
  - 🎯 Medium | ⏱️ 35 min | 🔗 T-065, T-097
  - **AC:** H1 headline, subheading "15+ Free YouTube Tools · No Login Required". Smart URL search box (calls /api/youtube/resolve on submit). Suggested tools appear based on URL type. CTA buttons for popular tools.

- [x] **T-213** — Create UrlSearchBox component (smart router)
  - 🎯 Hard | ⏱️ 40 min | 🔗 T-097, T-071
  - **AC:** Paste YouTube URL → auto-detects video/channel → shows contextual tool suggestions as quick-action cards. Loading state during resolve. Validation feedback. Debounced input.

- [x] **T-214** — Create PopularTools grid component
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-074
  - **AC:** Grid of 6-8 tool cards. Each: icon, name, short description, "Try Now" link. Sorted by popularity (hardcoded for MVP).

- [x] **T-215** — Create TrendingVideos section
  - 🎯 Easy | ⏱️ 20 min | 🔗 None | ⚡ [P]
  - **AC:** Horizontal scrollable row of video cards from `src/content/trending-videos.json`. Thumbnail, title, channel. Links to YouTube. Static curated data for MVP.

- [x] **T-216** — Create curated trending videos data
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-215
  - **AC:** `src/content/trending-videos.json` with 10 manually selected YouTube videos (id, title, channel, thumbnail URL). Diverse categories.

- [ ] **T-217** — Create BlogPreview section
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-076
  - **AC:** Grid of 3 latest blog post cards. Each: title, excerpt, date, read time. "View All" link to /blog.

- [x] **T-218** — Create FAQ section for homepage
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-031
  - **AC:** Accordion FAQ with 5-7 general product questions. FAQPage schema injected.

- [x] **T-219** — Assemble complete homepage
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-211, T-212, T-213, T-214, T-215, T-216, T-217, T-218
  - **AC:** All sections assembled in order. Responsive. ISR configured (revalidate: 3600). Organization schema. Lighthouse score ≥ 95.

---

## 23. Blog

- [ ] **T-220** — Create blog listing page
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-076
  - **AC:** `app/(marketing)/blog/page.tsx` shows all blog posts as cards grid. Each: title, excerpt, date, read time, category tag. Search/filter. Pagination if >12 posts.

- [ ] **T-221** — Create blog post page (dynamic route)
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-076
  - **AC:** `app/(marketing)/blog/[slug]/page.tsx` renders MDX content. Article schema. Reading time estimate. Related posts. Author section. Table of contents (for long posts).

- [ ] **T-222** — Write first 5 SEO blog posts (Phase 1)
  - 🎯 Hard | ⏱️ 45 min each | 🔗 T-221
  - **AC:** 5 MDX files in `src/content/blog/`: (1) How to Download YouTube Thumbnails, (2) YouTube SEO Complete Guide 2025, (3) Best Free YouTube Tools, (4) How to Extract YouTube Transcripts, (5) YouTube Tags Strategy Guide. Each 1500+ words, keyword-optimized, with internal links to tool pages.

- [ ] **T-223** — Write 5 more blog posts (Phase 2)
  - 🎯 Hard | ⏱️ 45 min each | 🔗 T-222
  - **AC:** (6) YouTube Title Formulas, (7) YouTube Hashtag Strategy, (8) YouTube Shorts Ideas, (9) YouTube Channel Growth Tips, (10) YouTube Analytics Guide.

- [ ] **T-224** — Create blog RSS feed (optional)
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-220 | ⚡ [P]
  - **AC:** `/blog/rss.xml` or `/feed.xml` returns valid RSS feed of blog posts.

---

## 24. Static Pages

- [ ] **T-225** — Create About page
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-042
  - **AC:** `/about` page with mission, team (or solo dev), tech stack mention, link to contact. SEO metadata.

- [ ] **T-226** — Create Contact page with form
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-042, T-082
  - **AC:** `/contact` page. Form: name, email, subject, message. Validates inputs. Submits to Supabase `contact_submissions`. Success/error toast. Rate limited (5 per hour per IP). Optional: reCAPTCHA v3.

- [ ] **T-227** — Create Privacy Policy page
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-042
  - **AC:** `/privacy` page with comprehensive privacy policy. Covers: data collection (analytics), cookies, AdSense, third-party services, user rights, contact info.

- [ ] **T-228** — Create Terms of Service page
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-042 | ⚡ [P]
  - **AC:** `/terms` page with usage terms, disclaimer (tools are unofficial, not affiliated with YouTube), liability limits.

---

## 25. SEO Implementation

- [x] **T-229** — Configure global metadata defaults in root layout
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-041
  - **AC:** `metadataBase`, `title.template` ("%s | YouTube Toolkit AI"), default description, default OG image.

- [ ] **T-230** — Generate OG images for all tool pages
  - 🎯 Medium | ⏱️ 30 min | 🔗 None | ⚡ [P]
  - **AC:** 15 OG images (1200x630px) in `public/images/og/`. Each: tool name + "Free YouTube Tool" + brand colors. Consistent design.

- [ ] **T-231** — Generate OG image for homepage
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-230
  - **AC:** Homepage OG image with full site name and "15+ Free Tools" tagline.

- [ ] **T-232** — Add BreadcrumbList schema to all tool pages
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-047
  - **AC:** Every tool page has BreadcrumbList JSON-LD via shared component.

- [ ] **T-233** — Add FAQPage schema to all pages with FAQs
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-067
  - **AC:** ToolFAQ component also injects FAQPage JSON-LD.

- [ ] **T-234** — Add internal linking between tool pages
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-074
  - **AC:** All 1200-word SEO content sections include 3-5 contextual links to other tool pages. Related tools section links to 4 tools. Blog posts link to tools.

- [ ] **T-235** — Implement JSON-LD Article schema for blog posts
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-221
  - **AC:** Every blog post page injects Article schema with author, datePublished, dateModified, image.

- [ ] **T-236** — Implement JSON-LD WebApplication schema for tool pages
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-068
  - **AC:** Verified via Google Rich Results Test. All required fields present.

- [ ] **T-237** — Verify all schemas with Google Rich Results Test
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-232, T-233, T-235, T-236
  - **AC:** All 15 tool pages + homepage + blog pass Rich Results Test with no errors. Warnings addressed.

- [ ] **T-238** — Optimize meta descriptions for CTR
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-229
  - **AC:** All meta descriptions are 140-160 characters, include primary keyword, have call-to-action, unique per page. No duplication.

---

## 26. Performance Optimization

- [ ] **T-239** — Configure ISR for homepage
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-219
  - **AC:** `export const revalidate = 3600` on homepage. Verified in response headers.

- [ ] **T-240** — Configure static generation for tool SEO content
  - 🎯 Easy | ⏱️ 15 min | 🔗 All tool pages
  - **AC:** All tool page SEO content sections are Server Components with static rendering. Interactive tool widgets are Client Components wrapped in Suspense.

- [ ] **T-241** — Add Suspense boundaries to all tool pages
  - 🎯 Medium | ⏱️ 20 min | 🔗 All tool pages
  - **AC:** Every tool's interactive area wrapped in `<Suspense fallback={<ToolLoading />}>`. SEO content renders immediately.

- [ ] **T-242** — Configure dynamic imports for heavy components
  - 🎯 Medium | ⏱️ 25 min | 🔗 All tool pages
  - **AC:** Heavy components (TranscriptViewer, SEO Score gauge, StreamingDescription) use `next/dynamic` with `ssr: false` and loading fallback.

- [ ] **T-243** — Configure next/image for all images
  - 🎯 Medium | ⏱️ 25 min | 🔗 All pages
  - **AC:** All `<img>` tags replaced with `<Image>`. YouTube thumbnails use `unoptimized` (external URLs). Local images use built-in optimization. Proper `width`/`height` to prevent CLS. `priority` on LCP images.

- [ ] **T-244** — Configure lazy loading for below-fold content
  - 🎯 Easy | ⏱️ 15 min | 🔗 All pages | ⚡ [P]
  - **AC:** Below-fold images use `loading="lazy"`. Video embeds lazy loaded. Heavy sections use intersection observer with dynamic import.

- [ ] **T-245** — Optimize font loading
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-033
  - **AC:** Font uses `subset: ['latin']`, `display: 'swap'`. No layout shift on font load.

- [ ] **T-246** — Run Lighthouse audit and fix issues
  - 🎯 Medium | ⏱️ 45 min | 🔗 T-239 to T-245
  - **AC:** Homepage: Performance ≥ 95, SEO = 100, Accessibility ≥ 95, Best Practices ≥ 90. All tool pages: Performance ≥ 90 (tools have interactive JS). Zero CLS issues.

- [ ] **T-247** — Configure Lighthouse CI budget
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-019, T-246
  - **AC:** `.github/workflows/ci.yml` includes Lighthouse CI check. Budgets enforce: performance ≥ 90, SEO ≥ 95, a11y ≥ 90, best-practices ≥ 85. PRs failing budget get warning.

- [ ] **T-248** — Implement bundle analyzer check
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-019 | ⚡ [P]
  - **AC:** CI analyzes bundle size. Alerts if any page JS exceeds 150KB gzipped.

---

## 27. Analytics

- [ ] **T-249** — Set up Vercel Analytics
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-015
  - **AC:** `<Analytics />` in root layout. Web Vitals appearing in Vercel dashboard.

- [ ] **T-250** — Set up Vercel Speed Insights
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-015
  - **AC:** `<SpeedInsights />` in root layout. Core Web Vitals tracking active.

- [ ] **T-251** — Configure and initialize Google Analytics 4
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-029, T-052
  - **AC:** GA4 script loads after cookie consent via `next/script` with `strategy="lazyOnload"`. Page views tracked automatically. No data sent before consent.

- [ ] **T-252** — Configure and initialize PostHog
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-028, T-052, T-094
  - **AC:** PostHogProvider in root layout. Initialized only after cookie consent. `maskPersonData: true`. Server-side PostHog client for API event tracking.

- [ ] **T-253** — Implement tool usage event tracking
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-252, T-072
  - **AC:** Every successful tool usage fires `posthog.capture('tool_used', { tool_slug, success, duration_ms, from_search_box, is_cached })`. Integrated into useToolApi hook.

- [ ] **T-254** — Implement AI generation event tracking
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-252, T-116 to T-124
  - **AC:** Every AI generation fires `posthog.capture('ai_generated', { tool_slug, tokens_used, language, tone })`.

- [ ] **T-255** — Implement error event tracking
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-252, T-061
  - **AC:** Tool errors fire `posthog.capture('tool_error', { tool_slug, error_code })`. ToolError component integration.

- [ ] **T-256** — Implement download & copy event tracking
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-252, T-062
  - **AC:** `posthog.capture('file_downloaded', { tool_slug, format })` and `posthog.capture('content_copied', { tool_slug })`.

- [ ] **T-257** — Configure Sentry for error tracking
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-027
  - **AC:** `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`. Source maps uploaded on build. Test error appears in Sentry dashboard. `@sentry/nextjs` wrapping root layout.

- [ ] **T-258** — Add Sentry error boundary to app
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-257
  - **AC:** Sentry error boundaries active. API route errors captured. Console errors captured in production.

---

## 28. AdSense Integration

- [ ] **T-259** — Apply for Google AdSense
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-219 (site must be live with content)
  - **AC:** AdSense application submitted. Verification code placed on site.

- [ ] **T-260** — Create AdSense script loader
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-052, T-069
  - **AC:** AdSense script loads after cookie consent. Loaded via `next/script` with `strategy="afterInteractive"`. Only loads if NEXT_PUBLIC_ADSENSE_ENABLED=true. Environment-aware (dev shows placeholder).

- [ ] **T-261** — Place ad slots on tool pages
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-260, T-069
  - **AC:** AdPlaceholder components placed: sidebar (all tool pages), below tool output (desktop), between SEO content sections (mobile). Responsive ad sizes. Respects ad density limits.

- [ ] **T-262** — Place ad slot on homepage
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-260, T-219
  - **AC:** Ad between popular tools and trending videos sections.

- [ ] **T-263** — Place ad slot on blog pages
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-260, T-221
  - **AC:** Ad within blog content (after paragraph 3). In-article ad format.

- [ ] **T-264** — Implement ad impression and click tracking
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-252, T-261
  - **AC:** PostHog events for ad impressions and clicks. Position and page context tracked.

- [ ] **T-265** — Implement affiliate link click tracking
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-252, T-075
  - **AC:** All affiliate links fire `posthog.capture('affiliate_click', ...)` AND log to Supabase `affiliate_clicks` table.

---

## 29. Testing

### 29.1 Unit Tests

- [ ] **T-266** — Write unit tests for YouTube URL parser
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-017, T-085
  - **AC:** Tests cover all URL formats (watch, youtu.be, shorts, embed, channel, handle, c/). Valid and invalid URLs. Edge cases (extra params, no protocol, mixed case).

- [ ] **T-267** — Write unit tests for thumbnail URL builder
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-017, T-086
  - **AC:** All qualities return correct URLs. Handles invalid IDs.

- [ ] **T-268** — Write unit tests for SEO score calculator
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-017, T-198
  - **AC:** Tests for each scoring category. Weighted total verification. Edge cases (empty inputs, extremely long text). Score range 0-100.

- [ ] **T-269** — Write unit tests for keyword density calculator
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-017, T-200
  - **AC:** Various densities verified. Multi-word keywords. Case insensitivity. Empty inputs.

- [ ] **T-270** — Write unit tests for error code system
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-017, T-083
  - **AC:** All error codes map to correct status and message. AppError construction. apiErrorResponse format.

- [ ] **T-271** — Write unit tests for URL validation schemas
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-017, T-095, T-096
  - **AC:** Valid and invalid inputs for all schemas. Boundary testing (min/max lengths). Required field enforcement.

- [ ] **T-272** — Write unit tests for cache key generation
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-017, T-089
  - **AC:** Key format consistency. Namespace separation. Parameter inclusion.

### 29.2 Component Tests

- [ ] **T-273** — Write component tests for Header
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-016, T-044
  - **AC:** Navigation links render. Mobile menu opens/closes. Theme toggle switches. Active link styling.

- [ ] **T-274** — Write component tests for Thumbnail Downloader
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-016, T-134
  - **AC:** URL input validation feedback. Quality selector interaction. Download button triggers. Loading/error states render.

- [ ] **T-275** — Write component tests for Tags Extractor
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-016, T-142
  - **AC:** Tags render as badges. Copy button works. Download triggers. Empty state for no-tag videos.

### 29.3 E2E Tests

- [ ] **T-276** — Write E2E test for homepage
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-018, T-219
  - **AC:** Page loads, hero visible, URL search box functional, navigation to tool pages works, theme toggle works.

- [ ] **T-277** — Write E2E test for Thumbnail Downloader flow
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-018, T-134
  - **AC:** Full flow: navigate → paste URL → see preview → switch quality → download button works. Tests loading state appearance.

- [ ] **T-278** — Write E2E test for Tags Extractor flow
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-018, T-142
  - **AC:** Navigate → paste URL → see tags → copy tag → copy all → download TXT.

- [ ] **T-279** — Write E2E test for Transcript Extractor flow
  - 🎯 Medium | ⏱️ 25 min | 🔗 T-018, T-157
  - **AC:** Navigate → paste URL → see transcript → change language → copy → download.

---

## 30. Deployment

- [ ] **T-280** — Create vercel.json with production configuration
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-023
  - **AC:** Regions, headers, redirects, crons configured. Deploy uses this config.

- [ ] **T-281** — Configure Vercel environment variables (Production)
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-022
  - **AC:** All production env vars set in Vercel dashboard. Build succeeds. No missing vars.

- [ ] **T-282** — Deploy to Vercel Production
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-280, T-281
  - **AC:** Push to main → auto-deploys. Site live at yttoolkit.com. SSL valid. All pages load.

- [ ] **T-283** — Set up custom domain and SSL on Vercel
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-024, T-282
  - **AC:** yttoolkit.com resolves to Vercel. SSL auto-provisioned. www redirect to apex.

- [ ] **T-284** — Configure Vercel cron jobs
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-127, T-280
  - **AC:** Daily sitemap regeneration cron active. Verified via Vercel dashboard.

- [ ] **T-285** — Set up UptimeRobot monitoring
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-282
  - **AC:** Homepage and `/api/internal/health` monitored every 5 minutes. Email alerts on 2+ consecutive failures.

- [ ] **T-286** — Submit sitemap to Google Search Console
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-030, T-055, T-282
  - **AC:** Sitemap submitted. Indexing status monitored.

- [ ] **T-287** — Submit sitemap to Bing Webmaster Tools
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-055, T-282 | ⚡ [P]
  - **AC:** Sitemap submitted to Bing.

- [ ] **T-288** — Verify robots.txt is accessible
  - 🎯 Easy | ⏱️ 5 min | 🔗 T-056, T-282
  - **AC:** `https://yttoolkit.com/robots.txt` returns correct content. Points to sitemap.

- [ ] **T-289** — Verify security headers are applied
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-094, T-282
  - **AC:** SecurityHeaders.com or curl shows CSP, HSTS, X-Frame-Options, etc. on all pages.

- [ ] **T-290** — Run final Lighthouse production audit
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-282, T-246
  - **AC:** Production scores meet all budgets. PageSpeed Insights confirms.

---

## 31. Documentation

- [ ] **T-291** — Write README.md
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-009
  - **AC:** Project overview, tech stack, getting started guide (clone, install, env vars, dev server), project structure overview, contributing guide, license.

- [ ] **T-292** — Document all environment variables in README
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-010
  - **AC:** Table of all env vars with descriptions and where to get them. Links to relevant dashboards.

- [ ] **T-293** — Write CONTRIBUTING.md
  - 🎯 Easy | ⏱️ 20 min | 🔗 T-291 | ⚡ [P]
  - **AC:** Branch strategy, PR process, code style, commit conventions, testing requirements.

- [ ] **T-294** — Write API documentation for all endpoints
  - 🎯 Hard | ⏱️ 45 min | 🔗 T-097 to T-127
  - **AC:** `docs/API.md` with all endpoints, request/response examples, error codes, rate limits. Ready for public API consumers (future).

---

## 32. Launch Preparation

- [ ] **T-295** — Cross-browser testing pass
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-282
  - **AC:** Tested on Chrome, Firefox, Safari, Edge (desktop + mobile). No visual regressions. All tool flows work.

- [ ] **T-296** — Mobile responsive testing pass
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-282
  - **AC:** All pages tested on iPhone SE, iPhone 14, iPad, Pixel 7 viewports. No horizontal scroll. Touch targets ≥ 44px. Forms usable.

- [ ] **T-297** — Accessibility testing pass
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-282
  - **AC:** Keyboard navigation works on all tool pages. Screen reader (NVDA/VoiceOver) can use all tools. axe DevTools reports 0 critical/serious issues.

- [ ] **T-298** — Cookie consent testing
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-052, T-282
  - **AC:** Banner appears on first visit. Accept enables analytics/ads. Reject blocks them. Choice persists on reload.

- [ ] **T-299** — Dark mode testing pass
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-282
  - **AC:** All pages look correct in dark mode. No hardcoded colors. Contrast ratios sufficient. System preference respected.

- [ ] **T-300** — Rate limiting verification
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-094, T-282
  - **AC:** Exceeding rate limit returns 429 with correct headers. AI limits return specific error. YouTube limits return specific error.

- [ ] **T-301** — Cache verification
  - 🎯 Medium | ⏱️ 20 min | 🔗 T-091, T-282
  - **AC:** Cached responses include correct headers. Second request returns cached data (faster). Different quality/params bypass cache correctly.

- [ ] **T-302** — Error tracking verification
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-257, T-282
  - **AC:** Deliberately triggered errors appear in Sentry and PostHog. Error boundaries render correctly.

- [ ] **T-303** — Analytics verification
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-251, T-252, T-282
  - **AC:** GA4 realtime shows active users. PostHog live events shows tool usage. Vercel Analytics shows Web Vitals.

- [ ] **T-304** — Final sitemap and robots.txt verification
  - 🎯 Easy | ⏱️ 10 min | 🔗 T-282
  - **AC:** All 15 tool pages + homepage + blog + static pages in sitemap. No broken URLs. robots.txt allows crawling.

---

## 33. Post-Launch Improvements

- [ ] **T-305** — Implement YouTube API quota monitoring dashboard
  - 🎯 Medium | ⏱️ 30 min | 🔗 T-081
  - **AC:** Simple `/api/internal/quota-status` returns current daily usage percentage. Displayed in dev tools or admin panel.

- [ ] **T-306** — Add daily AI request counter to UI
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-106
  - **AC:** AI tool pages show "X/Y daily requests used" indicator. Updates after each generation. Resets at midnight UTC.

- [ ] **T-307** — Set up Google Search Console performance monitoring
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-030
  - **AC:** Weekly check of impressions, clicks, CTR, average position. Track keyword rankings.

- [ ] **T-308** — Create a changelog page
  - 🎯 Easy | ⏱️ 20 min | 🔗 None
  - **AC:** `/changelog` page listing version updates, new features, bug fixes. Data from `src/content/changelog.json`.

- [ ] **T-309** — Add social share metadata validation
  - 🎯 Easy | ⏱️ 15 min | 🔗 T-282
  - **AC:** Facebook Sharing Debugger and Twitter Card Validator show correct previews for all pages.

---

## Critical Path

These tasks must be completed in strict order. Everything else can be parallelized around them.

```
T-001 → T-009 → T-041 → T-044 → T-219 (Homepage shell)
                    ↓
T-084 → T-088 → T-094 → T-097 (First working API)
                    ↓
T-098 → T-100 → T-101 → T-103 (YouTube API routes)
                    ↓
T-128 → T-134 → T-137 → T-142 → T-149 → T-157 (First 3 tools)
                    ↓
T-104 → T-107 → T-116 → T-159 → T-164 (AI Title Generator)
                    ↓
T-210 → T-219 (Complete homepage)
                    ↓
T-246 → T-282 (Lighthouse pass + deploy)
```

The critical path is approximately 30 tasks that must be sequential. Everything else can be developed in parallel by different contributors or in any order after dependencies are met.

---

## MVP Task List (Phase 1 Minimum)

These 78 tasks constitute the minimum shippable product:

**Setup:** T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-009, T-010, T-011, T-012, T-013, T-014, T-016, T-017, T-019, T-021, T-022, T-025, T-026

**UI Foundation:** T-031, T-032, T-033, T-034, T-035, T-037, T-039

**Layout:** T-041, T-043, T-044, T-045, T-046, T-047, T-049, T-051, T-052

**Shared:** T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-074

**API Core:** T-083, T-084, T-085, T-086, T-088, T-089, T-090, T-091, T-092, T-094, T-095

**YouTube APIs:** T-097, T-098, T-100, T-101, T-103

**AI Foundation:** T-104, T-105, T-107, T-108

**AI APIs:** T-116, T-117

**Tool Pages:** T-128, T-129, T-134, T-137, T-138, T-142, T-149, T-150, T-157 (Thumbnail, Tags, Transcript)

**AI Tool Pages:** T-159, T-160, T-164, T-165, T-169 (Title Gen, Description Gen)

**Homepage:** T-210, T-211, T-212, T-214, T-219

**Launch:** T-229, T-239, T-246, T-251, T-257, T-282, T-285, T-286

---

## Nice-to-Have Features (Phase 2+)

- [ ] **T-N01** — PWA with offline support and "Add to Home Screen"
- [ ] **T-N02** — Dark mode auto-switch based on time of day
- [ ] **T-N03** — Tool usage heatmap on homepage (most popular tools)
- [ ] **T-N04** — User feedback widget (thumbs up/down per tool)
- [ ] **T-N05** — Newsletter signup (ConvertKit or Resend integration)
- [ ] **T-N06** — YouTube video embed preview on stats pages
- [ ] **T-N07** — Bulk transcript + timestamps (paste multiple video URLs)
- [ ] **T-N08** — Exportable PDF reports for SEO score
- [ ] **T-N09** — i18n support for top 5 languages (next-intl)
- [ ] **T-N10** — Saved tool configurations (localStorage collections)
- [ ] **T-N11** — Chrome extension (basic: right-click YouTube video → open tool)
- [ ] **T-N12** — RSS feed for blog
- [ ] **T-N13** — Social share buttons on tool results
- [ ] **T-N14** — Tool comparison page (e.g., "Thumbnail Downloader vs manual screenshot")
- [ ] **T-N15** — Command palette (Ctrl+K) for quick tool navigation

---

## Future Premium Features (Phase 5+)

These require authentication, payments, and user accounts. Not for MVP.

- [ ] **T-P01** — Supabase Auth (email/password + Google OAuth)
- [ ] **T-P02** — User dashboard with usage history and saved results
- [ ] **T-P03** — Stripe subscription integration (monthly/annual Pro)
- [ ] **T-P04** — Unlimited AI generations for Pro users
- [ ] **T-P05** — Bulk video analysis (up to 50 videos at once)
- [ ] **T-P06** — PDF export for all tool results
- [ ] **T-P07** — Public API with API key management
- [ ] **T-P08** — API rate limit tiers per subscription
- [ ] **T-P09** — AI Channel Audit (comprehensive analysis)
- [ ] **T-P10** — Competitor Analysis tool
- [ ] **T-P11** — Thumbnail CTR Analyzer (AI vision model)
- [ ] **T-P12** — Upload Time Optimizer
- [ ] **T-P13** — Viral Topic Finder dashboard
- [ ] **T-P14** — Content Calendar with AI suggestions
- [ ] **T-P15** — Team/enterprise accounts with shared workspace
- [ ] **T-P16** — WordPress plugin
- [ ] **T-P17** — Trend Detection Dashboard (real-time)

---

## Technical Debt (Tracked for Future)

| ID | Item | Impact | When to Address |
|----|------|--------|-----------------|
| TD01 | In-memory rate limiting fallback is not shared across serverless instances | Low for MVP, grows with traffic | Phase 3 — migrate fully to Upstash |
| TD02 | Static trending videos data will become stale | Low | Phase 2 — connect to YouTube API for trending (quota permitting) |
| TD03 | No comprehensive API response type generation from Zod schemas | Low | Phase 2 — implement `zod-to-ts` or use tRPC patterns |
| TD04 | Gemini prompts are not versioned for A/B testing | Medium | Phase 2 — implement prompt versioning with metrics |
| TD05 | Transcript scraping reliability not battle-tested at scale | Medium | Ongoing — monitor failure rate, iterate fallback UX |
| TD06 | No connection pooling for Supabase (serverless cold starts) | Low | Phase 3 — add `pgbouncer` or use Supabase pooler |
| TD07 | SEO content is manually written (not programmatic) | Medium | Phase 4 — explore programmatic SEO for long-tail tool pages |
| TD08 | No structured logging | Low | Phase 2 — add `pino` or structured JSON logging |
| TD09 | YouTube API quota rotation not implemented (single key) | High | Before launch — apply for quota increase; Phase 2 — secondary key rotation |
| TD10 | Cookie consent banner is custom-built (no third-party integration) | Low | Ongoing — ensure GDPR compliance is verified |

---

## Release Checklist

### Pre-Launch

- [ ] All MVP tasks (listed above) complete
- [ ] Lighthouse scores ≥ 90 across all pages
- [ ] All 15 tool pages have 1200+ word SEO content
- [ ] All schema markup validated (Rich Results Test)
- [ ] Sitemap submitted to Google + Bing
- [ ] robots.txt verified
- [ ] Security headers verified
- [ ] Error tracking confirmed (Sentry receiving data)
- [ ] Analytics confirmed (GA4 + PostHog receiving data)
- [ ] AdSense application submitted (if applicable)
- [ ] Cookie consent working
- [ ] Cross-browser testing passed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing passed
- [ ] Accessibility testing passed (0 critical issues)
- [ ] Rate limiting verified
- [ ] CI/CD pipeline passing
- [ ] Privacy Policy and Terms of Service pages live
- [ ] README.md complete
- [ ] All API keys rotated to production keys
- [ ] Domain SSL valid
- [ ] UptimeRobot monitoring active

### Post-Launch (Week 1)

- [ ] Monitor Sentry for unexpected errors
- [ ] Monitor YouTube API quota usage daily
- [ ] Monitor Gemini API usage daily
- [ ] Check Google Search Console indexing status
- [ ] Respond to contact form submissions
- [ ] Fix any critical bugs immediately
- [ ] Gather initial user feedback

### Post-Launch (Week 2-4)

- [ ] Analyze PostHog: which tools get most usage?
- [ ] Analyze PostHog: where do users drop off?
- [ ] Optimize most-used tool UX
- [ ] Write Phase 2 blog posts
- [ ] Begin Phase 2 tool development
- [ ] Review and respond to SEO performance data
