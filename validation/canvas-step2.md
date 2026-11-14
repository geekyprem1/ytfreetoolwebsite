# Canvas homepage — step 2 verification

Date: 14 November 2026 (Asia/Calcutta)
Preview: http://localhost:4180/
Scope: homepage navigation/search integration and local validation; no deployment or sponsor backend.

## Changes

- Existing trusted YouTube parser drives video, channel/handle and playlist suggestions.
- Suggested links use existing tool routes and pass normalized input via `?url=`; tracking parameters are removed.
- Existing search aliases and token matching are reused for ordinary tool searches.
- Tool cards have stable React identity, preserving keyboard focus when a star changes state.
- Favourite preferences persist across reloads; in-memory fallback handles unavailable storage. Removing a stored preference no longer falls back to an old in-memory value.
- Mobile drawer gets initial focus, focus containment, background inertness, scroll locking, Escape/close focus restoration and automatic closure at desktop widths.
- Added skip link and footer links to About, Contact, Privacy and Terms.
- Homepage FAQ describes browser-local favourites; the same data feeds visible FAQ and JSON-LD.

## Verification results

- TypeScript passed.
- Changed-file ESLint passed with no warnings.
- 18 tests passed across homepage suggestions, existing search, URL parsing and schema graph suites.
- Production build passed: 274 static pages generated. Rankings snapshot/history storage warnings still appear; no build failure.
- Local HTTP audit: all 67 tool routes and 5 footer/resource routes returned 200. See `canvas-homepage-routes.json`.
- Homepage HTML contains all 67 tool destination links before hydration, exactly one H1, title, description, canonical and FAQ structured data.
- Canonical matches the configured schema origin. Local configuration currently renders `http://localhost:3000`; production deployment must configure `NEXT_PUBLIC_SITE_URL` to the actual public origin.

## Browser checks

- Video input: 9 relevant suggestions, with normalized `url` query parameter.
- Channel handle: 7 relevant suggestions.
- Playlist input: Playlist Length Calculator suggestion.
- Search alias `description viewer`: Description Extractor result.
- Category counts: Downloaders 4, Extractors 8, AI tools 13, Analytics 13, SEO tools 12, Calculators 17.
- Saving Thumbnail Downloader retained keyboard focus on its star. Selection survived reload and appeared in Favourites. Test selection restored to its original state afterwards.
- Mobile drawer: focus initially on close button; forward/reverse Tab stay inside; Escape returns focus to menu trigger and unlocks page scrolling.
- No horizontal page overflow at 375, 768, 1024 and 1440 CSS pixels.
- `/` focuses search without modifying the input.
- Clicking the suggested Thumbnail Downloader opened the real local tool with `https://www.youtube.com/watch?v=dQw4w9WgXcQ` in its input.

These checks verify homepage routes and input handoff. They do not establish that every tool's third-party API or AI generation succeeds for every input.

## Repeat focused validation

```text
npm run typecheck
npx eslint src/components/home/canvas-home.tsx src/content/home-tool-suggestions.ts src/content/home-tool-suggestions.test.ts src/content/home-faqs.ts scripts/verify-homepage-routes.mjs
npx vitest run src/content/home-tool-suggestions.test.ts src/content/tool-search.test.ts src/lib/youtube/url-parser.test.ts src/lib/seo/schema-graph.test.ts
node scripts/verify-homepage-routes.mjs
npm run build
```

The route audit needs the preview server running on port 4180. Windows sandbox restrictions may require normal network/temp-file permissions for these checks.
