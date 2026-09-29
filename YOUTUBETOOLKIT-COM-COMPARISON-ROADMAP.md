# YouTubeToolkit.com comparison aur phase-wise roadmap

Audit date: 29 September 2026

Apna project: YT Toolkit / yttools.pro

Competitor: https://youtubetoolkit.com/
Status: Phases 0–8 have local implementation, decisions and release checks recorded below. Production deployment and post-release measurement are not yet verified.

## 1. Main finding

Initial audit ke waqt project mein **60 registered tools aur 15 blog posts** the; Phase 0–8 ke baad local registry mein **67 tools aur 20 blog posts** hain. Main opportunities specific missing features, tools discovery, broader useful blog coverage aur visible trust information mein hain.

Competitor ke har tool name ko naya feature mat samajhna. Description Viewer, Comment Finder, Thumbnail Viewer aur kai calculators ka kaam hum already cover karte hain. Existing tools improve karna kai cases mein better next step hai.

### Audit ka scope aur limits

- Competitor ke public homepage, tools directory, blog index aur selected tool pages inspect kiye.
- Apne tool registry, routes, clients, blog registry, sitemap, robots aur SEO components inspect kiye.
- Competitor blog index par 34 article entries dikhi; yeh observed index count hai, exhaustive indexed-page count nahi.
- Competitor tool pages par described features compare kiye; unke backend results end-to-end test nahi kiye.
- Initial audit mein live site fetch nahi hui thi. Phase 0 mein browser aur public HTTP checks se production baseline capture ho gaya. Local fix abhi production par deploy nahi hua.
- Competitor robots/sitemap reliably fetch nahi hue. Technical SEO superiority claim nahi kar sakte.
- Traffic, backlinks, keyword volume, Google rankings, Core Web Vitals aur conversion rate verify nahi hue.
- Priority product usefulness, existing code reuse aur implementation dependencies ke basis par hai; measured search demand ke basis par nahi.
- Existing `TASKS-COMPETITOR-GAPS.md` **yttools.co** ke liye hai. Yeh document **youtubetoolkit.com** ke liye separate roadmap hai.

## 2. Missing aur partially covered tools

| Competitor feature | Apna current status | Suggested action | Phase |
|---|---|---|---|
| Comment Sentiment Analyzer | Export/search available; sentiment/topics missing | Bounded sample analysis, sentiment breakdown, themes aur examples | 2 |
| Advanced Money Calculator | Ads calculators available; combined sponsorship/affiliate planning missing | Transparent multi-income calculator | 3 |
| YouTube Rank Checker | SEO score available; keyword search position missing | Quota/data feasibility first, conditional implementation | 6 |
| Dislike Checker | Estimated dislikes missing | External data dependency evaluate, estimates clearly label | 6 |
| Metadata Viewer | Video/channel stats partially cover it | Existing stats expand; detailed fields aur JSON export | 4 |
| Live Like Counter | Video stats mein likes hain; dedicated refresh flow nahi | Demand ho toh existing live counter pattern reuse | 7 |
| Upload Date Finder | Video stats mein published date hai | Exact timestamp/timezone display add; upload vs publication distinction explain | 4 |
| Channel History Viewer | Recent uploads available | Bounded history pagination; complete-history claims avoid | 7 |
| Channel Search / URL Finder | Equivalent search workflow missing | Same search/quota feasibility gate as rank checker | 6/7 |
| URL/Link Viewer | Internal parser exists; standalone inspector missing | Useful ho toh parser output aur canonical URL utility expose | 7 |
| Comment Generator | Dedicated comment-writing tool missing | Creator reply drafting as possible scope; low priority | 7 |
| Deleted Video Finder | Archive discovery missing | Archive lookup/link workflow, recovery guarantee nahi | 7 |
| BPM Finder / Tap Tempo | Missing | Client-side tap tempo possible; metadata lookup audio analysis nahi hai | 7 |
| Royalty-Free Music | Music discovery/library missing | Source/licensing maintenance assess before building | 7 |
| Shadowban Detector | Missing | Guaranteed detector plan nahi; observable visibility checks only if useful | 7 |
| Private Video Checker / Viewer / Age Restriction Inspector | Dedicated diagnostics missing | Publicly observable metadata and limitations only; access bypass promise nahi | 7 |

### Already covered: unnecessary duplicate tools avoid karo

| Competitor naming | Apna equivalent / remaining distinction |
|---|---|
| Description Viewer | `youtube-description-extractor`: text, links, hashtags, chapters |
| Thumbnail Viewer / Image Tool | Thumbnail, profile picture aur banner downloaders; combined entry point optional |
| Comment Finder / Comments Viewer | `youtube-comment-exporter`: preview, keyword/author filter, likes/date sorting, CSV/JSON; reply browsing parity unverified |
| Clickbait Title Generator | AI Title Generator + Title Analyzer; exact scoring model same nahi |
| Hashtag Generator | Existing AI Hashtag Generator |
| Tag Extractor / Tag Finder | Tags Extractor + Channel Tags + Tag Generator; related-tag behavior may differ |
| Keyword Finder | Keyword Generator + extracted tags partially cover research; URL-based keyword extraction distinct enhancement ho sakta hai |
| Embed Viewer | Embed Code Generator; embeddability diagnostics separate enhancement ho sakta hai |
| Video Money / Views to Money / Watch Time / Live Stream Calculator | Existing calculators cover core manual calculations; URL auto-fetch/niche presets separately evaluate |
| Channel Ideas | Channel Name Generator + Video Ideas + Shorts Ideas partially cover ideation |
| Monetization Checker / Channel ID / Live Subscribers | Existing dedicated tools |

## 3. SEO, content aur product findings

| Area | Observed difference | Action |
|---|---|---|
| Blog breadth | Competitor index: 34 articles; own registry: 15. Troubleshooting, earnings aur platform features par broader coverage | Relevant content clusters expand; existing guides se overlap check |
| Tools directory | Competitor has `/tools`; apna categorized catalog homepage `#tools` par | Searchable dedicated directory with crawlable links |
| Specific task pages | Competitor has narrow workflows such as upload date/metadata/like counter | Distinct user value ho tab page; keyword-only duplicates nahi |
| Blog presentation | Competitor index has categories and visible author names | Own blog mein categories, accurate visible bylines, reviewer/method details |
| Newsletter | Competitor blog has signup form; own implementation nahi mila | Provider selection ke baad optional subscription workflow |
| Social proof | Competitor homepage has testimonials; own section lists product benefits | Permission ke saath real feedback/case studies collect; competitor authenticity unverified |
| Contributor discovery | Competitor homepage footer has Write for Us link | Optional contribution guidelines later; competitor destination fetch nahi hua |
| Technical SEO | Own code already has metadata, canonicals, sitemap, robots, structured data, FAQ/related links, llms routes | Verify deployment and correctness; foundation ko missing mat treat karo |
| Content beyond blogs | Own project has rankings, datasets, glossary, comparisons, tags-for and posting-time routes | Existing content assets ko discovery aur internal links mein use karo |

Blog count ya schema presence ranking guarantee nahi hai. Original examples, correct answers aur usable tools pe focus rahe.

## 4. Implementation rules

1. Existing work preserve karo. Har phase start par Git status aur relevant current code recheck karo.
2. New tool ke liye existing pattern reuse: `page.tsx`, `client.tsx`, `src/content/tool-seo/<slug>.tsx`, registry entry, `ToolPageShell`, answer-first copy aur `RelatedTools`.
3. Existing API validation, response/error helpers, cache keys, TTL aur rate-limiting pattern inspect karke follow karo. Purane task docs ki quota/lint baseline ko current fact mat samajhna.
4. Secrets server-side rahen. Client-side calculators ko unnecessary API dependency mat do.
5. Tool copy mein actual data source, sample/cap, freshness aur estimate limitations clear hon.
6. API quota aur external provider terms implementation ke waqt current official documentation se verify karo. Existing roadmap search-based tools avoid karta hai; Phase 6 mein feasibility decision resolve hone tak production search API add mat karo.
7. New SEO pages sitemap/canonical/internal links ke saath add hon. Registry count auto-derived rahe.
8. Numerical logic, API error handling aur data transforms par meaningful tests. Simple documentation/copy changes ke liye artificial tests nahi.
9. Code phase complete karte waqt `pnpm typecheck`, `pnpm build`, relevant tests aur lint check. Current lint baseline capture karo; old documents ke counts reuse mat karo.
10. Task tabhi `[x]` ho jab implementation aur listed checks complete hon. Local completion aur deployed verification separately record karo.

## 5. Phase-wise execution

### Phase 0 — Accuracy fixes aur baseline

Priority: P0. Dependency: none.

- [x] **0.1 Fix Live Earnings Calculator total.** Shared calculation sums the three displayed creator-revenue components; the gross Super Chat input gets the estimated 70% share in both card and total.
- [x] **0.2 Clarify input meaning.** Gross Super Chats, monetized playbacks and assumed $3.50 per new member are now stated in fields, result and tool copy.
- [x] **0.3 Fix blog sitemap freshness.** Sitemap uses `post.dateModified ?? post.publishedAt`; existing blog metadata already uses that fallback. No date was invented for an article.
- [x] **0.4 Capture production baseline.** Homepage, tool, blog, robots and sitemap reached; mobile calculator form/result and current production bug verified. See baseline below.
- [x] **0.5 Record measurement availability.** No Search Console or analytics dashboard data available in this workspace; no traffic/error counts reported. Public homepage HTML did not show GTM, PostHog or Vercel Analytics tags, which does not prove no external measurement exists.

Key files:

- `src/app/(tools)/youtube-live-earnings-calculator/client.tsx`
- `src/content/tool-seo/youtube-live-earnings-calculator.tsx`
- `src/app/sitemap.ts`
- `src/content/blog/posts.ts`

Done checks:

- [x] Model example: 1,000 monetized playbacks, $10 CPM, $100 gross Super Chats, 2 members = $5.50 ads + $70 chats + $7 memberships = **$82.50**. Unit test verifies component/total agreement. This verifies internal consistency, not official payout accuracy.
- [x] Zero, decimal money, negative and fractional-count inputs covered by focused tests; UI requires whole-number playbacks and members.
- [x] Sitemap source uses modified date where supplied and falls back to published date; build and typecheck pass.

Production baseline captured before deployment on 29 September 2026:

| Check | Observation |
|---|---|
| Origin | `https://www.yttools.pro/`; homepage, calculator and blog return HTTP 200 with matching `www` canonicals |
| Crawl endpoints | `/robots.txt` and `/sitemap.xml` return HTTP 200; robots points to `https://www.yttools.pro/sitemap.xml` |
| Sitemap | 188 `<loc>` URLs, all on `https://www.yttools.pro`; home, blog and Live calculator included |
| Desktop calculator result | Entering 1,000 views, $10 CPM, $100 Super Chats and 2 members yields old production total **$112.50**, while cards show $5.50 + $70 + $7 = **$82.50** |
| Mobile | 390 × 844 viewport: calculator form, calculate button and result cards render without visible horizontal overflow; current production math discrepancy remains |
| Measurements | No Search Console/analytics dashboard access from current workspace; impressions, clicks, usage and error rate unavailable |

Local verification: focused Vitest **8/8** passed (calculator cases plus tool freshness registry); TypeScript typecheck passed; touched-file ESLint passed; production build exited 0. First sandbox build was blocked fetching Google Fonts, then a network-enabled build succeeded. Build logged rankings/Upstash `DYNAMIC_SERVER_USAGE` fallback messages; Phase 0 changed no rankings code. Live production remains unchanged until deployment.

Local `.env.local` points at `localhost:3000`, so the local build's generated sitemap contains localhost URLs; the separately checked public production sitemap contains only `https://www.yttools.pro` URLs. Keep the production `NEXT_PUBLIC_SITE_URL` setting aligned with that public origin during any deployment.

### Phase 1 — Tools discovery aur blog trust

Priority: P1. Dependency: Phase 0 baseline.

- [x] **1.1 Build `/tools`.** Registry-driven all-tools directory with search, category filters, tool counts and useful empty state.
- [x] **1.2 Keep links crawlable.** Initial HTML contains tool names and normal links; search/filter enhances that catalog.
- [x] **1.3 Connect navigation.** Header/footer/homepage se directory link; existing homepage tools section working rahe.
- [x] **1.4 Improve aliases.** Search terms such as description viewer, comment finder and thumbnail viewer existing relevant tools tak le jayen.
- [x] **1.5 Expand homepage suggestions.** Existing URL detection flow mein relevant tools surface karo; har tool blindly show mat karo.
- [x] **1.6 Add visible authorship.** Editorial-team byline, team/methodology background and actual published/modified dates. Reviewer credit sirf real reviewer ho tab add karo; credentials invent nahi kiye.
- [x] **1.7 Add blog categories.** Existing 15 guides ko SEO, transcripts, monetization, creator workflow aur thumbnails mein group kiya. Dedicated troubleshooting category tab add hogi jab uske liye distinct guide ho; empty category landing page publish nahi ki.

Likely files: new `src/app/(site)/tools/page.tsx` and directory client, `src/components/home/url-search-box.tsx`, navigation components, `src/content/blog/posts.ts`, blog templates, `src/content/geo-pages.ts` or sitemap registration.

Done checks:

- [x] Directory renders every currently registered tool once; count automatically follows registry (60 unique links in server-rendered HTML).
- [x] Search/category controls keyboard aur mobile par usable; no-results state clear. Mobile accessibility tree, alias search, category count and reset checked locally.
- [x] Canonical and sitemap include `/tools`; important tool links work without searching. Local canonical follows local `.env.local` origin.
- [x] Existing deep links still pass `?url=` correctly; suggested destinations accept the existing query parameter.

Local verification: focused Vitest **10/10** passed (tool search, SEO schema and freshness); TypeScript typecheck, touched-file ESLint and production build passed. Server-rendered `/tools` HTML contains all 60 unique tool links; browser checks covered alias results, no-results reset, category filter, blog group links and visible article byline. Build logged existing rankings/Upstash dynamic warnings. Deploy and production smoke check remain pending.

### Phase 2 — Comment Sentiment Analyzer

Priority: P1. Dependency: existing comments service + Phase 0 checks.

Proposed route: `/youtube-comment-sentiment-analyzer`.

- [x] **2.1 Set bounded MVP scope.** Video URL → capped comment sample → sentiment percentages, recurring themes, representative comments.
- [x] **2.2 Reuse retrieval carefully.** Added validated `limit=1..2000` to comments API and a size-aware cached shared retrieval service. Analyzer loads up to 40 comments; exporter still defaults to 2,000.
- [ ] **2.3 Choose classification method using fixtures.** Existing Gemini/OpenRouter infrastructure is used with bounded prompt/output and existing AI request throttling. Representative English/Hindi/Hinglish fixture quality and provider-cost review remain before release; language limitations are stated instead of claiming proven accuracy.
- [x] **2.4 Treat comments as untrusted data.** Only sampled comment text is sent for classification; comments are framed as untrusted data, text/output are capped, strict JSON is validated, and no tools are available to the model.
- [x] **2.5 Show sample context.** Number analyzed, fetch/run time, relevance-order sample/cap and unavailable/deleted-comment limitations are shown. Copy says percentages describe this sample, not every viewer.
- [x] **2.6 Handle uncertainty.** Mixed/unclear labels, visible provider failure and an empty state without a sentiment score are implemented. Sarcasm and language limitations are explicit.
- [x] **2.7 Add useful handoff.** Links connect Comment Exporter, Video Ideas Generator and Hook Generator; copy/download summary added.

Done checks:

- [x] Empty comments, disabled comments, API failure and capped samples handled in the response/UI.
- [x] Counts reconcile; whole-number percentages use remainder allocation and total exactly 100% for a non-empty sample.
- [ ] Evaluate negation, sarcasm, mixed-language and emoji cases; limitations are documented, but fixture quality review remains pending.
- [x] Cache key includes video ID, sample size and classifier version/config; successful analyses and size-matched comment fetches cache for 30 minutes when Redis is configured.

Local implementation note: No automated or provider-backed sentiment quality tests were run in this phase. Review representative fixtures and confirm runtime/provider behavior before production release.

Release gate discovered during Phase 6: YouTube's current derived-metrics policy lists viewer sentiment analysis as an allowed example only subject to accepting its Developer Policy amendment and using an Analytics & Reporting use case. Confirm the Google Cloud project's acceptance and retention requirements before releasing this API-derived sentiment feature.

### Phase 3 — Combined creator income calculator

Priority: P1. Dependency: Phase 0 numerical consistency fix.

Proposed route: `/youtube-creator-income-calculator`.

- [x] **3.1 Define explicit inputs.** Monthly views + user RPM, sponsorship deal count + fee, affiliate clicks + conversion rate + commission. Optional memberships/merch only if their costs/cuts are clear; neither is included in this MVP.
- [x] **3.2 Make calculations transparent.** YouTube RPM-based revenue = matched views / 1,000 × RPM; sponsorship = deals × fee; affiliate = clicks × conversion fraction × commission. The RPM line is not labeled ad-only because YouTube RPM may include Premium, memberships and fan funding.
- [x] **3.3 Keep gross/net meanings consistent.** Do not apply another platform cut to an RPM already representing creator revenue; distinguish revenue from profit.
- [x] **3.4 Add monthly/yearly projections and scenarios.** Yearly = monthly × 12 with constant-input assumption stated. Low/base/high scenarios are editable assumptions; Low and High copy Base without automatic adjustments.
- [x] **3.5 Avoid unsupported defaults.** Subscriber count alone does not assert sponsorship income. Country/niche presets are omitted.
- [x] **3.6 Link calculators together.** Money, RPM, Shorts and Live tools explain when to use each.

Done checks:

- [x] Formula example: 100,000 monthly views × $2 RPM = $200; 2 deals × $300 = $600; 1,000 clicks × 2% × $5 = $100; total **$900/month**, **$10,800/year** under unchanged assumptions.
- [ ] Zero/negative/decimal/percentage boundaries runtime-tested; client validation and component math are implemented, but no tests/check commands were run during this implementation turn.
- [x] Client-only calculation; no unnecessary API request or claim of actual channel earnings.

Release gate discovered during Phase 6: YouTube's current derived-metrics policy lists financial projections as an example only subject to accepting its Developer Policy amendment and using an Analytics & Reporting use case. Confirm the Google Cloud project's acceptance before releasing this API-derived projection feature.

### Phase 4 — Improve existing metadata workflows

Priority: P2. Dependency: Phase 1 discovery.

- [x] **4.1 Upgrade Video Statistics.** Expose available IDs, description, thumbnail, category ID, tags, duration, counters and explicit missing-counter states.
- [x] **4.2 Add JSON export.** Download the exact public service response fields and document their names/types in API docs.
- [x] **4.3 Improve date display.** Show the exact public publication timestamp in local time and UTC, with an ISO copy action; explain it may differ from the original upload time.
- [x] **4.4 Assess a shared Metadata Viewer.** No separate route added: Video Statistics now provides detailed per-video public metadata and export, while Channel Statistics remains the distinct channel-level workflow. Reassess only if a combined video/channel detector adds a materially different task.
- [x] **4.5 Improve comment discovery copy.** Search field now names its loaded sample; UI, page copy and FAQ state the 2,000 top-level comment cap and sample-only search/export behavior.

Done checks:

- [x] JSON export mirrors the endpoint response; the public fields and availability flags are documented.
- [x] Missing counters have explicit unavailable states; missing/private/deleted videos retain the API's “not found, may be private or deleted” error.
- [ ] Existing Video Statistics and Channel Statistics behavior confirmed end-to-end; runtime/browser verification remains pending.

Local implementation note: No automated tests, browser checks, typecheck or build were run in this turn. Source/diff review only; verify the existing stats workflows and response shape before release.

### Phase 5 — Useful content and repeat visits

Priority: P1 for content; P2 for newsletter. Can start after Phase 1 and continue alongside Phases 2–4.

- [x] **5.1 Audit overlap first.** Checked all 15 pre-existing guides. The transcript article already handles caption availability; the new comment-export, channel-ID, publication-time, sentiment-interpretation and income-planning topics answer separate questions.
- [x] **5.2 Publish a focused first batch locally.** Added five registered guides for those distinct topics. Routes inherit the blog canonical, BlogPosting metadata, visible byline and sitemap entry from the existing blog system. Production publishing is still pending deployment.
- [x] **5.3 Add first-hand evidence.** Added original worked examples and tool-specific methodology, cited official YouTube references where relevant, and used the existing visible editorial-team author/date. Examples are labelled illustrative; no independent reviewer or user-result screenshots are claimed.
- [x] **5.4 Connect content and tools both ways.** Each guide points to its matching workflow, and relevant tool pages link back to the guide. Removed cross-links that did not fit the article topic.
- [ ] **5.5 Add newsletter only after provider setup.** Clear subscription purpose, consent/unsubscribe and confirmed persistence/delivery. Do not ship a success toast with no working subscription.
- [ ] **5.6 Add real social proof when available.** Ask real users for permission to publish feedback; link a verifiable example where possible.

Done checks:

- [x] Each article solves a distinct problem and has a relevant next action.
- [x] Sources and claims reviewed; dates reflect the local publication date. No reviewer credentials or customer outcomes were invented.
- [ ] Subscription tested end-to-end before enabling publicly; unavailable provider leaves task pending.
- [x] No fabricated testimonials, user counts or author credentials.

Local implementation note: No newsletter delivery/persistence provider or permissioned customer quotes were found in the project, so 5.5 and 5.6 remain pending. New articles use official YouTube sources, original clearly-labeled examples, tool methodology and the existing editorial-team byline. Content has not been deployed or independently runtime-validated.

### Phase 6 — Research-dependent features

Priority: P2. Dependency: current provider/quota evidence and an explicit recorded implementation decision.

- [x] **6.1 Rank checker feasibility — NO-GO for this release.** The official default is a separate 100-call/day `search.list` bucket; each page is another call and returns up to 50 results. Existing project calls shared that bucket but were not tracked. A rank lookup would spend at least one call/query and must share the allowance with existing channel workflows. Actual project quota in Google Cloud Console was unavailable in this workspace.
- [x] **6.2 Conditional rank checker decision.** Do not build until the owner verifies the API project's actual Search Queries allowance and accepts the current Developer Policy amendment for Analytics & Reporting. Search results are region/language context dependent; a position in a bounded API result set would not represent every viewer's YouTube ranking, and results beyond the scanned pages are unknown.
- [x] **6.3 Dislike-estimate feasibility.** Return YouTube Dislike documents `/votes?videoId=…`, third-party use with attribution, and limits of 100 requests/minute and 10,000/day per client. Its FAQ describes a blend of archived/scraped data and extension-user vote estimates, with updates around every 2–3 days. Coverage and exact accuracy are not guaranteed; a missing record must stay unavailable.
- [x] **6.4 Conditional dislike checker MVP.** Added `/youtube-dislike-checker`, clearly labels the provider value as an estimate, links the source/method, shows unavailable states instead of zero, caches provider responses for six hours, and applies stricter app-level request guards (80/minute and 8,000/day when shared Redis is available). The video ID is sent server-side to the provider and is disclosed in the Privacy Policy.
- [x] **6.5 Channel Search / URL Finder feasibility — NO-GO for general search.** `channels.list` resolves known IDs/handles cheaply, but an open-ended channel-name search needs the same scarce `search.list` bucket. The existing Channel ID Finder already resolves handles and legacy channel URLs without adding a general search page.

Done checks:

- [x] Recorded go/no-go decisions with official quota/policy evidence and provider rate/cache assumptions.
- [x] Rank Checker and general Channel Search remain conditional no-go decisions until quota and policy acceptance are verified.
- [x] The dislike checker validates provider response IDs/counts, distinguishes missing estimates from zero, handles upstream throttling/errors and shows that provider refresh age may differ from retrieval time.

Local implementation note: Search-list quota calls are now reserved in a separate Pacific-time Redis counter, defaulting to the documented 100/day and allowing an explicit environment override only to match a quota granted in Google Cloud. Channel Statistics and Channel Tags now use each channel's uploads playlist when available, avoiding unnecessary search-bucket requests. Redis outage handling remains best-effort; Google's own quota enforcement still applies.

### Phase 7 — Optional backlog, choose using evidence

User requested Phase 7 before production release/measurement of earlier phases. This is a **local implementation**, not evidence of search demand or a deployed release. Select low-dependency items now; preserve the gates on integrations and claims we cannot verify.

- [x] **Live Like Counter:** `/live-like-count` reuses the existing 60-second cached video-statistics snapshot and poll cadence. Missing public like or comment fields now display **Unavailable**, not zero; the cache key was versioned so old snapshots do not lose those flags. Quota-pause state and fetched time are shown.
- [x] **Channel upload history:** `/channel-upload-history` reads the channel uploads playlist in 25-item pages, up to four pages (100 entries) per session. Input accepts a UC channel ID or @handle. It does not claim private, deleted or complete historical coverage. The API also enforces page 0–3 and validates pagination input. Each page uses `channels.list` and `playlistItems.list`; this is on-demand, not background crawling.
- [x] **URL inspector:** `/youtube-url-inspector` parses video, channel and playlist links locally, labels UC IDs vs handles vs legacy names, extracts identifiers and gives tracking-free normalized links. Shared parser now rejects non-YouTube/lookalike hosts; parsing does not verify resource existence.
- [x] **Tap tempo:** `/youtube-tap-tempo` calculates BPM from up to eight recent tap intervals, restarting after a >2-second pause. No audio upload or automatic analysis claim.
- [x] **Deleted-video archive discovery — deferred:** no verified archive provider, coverage statement or retention agreement exists in this project. A third-party match would never guarantee recovery; do not launch a finder until a source and its reliability can be shown.
- [x] **Creator reply drafting — deferred:** existing AI tools do not establish demand for a reply workflow. Review actual search/tool usage and define comment privacy plus quality checks before adding generation.
- [x] **Music discovery — deferred:** no maintained track-level source and license ledger exists. Do not label tracks safe or royalty-free without current, per-track terms and attribution requirements.
- [x] **Contributor guidelines — deferred:** no named editorial review/ownership process exists. Add an intake page only once submissions can be reviewed and responded to.
- [x] **Visibility/access diagnostics — deferred:** public Data API results can show whether a public video was returned, but cannot prove a shadowban or grant private/deleted access. Revisit only with a narrowly defined observable diagnostic and clear limitations.

Local acceptance at Phase 7 close: all 75 tests, TypeScript typecheck and targeted ESLint passed. A normal production build was blocked by the restricted environment's inability to fetch Google Fonts (`Geist Mono` and `Instrument Sans`); deployment and real API-key data remain unverified. The follow-up release check below validates the rest of the build offline.

### Phase 8 — Release readiness and measurement

This is the next gate after the feature backlog, not another batch of speculative tools.

- [x] **Safe error logging:** build-time YouTube/Redis errors previously printed upstream request objects, which can include API keys in URLs. Ranking, snapshot, general API and AI fallback logs now omit messages/URLs and emit only safe error codes/status. Added a regression test. A key that appeared in a shared build transcript should be rotated by its owner.
- [x] **Offline production compile:** `next build --webpack` passed with Next's temporary local Google-font mock and empty YouTube/Redis credentials. The mock was removed after validation; it was never a product-font change. This establishes application compile, TypeScript and static page generation, but does not validate the default Turbopack build with real Google font downloads.
- [x] **Local HTTP smoke:** all four Phase 7 pages, `/tools` and `/sitemap.xml` returned 200; sitemap contained all four URLs. Invalid Channel Upload History and Live Views requests returned 400.
- [x] **Mobile browser smoke:** at 390px, verified URL lookalike rejection and clean link, channel input validation, tap/reset BPM interaction and Live Likes form state.
- [x] **Normal production build:** the default Turbopack `next build` passed with network access and real Instrument Sans / Geist Mono font downloads. YouTube/Redis credentials were cleared for build-time static generation to keep the check deterministic.
- [x] **Live API-key smoke:** the built local server, using its configured credentials, returned a public video likes snapshot with `likeCountAvailable: true` and two requested upload-history pages with 25 entries each and valid next-page tokens. This verifies the happy path; unavailable-likes and upstream-failure states remain covered by code/unit checks, not a live provider fixture. The channel lookup now also records its 1-unit API call in the best-effort quota counter, so each history page accounts for both reads.
- [ ] **Deploy and measure:** after review of this combined uncommitted Phase 0–8 workspace, deploy through the project's normal release process, verify canonical/sitemap/robots and tool completion/errors, then record search impressions and directory-to-tool visits after enough traffic accumulates. No traffic uplift is assumed.

## 6. Release and measurement

Recommended order: **Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4**. Phase 5 content can run alongside tool work. Phase 6 is conditional; Phase 7 optional.

After each released phase, record:

| Measure | How to interpret |
|---|---|
| Tool completion/error rate | Did real users get a usable result? |
| API/provider usage | Is cost acceptable for successful results? |
| Directory-to-tool visits | Does discovery help people find the right tool? |
| Search impressions/clicks by page | Are new pages being discovered? Indexing/traffic not guaranteed |
| Article-to-tool clicks | Is content helping the intended workflow? |
| Return visits/subscriptions | Is repeat usage improving, where measurement is available? |

Review a few weeks after release and adjust priorities to observed results. Do not promise a percentage traffic increase without evidence.

## 7. Source register

Competitor public pages inspected during the audit:

- [Homepage: testimonials, primary navigation, contributor link](https://youtubetoolkit.com/)
- [Tools directory: advertised tool coverage](https://youtubetoolkit.com/tools)
- [Blog index: article coverage, author/category labels, subscription form](https://youtubetoolkit.com/blogs)
- [Comment Sentiment Analyzer](https://youtubetoolkit.com/tools/comment-sentiment)
- [Advanced Money Calculator](https://youtubetoolkit.com/tools/advanced-money-calculator)
- [Rank Checker](https://youtubetoolkit.com/tools/rank-checker)
- [Dislike Checker](https://youtubetoolkit.com/tools/dislike-checker)
- [Metadata Viewer](https://youtubetoolkit.com/tools/metadata-viewer)
- [BPM Finder](https://youtubetoolkit.com/tools/bpm-finder)
- [Deleted Video Finder](https://youtubetoolkit.com/tools/deleted-video-finder)
- [Google: helpful content and accurate authorship guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [YouTube Data API `search.list` reference and page size](https://developers.google.com/youtube/v3/docs/search/list)
- [YouTube `channels` resource and uploads playlist](https://developers.google.com/youtube/v3/docs/channels)
- [YouTube `playlistItems.list` pagination, 50-item maximum and quota cost](https://developers.google.com/youtube/v3/docs/playlistItems/list)
- [YouTube `videos` resource public statistics](https://developers.google.com/youtube/v3/docs/videos)
- [YouTube Data API quota buckets and per-request costs](https://developers.google.com/youtube/v3/determine_quota_cost)
- [YouTube additional policies for derived metrics](https://developers.google.com/youtube/terms/derived-metrics-policy)
- [YouTube announcement about private dislike counts](https://blog.youtube/news-and-events/update-to-youtube/)
- [Return YouTube Dislike API use, attribution and limits](https://github.com/Anarios/return-youtube-dislike/blob/main/README.md)
- [Return YouTube Dislike data/methodology FAQ](https://github.com/Anarios/return-youtube-dislike/blob/main/Docs/FAQ.md)
- [Return YouTube Dislike security/privacy FAQ](https://github.com/Anarios/return-youtube-dislike/blob/main/Docs/SECURITY-FAQ.md)

Local evidence anchors:

- Tool inventory: `src/content/tools-metadata.ts`
- Blog inventory: `src/content/blog/posts.ts`
- Blog presentation: `src/app/(site)/blog/page.tsx`, `src/app/(site)/blog/[slug]/page.tsx`
- SEO: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo/schema-graph.ts`
- Additional content routes: `src/content/geo-pages.ts`
- Homepage discovery: `src/components/home/tools-grid.tsx`, `src/components/home/url-search-box.tsx`
- Existing comment search/export: `src/app/(tools)/youtube-comment-exporter/client.tsx`
- Comments fetching/cap: `src/app/api/youtube/comments/route.ts`
- Earnings mismatch: `src/app/(tools)/youtube-live-earnings-calculator/client.tsx`
- Search-bucket accounting: `src/lib/youtube/quota.ts`, `src/lib/youtube/client.ts`
- Third-party dislike estimate: `src/lib/third-party/return-youtube-dislike.ts`, `src/app/api/youtube/dislike-estimate/route.ts`

## 8. Progress log

| Date | Work | Status |
|---|---|---|
| 2026-09-29 | Competitor public-page comparison + local code inspection | Findings recorded; live/performance limitations above |
| 2026-09-29 | Phase-wise implementation roadmap | Document created; implementation pending |
| 2026-09-29 | Phase 0 calculator and sitemap fixes | Implemented locally; tests, typecheck, targeted lint and build passed; deployment pending |
| 2026-09-29 | Phase 0 production baseline | HTTP/canonical/robots/sitemap and desktop/mobile calculator checked; traffic dashboards unavailable |
| 2026-09-29 | Phase 1 tools discovery and blog trust | Implemented locally; tests, typecheck, targeted lint, build, HTML and browser checks passed; deployment pending |
| 2026-09-29 | Phase 2 comment sentiment MVP | New bounded analyzer, shared size-aware comment cache, result UI, metadata, directory/home suggestions and cross-links implemented locally; release validation pending |
| 2026-09-29 | Phase 3 creator income calculator | Calculator, editable scenarios, SEO page, directory/search/sitemap registration and related-tool links implemented locally; runtime validation and deployment pending |
| 2026-09-29 | Phase 4 metadata workflows | Video Statistics fields, unavailable states, exact local/UTC publication timestamp, copy and JSON export; API docs and Comment Exporter sample-bound search copy updated. Separate Metadata Viewer deferred after scope assessment; runtime validation pending |
| 2026-09-29 | Phase 5 content and cross-linking | Audited the existing 15 articles, added five distinct sourced guides, linked related tools in both directions and synchronized affected page metadata dates. Newsletter/social proof and production deployment remain pending; verification beyond source review is pending |
| 2026-09-29 | Phase 6 search-quota decisions and dislike estimate tool | Recorded rank/channel search no-go gates from current YouTube quotas and derived-metrics policy; added separate search-call accounting and playlist-based recent uploads; shipped a locally registered, attributed Return YouTube Dislike estimate checker with cache, global guards, privacy disclosure and failure/cache tests. All 70 tests, TypeScript typecheck and targeted ESLint passed. Production build was attempted but could not fetch Google Fonts in the restricted network. Google Cloud quota/policy acceptance and production deployment remain pending |
| 2026-09-30 | Phase 7 optional backlog | Four low-dependency tools implemented locally: Live Like Count, bounded Channel Upload History, URL Inspector and Tap Tempo. Five integrations/claims deferred with explicit gates above. 75 tests, typecheck and targeted lint passed; normal production build blocked on Google Fonts network fetch |
| 2026-09-30 | Phase 8 local release gate | Credential-safe error logs and regression test; 76 tests, typecheck, lint, offline webpack and normal real-font Turbopack production builds, local HTTP and 390px browser smoke, and public likes/two-page upload API smoke passed. Deployment and post-release measurement pending |
