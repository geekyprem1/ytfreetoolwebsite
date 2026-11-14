# Sponsor booking backend

Implemented 14 November 2026. This is the request/review/inventory foundation; paid checkout and subscriptions are not connected.

## Provisioned resources

- D1: `yt-toolkit-sponsors`, binding `SPONSOR_DB`.
- Private R2: `yt-toolkit-sponsor-logos`, binding `SPONSOR_LOGOS`.
- Remote and local schema initialized with `migrations/sponsorship/0001_sponsorship.sql`.
- Production booking flag in `wrangler.jsonc` stays **false** until public policy and payment/release configuration are ready. Homepage and backend were deployed successfully on 14 November 2026; closed-booking behaviour was verified live.
- Existing cache bucket and other projects' databases/buckets are not reused.

## Local preview

Local D1/R2 storage is separate from remote production data. `.dev.vars` is ignored by Git and contains a generated local owner key plus `SPONSOR_BOOKING_ENABLED=true`. Never commit or paste that key into chat or URLs.

```powershell
$env:SPONSORSHIP_LOCAL='1'
npm run dev -- --webpack --port 4180
```

Use Webpack for this local binding preview: the Turbopack preview returned 404 for dynamic routes during validation. OpenNext's optional cache Durable Object may log a local emulation warning; sponsor storage uses D1/R2 and is verified separately.

- Public form: http://localhost:4180/sponsor
- Admin page: http://localhost:4180/admin/sponsors
- Local owner access key: value of `SPONSOR_ADMIN_TOKEN` in the local **ignored** `.dev.vars`. The admin page keeps it in memory only; refresh/sign-out clears access.
- Production uses a separate key configured as a Worker secret. Its private local copy is `.sponsor-production-owner.key`, also ignored by Git. Use that key only on the production admin page; never paste it into chat, source code or URLs.
- Applying local schema again: `npx wrangler d1 migrations apply yt-toolkit-sponsors --local`.

## Lifecycle and inventory

1. An available slot accepts a request with a PNG/JPG/WebP logo, brand, HTTPS URL, tagline and private contact details.
2. `pending` requests do **not** reserve inventory or guarantee a placement. Multiple requests can enter review for the same currently available slot.
3. Owner approval changes `pending → approved` and claims the slot for 24 hours. A D1 unique partial index prevents two approvals from holding it concurrently.
4. Paid activation is unavailable. An owner may explicitly mark a placement **complimentary**, choose an end date (within one year), and activate it. No payment is inferred or recorded.
5. `active → paused → active` preserves the original end date. Paused inventory stays held.
6. Owner can reject pending/approved requests or end approved/active/paused placements.
7. Expired approval holds/display periods are released on inventory/admin reads and before transitions. Public listing/logo handlers enforce timestamps even before cleanup. The homepage refreshes listings every minute and removes time-expired cards using a client timer.
8. Owner actions and submission create audit records. Admin transitions use conditional SQL and a transaction; rejected concurrent claims do not produce successful approval audit records.

## APIs

| Route | Access | Behaviour |
|---|---|---|
| `GET /api/sponsorship/availability` | Public | Slot IDs/kinds/availability and booking-enabled state |
| `POST /api/sponsorship/bookings` | Same-origin public form | Bounded multipart request; creates pending request |
| `GET /api/sponsors` | Public | Only active public creative fields, no contacts or storage keys |
| `GET /api/sponsors/:id/logo` | Public only for an active placement | R2 image served after status/date/slot checks |
| `GET /api/admin/sponsors` | Owner bearer key | Latest 100 requests with contact details |
| `POST /api/admin/sponsors` | Owner bearer key + same origin | Approve/reject/activate complimentary/pause/resume/end |
| `GET /api/admin/sponsors/:id/logo` | Owner bearer key | Private review image |

Logo requests use `no-store`, `nosniff` and a restrictive content security policy. Pending/paused/expired logos have no public access. R2 public hosting is not enabled. Upload size is bounded while reading; file signatures/MIME must match and SVG is rejected. D1 counters limit public submissions to five per IP-derived time bucket in 15 minutes; existing edge limits also apply. Admin access fails closed without a key of at least 32 characters. Secrets are hashed before constant-time comparison. Admin mutations require a matching Origin.

The upload checks validate signatures and size, not a full image decode/re-encode or moderation service. Owner review remains mandatory. There is no automatic email delivery, payment collection, receipt/invoice generation, advertiser login, future-date booking calendar or click/impression reporting in this release.

## Before production release

1. A **separate production** `SPONSOR_ADMIN_TOKEN` Worker secret was configured with the user's deployment authorization. Its local copy is in ignored `.sponsor-production-owner.key`. For future rotations use `wrangler secret put SPONSOR_ADMIN_TOKEN` without putting its value in a shell argument; do not run the setup helper over an existing secret without explicit rotation intent.
2. Verify account/CI token can access the newly provisioned D1/R2 bindings. Existing live Worker is unchanged until deployment.
3. Set `SPONSOR_BOOKING_ENABLED=true` in production configuration only when the owner can review requests and public sponsorship/privacy terms are ready.
4. The form stores private contact details and optional notes. Decide and document retention/deletion procedure before accepting real requests; avoid notes containing sensitive information.
5. Deploy through the existing master → GitHub Actions → Cloudflare pipeline. Schema is already initialized. Apply future D1 migrations before code that depends on them.
6. Check disabled/enabled form, owner authorization, public data privacy and an end-to-end complimentary placement after release using an explicitly labelled test creative.
7. Choose actual prices/currency/billing period, provider account and cancellation/refund terms before implementing paid reservations, payment webhooks or subscriptions. Current approval/complimentary actions must not be treated as proof of payment.

## Validation

```text
npx vitest run src/lib/sponsorship/sponsorship.test.ts
npm run typecheck
npx eslint src/lib/sponsorship src/app/api/sponsorship src/app/api/sponsors src/app/api/admin/sponsors src/app/sponsor src/app/admin/sponsors src/components/home/canvas-home.tsx src/components/home/public-sponsor.tsx next.config.ts
node scripts/verify-sponsor-local.mjs
npm run build
```

Integration tests use isolated, non-persistent local D1/R2 bindings (`tests/sponsorship/wrangler.jsonc`), never production data. The localhost HTTP smoke script uses synthetic example.com data and ends the local placement afterwards. It never prints the owner key.

Implementation references: [OpenNext bindings](https://opennext.js.org/cloudflare/bindings), [Cloudflare D1 database API and transactional batch](https://developers.cloudflare.com/d1/worker-api/d1-database/).

## Current verification status

- Nine isolated D1/R2 backend integration tests passed, including concurrent slot claims, authentication, private uploads, lifecycle/expiry and rate limiting.
- Local availability, public listing, sponsor form and admin page returned HTTP 200 after restarting the binding preview with Webpack. Production booking requests remain disabled.
- The pending localhost HTTP lifecycle smoke script passed on 14 November 2026 after the user resumed verification. Submit → approve → complimentary activation → pause/resume → owner end released the slot and removed public logo access. Unauthorized admin access returned 401; pending logos returned 404 and contacts stayed private.
- A second local placement was given an eight-second end time. Real clock expiry removed it from the public listing, made its logo return 404, released inventory and marked the request ended. Synthetic records remain ended in local storage; no remote production booking records were created.
- `npm run build` passed and generated all 275 static pages. Existing rankings snapshot/history storage warnings appeared without failing the build. ESLint passed for the extended smoke script.
- The earlier automatic approval-review usage-limit failure is resolved for these checks; it is no longer a pending verification blocker.
- Production owner-secret configuration, Cloudflare CI/adapter deployment and post-deploy smoke verification completed successfully on 14 November 2026. Public production bookings remain disabled.

## Production deployment — 14 November 2026

- Live homepage: https://yttools.pro/
- Sponsor form: https://yttools.pro/sponsor (requests disabled; creative preview available).
- Owner panel: https://yttools.pro/admin/sponsors. Use the production key from ignored `.sponsor-production-owner.key`; the local `.dev.vars` key is different.
- Application commit: `230d066d4d9e5afb2b1434c0707a7a2ce2e78298`.
- [Successful Cloudflare workflow](https://github.com/geekyprem1/ytfreetoolwebsite/actions/runs/43587781289): focused tests, Linux OpenNext build, Worker dry-run bundle and deploy all passed.
- Live smoke checks passed: homepage/canonical, sponsor and admin pages, representative tools, eight-slot D1 inventory, owner-key authorization, unauthorized admin denial, private contact protection and no-store owner response. Closed public submission was rejected without creating a production booking.
- Browser verified 67 homepage tool cards, the closed-booking notice, and no page overflow at tested desktop/mobile widths.
- Reproducible live check: `node scripts/verify-sponsor-production.mjs`; results in `validation/sponsor-production-smoke.json`. It does not print the owner key or create real sponsor bookings.
- No payment collection/subscriptions were enabled. Actual payment setup, advertiser terms and opening requests remain separate work.
