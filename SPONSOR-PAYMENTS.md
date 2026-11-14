# Dodo sponsor payment integration

Sandbox checkout and webhook were proven locally on 14 November 2026. The selected $10 offer and explicit live-mode code path are implemented locally. **Payment code is not deployed; production payments and public bookings remain disabled.**

## Selected launch offer

- YT Toolkit is a YouTube creator toolkit; pricing is based on this audience and placement, not PDF-tool advertising comparisons.
- One-time **$10 USD for 30 days**, the same flat price for a Standard or Featured homepage space. No automatic renewal.
- Creative remains manually reviewed. Approval holds a selected slot for 24 hours; a settled payment is required for a paid placement.
- This is the approved introductory price. Measure actual impressions and clicks before changing it.
- The public sponsor page may show this offer, but online checkout and new booking submissions remain closed until production setup is complete.

## Implemented

- Owner-authenticated, same-origin `POST /api/admin/sponsors/checkout` accepts only an approved booking ID. Product, price and duration never come from the browser.
- Dodo `test_mode` or `live_mode` is selected only from the server environment; requests cannot choose a mode. Production `SPONSOR_PAYMENT_ENABLED` stays `false` until live credentials, product, webhook, branding and launch terms are ready.
- The sandbox checkout must use a fixed, tax-inclusive USD 10.00 one-time product, mirroring the selected launch offer. Successful tests get a 30-day sandbox activation and never publish a public ad.
- Owner queue shows sandbox payment status and can open the existing hosted checkout. Share/send delivery is manual; no emails are sent automatically.
- `POST /api/sponsorship/webhook` verifies the original body with Standard Webhooks, including timestamp/signature checks. It retrieves the payment from the mode-specific Dodo API and checks status, attempt metadata, booking, checkout session, product, quantity, amount and currency.
- D1 stores checkout intent before the provider call. Concurrent/repeated requests cannot create another checkout for the booking. A network timeout leaves the attempt blocked for manual provider reconciliation rather than silently creating a second payment path.
- Activation and durable event deduplication commit together. Duplicate success events cannot extend the display term. Late payments go to owner review and cannot reclaim a released slot.
- Sandbox activations use `paid_test`; public sponsor listing and public logo handlers always exclude them. Verified live payments use `paid_live` and may publish the placement for the paid term. Existing complimentary placements still work. Refund/dispute notifications end paid placements and flag their payment for review.
- Once payment intent exists, complimentary activation is blocked to prevent mixed payment/fulfillment paths.
- `/sponsor/payment` never trusts redirect query parameters as proof of success and clearly explains that sandbox payments do not publish ads.

## Local configuration required

The connected Dodo account is in test mode. The connector can inspect/create test products and sessions, but does not supply an API key/signing secret to the application runtime.

Add the following to **ignored `.dev.vars`**, preserving the existing local owner key:

```dotenv
SPONSOR_PAYMENT_ENABLED=test
DODO_SPONSOR_TEST_PRODUCT_ID=pdt_0NrwUh6XIHlURylmHKALT
DODO_PAYMENTS_API_KEY=<Dodo test API key>
DODO_PAYMENTS_WEBHOOK_KEY=<test endpoint signing secret>
```

All four settings are now configured locally. The user's test API key was verified and the webhook signing secret was saved directly by the setup script, without printing it. Never commit secrets or paste them into chat. Production `wrangler.jsonc` explicitly keeps both bookings and payments disabled.

1. Local schema migrations `0002_test_payments.sql` and `0003_live_sponsorship.sql` have been applied. They preserve existing bookings, payment attempts, events and audit records. Neither has been applied remotely.
2. Start the local app with bindings: `$env:SPONSORSHIP_LOCAL='1'; npm run dev -- --webpack --port 4180`.
3. In Dodo's **test-mode** dashboard, create a webhook endpoint to a reachable HTTPS development/staging URL ending in `/api/sponsorship/webhook`, forwarding to this local app if using a tunnel. Localhost alone is not reachable from Dodo.
4. Subscribe to `payment.succeeded`, `refund.succeeded`, `dispute.opened`. Copy that endpoint's signing secret into `.dev.vars` and restart the local app. Do not use a live account or live card for sandbox verification.
5. Submit a synthetic local sponsor, approve it in the local owner panel, create/open its test checkout, complete a Dodo-documented test payment, and verify the actual webhook delivery and owner status. Confirm public homepage/logo APIs still hide the sandbox placement. End it afterwards.

## Verification completed

- 28 sponsorship integration tests pass, including the $10 price/30-day term, preserved migrations, explicit live-mode selection, public live fulfillment and sandbox isolation.
- TypeScript and changed-area ESLint pass after the live-mode changes.
- Production build passed, generating all 276 static pages. Existing rankings snapshot/history storage warnings were non-fatal.
- Real provider API smoke via the connected test account created a hosted checkout successfully: session `cks_0NrvRhojM5J1KOTlMAfYF`. It has no booking metadata and cannot activate a placement. No payment was completed for this smoke session.
- API evidence: [sandbox provider smoke](validation/sponsor-payment-provider-smoke.json).

## Real end-to-end verification completed

After the user supplied the test API key, the key successfully retrieved the sandbox product. A temporary Cloudflare HTTPS tunnel forwarded only the webhook route through a bounded local gateway; admin routes returned 404 and unsigned webhooks returned 401.

- Test webhook `ep_3M5zfMF6O0hTGxmmVfRlLap9Sdp` was created in the sandbox with the three required event filters. Its signing secret was saved directly into ignored `.dev.vars`.
- The earlier $1.00 sandbox checkout `cks_0NrvTi2Cuq0ZabT80UyCf` was completed with Dodo's documented successful sandbox card and synthetic billing/contact details.
- The approved $10.00, 30-day offer used test product `pdt_0NrwUh6XIHlURylmHKALT` and checkout `cks_0NrwWoFay1Ye5gMg2YndL`; sandbox payment `pay_0NrwWwn2BxNSlNs8ojCws` succeeded.
- The signature-verified webhook activated synthetic local booking `5a9ea3f9-aa14-4a8c-b034-994bb9d2c6f1` as `paid_test` for 2,592,000 seconds. Owner API confirmed amount 1000 USD, and public listing/logo checks kept it hidden; the placement was then ended.
- Payment `pay_0NrvTnUaMX0n6oXLr3vtL` settled through an actual provider-delivered, signature-verified webhook. The owner API reported `paid` and booking activation `paid_test`.
- The test placement stayed absent from public listing and public logo access returned 404. The placement was explicitly ended after verification.
- [Real application smoke report](validation/sponsor-payment-local-smoke.json).
- Temporary webhook `ep_3M6fKq82fclzISxWxYhIVmXu63u` was disabled after verification; its Cloudflare tunnel and narrow gateway were stopped. Its hostname is not a permanent production endpoint. The local development server remains available.

Re-run helper: `node scripts/configure-sponsor-test-webhook.mjs --check` validates the local API key. Start `node scripts/sponsor-webhook-gateway.mjs` and tunnel port 4181 with the official cloudflared binary; pass the new HTTPS URL ending `/api/sponsorship/webhook` to `configure-sponsor-test-webhook.mjs` to create the test endpoint and save its secret. Restart the app after changing the signing secret. `--disable` disables only the saved test endpoint. `verify-sponsor-payment-local.mjs prepare` creates a synthetic booking/checkout; `check` verifies settlement and ends it. Existing test state is retained in ignored `.wrangler/sponsor-test` to prevent accidentally duplicating a checkout.

Sources: [Cloudflare temporary tunnels](https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/), [Dodo documented test cards](https://docs.dodopayments.com/miscellaneous/testing-process).

## Before any production release

Before turning on production checkout:

1. Add Dodo live-mode values to ignored `.dev.vars` under separate names—`DODO_SPONSOR_LIVE_API_KEY`, `DODO_SPONSOR_LIVE_WEBHOOK_KEY`, and `DODO_SPONSOR_PRODUCT_ID`; keep the working sandbox credentials intact. Create a fixed $10 USD one-time live product and record its ID.
2. Set the Dodo merchant-facing brand to **YT Toolkit** (the connected test product currently displays UploadIQ). Dodo's [merchant acceptance policy](https://docs.dodopayments.com/miscellaneous/merchant-acceptance) allows some fixed, productised services after review but doesn't specifically describe website ad placements; confirm this sponsorship offer is eligible with Dodo compliance before live checkout.
3. Create a permanent HTTPS webhook at `https://yttools.pro/api/sponsorship/webhook` for `payment.succeeded`, `refund.succeeded`, and `dispute.opened`.
4. Upload `DODO_SPONSOR_LIVE_API_KEY` and `DODO_SPONSOR_LIVE_WEBHOOK_KEY` as Cloudflare Worker secrets; set `DODO_SPONSOR_PRODUCT_ID` and `SPONSOR_PAYMENT_ENABLED=live`, then deploy. Keep public booking closed until provider approval and the 30-day placement, manual creative review, cancellation/refund handling and support contact are explained in the terms/privacy notice.
5. Apply migrations `0002_test_payments.sql` and `0003_live_sponsorship.sql` before deploying the payment code. Verify the live checkout configuration, webhook signature, payment activation, public listing/logo, expiry and refund/dispute path. Do not create a real live charge as a test.

The approved offer is one-time **$10 USD for 30 days**, same price for Standard and Featured homepage spaces, with no auto-renewal. Live-mode code is implemented locally, but the available Dodo API credential is test-only; no live product, production webhook, live secret, remote payment migration or live checkout has been configured. Sandbox placements must never be renamed into live fulfillment records.

Owner review cases: a `creating` attempt after an ambiguous provider failure needs dashboard reconciliation; a `review` payment needs investigation. No automatic refunds are issued by this code. Do not delete attempt records and retry blindly.

Reference: [Dodo one-time payments](https://docs.dodopayments.com/features/one-time-payment-products), [Dodo webhooks](https://docs.dodopayments.com/developer-resources/webhooks).
