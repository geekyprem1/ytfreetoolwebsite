# Website Bug Findings

**Scan date:** July 15, 2026  
**Status:** Findings only; no source files changed during this scan.

## Critical / High Priority

### 1. Footer and legal links lead to 404 pages
- **File:** `src/components/layout/footer.tsx`
- **Also:** `src/components/layout/cookie-consent.tsx`
- Links to `/about`, `/contact`, `/privacy`, and `/terms` exist, but corresponding pages are missing. The cookie consent `/privacy` link is also broken.
- **Impact:** Users encounter 404 pages from shared navigation and consent UI.

### 2. Transcript extractor manual fallback is unreachable
- **File:** `src/app/(tools)/transcript-extractor/client.tsx`
- The manual form is nested under an error condition that becomes false when `showManual` is enabled. Clicking Retry/Manual therefore hides both the error and manual input.
- A language selector handler exists, but the selector is not rendered, so language switching is unavailable.

### 3. Channel handle resolution is malformed
- **File:** `src/lib/youtube/client.ts`
- `forHandle` is sent after removing the `@` prefix, although YouTube handle lookup requires the prefix.
- `/c/custom-channel` URLs are treated as handles even though they require a different lookup strategy or a clear unsupported-URL response.
- **Impact:** Common channel URLs can fail to resolve.

### 4. Cache failures can cause duplicate provider requests
- **File:** `src/lib/cache/get-cached.ts`
- Cache read errors, provider errors, and cache write errors are handled in one catch block that calls `fetcher()` again.
- If the provider succeeds but Redis write fails, YouTube/AI is called twice, increasing quota and cost.

### 5. Lint currently fails
- **Command:** `pnpm lint`
- **Result:** 7 errors and 20 warnings.
- Errors include unescaped apostrophes, React set-state-in-effect violations in cookie/theme/recent-search hooks, and an empty interface in `src/components/ui/textarea.tsx`.
- **Impact:** CI or deployment checks using the lint script can fail.

## Functional Bugs

### 6. Shorts Ideas count does not match the API limit
- **Files:** `src/app/(tools)/shorts-ideas/client.tsx`, `src/app/api/ai/generate-shorts-ideas/route.ts`
- The UI allows/promises up to 50 ideas, while the API clamps every request to 20.

### 7. Channel recent-video view counts are always zero
- **File:** `src/lib/youtube/client.ts`
- `getChannelVideos()` maps every returned video to `viewCount: 0` instead of fetching video statistics.
- **Impact:** Channel statistics show incorrect view counts.

### 8. “Try Again” does not retry the failed request
- **File:** `src/hooks/use-tool-api.ts`
- Reset clears local error/data state but does not re-execute the previous request.
- **Impact:** Users must submit the URL/input again manually.

### 9. Header Explore Tools link is broken on tool pages
- **File:** `src/components/layout/header.tsx`
- The link uses `href="#tools"`, but the `tools` anchor exists on the homepage only. It should navigate to the homepage tools section, such as `/#tools`.

### 10. SEO score receives the wrong rate-limit tier
- **File:** `src/middleware.ts`
- `/api/ai/seo-score` matches the generic AI tier before the compute-tier check.
- `X-RateLimit-Limit` is hard-coded to `60` for all tiers, so response headers can be incorrect.

### 11. HD and HQ thumbnail options are duplicates
- **File:** `src/lib/youtube/thumbnail.ts`
- Both HD and HQ point to `hqdefault.jpg`, while HD is advertised as 1280×720. The actual image is lower resolution.

### 12. Video category displays a numeric ID
- **Files:** `src/lib/youtube/client.ts`, `src/app/(tools)/video-statistics/client.tsx`
- The UI labels `categoryId` as “Category” instead of resolving/displaying the category name or explicitly labeling it as an ID.

## Validation Results

| Check | Result |
|---|---|
| `pnpm exec tsc --noEmit` | Pass |
| `pnpm build` | Pass |
| `pnpm lint` | Fail: 7 errors, 20 warnings |
| `pnpm test` | Not available; no test script is configured |

## Recommended Fix Order

1. Fix missing navigation/legal pages or remove the broken links.
2. Fix transcript manual fallback and add the missing language selector UI.
3. Correct YouTube channel handle/custom URL resolution.
4. Fix lint errors so CI/deployment validation passes.
5. Fix real retry behavior and cache duplicate requests.
6. Correct statistics, thumbnails, rate-limit headers, and Shorts count consistency.
