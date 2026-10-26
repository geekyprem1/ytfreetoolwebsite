---
format: 1920x1080
duration: 30s
message: "One paste gives you every YouTube tool — free, no login."
arc: pain hook → one-link turn → demo loop (paste to results) → breadth payoff → CTA
audience: YouTube creators (new and pro), plus SEO/marketing folks who work with video
mode: autonomous
music: driving upbeat electronic promo, clean synths, steady beat, confident, modern
---

## Video direction

- **Registers (broadside, brand-remixed).** Fire-orange `#FF3B30` = declarative frames (1, 4, 6) — type IS the motion, ink `#111827` on fire, no imagery. Ink-black `#111827` = documentation/demo frames (2, 3, 5, 7) — cream `#FFFFFF` text, fire-orange the lone accent, real captured material carried here. One register per frame; never mix grounds.
- **Product-UI rule.** Every reconstructed product surface (paste box, tool windows, rows) wears the site's REAL tokens — white `#FFFFFF` surface, 1px `#E5E7EB` border, 10px radius, ink `#111827` text, `#6B7280` muted, `#FF3B30` accent — the UI is the material; all frame chrome/type stays broadside (Geist Mono uppercase 0.14em tracked; 1px hairlines; 0 radius on frame chrome).
- **Motion grammar.** Smooth long-tail settles (`power3` default); reveals paced to the VO — at t=0 only what the VO says then; each further piece reveals on its spoken cue, across the back ~50%; never front-load. Fire frames move by type-swaps/count-ups; ink frames by element reveals. Camera static except F2's single soft push and F5's motivated journey legs. Scene windows are timed to the synced voice durations (26.9s cut).
- **Visible text rule.** On-screen text is hero words, stats, labels, chrome, and real UI copy only — the narration sentences live in the caption track and are NEVER printed as frame type. (F1 shows `tags.`→`titles.`→`thumbnails.`→`math.`; F6 shows `60`/`15`/`0`/`free` + mono labels.)
- **Stillness allocation.** F1 (final pile), F4 (after last check-flip), F6 (after the final line) and F7 (final lockup) hold still; the sanctioned residual motion on F7 is the caret blink.
- **Content continuity.** The sample URL `youtube.com/watch?v=vT8s2KqL9xQ` threads F2 → F3 → F5. Demo values appear ONLY in F5's pips, are unmistakably sample (mono `sample` chip alongside) and are placeholders supplied by this storyboard — never present them as product claims.
- **Caption band.** Keep all content in the top ~83% of the canvas (bottom ~184px reserved for the caption pill).
- **Negative list.** No slideshow (front-loaded-then-frozen), no screensaver float, no lazy breathing, no back-half drift on holds. No browser chrome (no macOS traffic lights, no scrollbars, no nav bars). No invented figures, percentages or dates anywhere — the only numerals allowed: 60, 15, 0 sign-ups, the real resolution tiers, transcript timestamps, and F5's flagged sample placeholders. No fabricated partner/tool logos.

## Frame 1 — four tabs

- scene: A creator's grind counted out in tabs — one word lands alone, then the tabs pile up
- voiceover: "One tab for tags. One for titles. One for thumbnails. One for the math."
- duration: 4.459s
- poster: 2.5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-four-tabs.html
- type: hook
- persuasion: Pain validation
- beat: frustration
- blueprint: kinetic-type-beats (Adapt)
- sfx: impact-bass-1
- asset_candidates:
- narrativeRole: Creates the tension the whole video resolves — four small jobs, four separate places. Sets up "or one link."
- keyMessage: Growing one video means juggling a stack of little jobs.

Adapt: keep the Problem-shape engine (a short statement landing solo on a bare canvas, replaced in place); the shot runs as a single-word token cycle — `tags.` → `titles.` → `thumbnails.` → `math.` — while a left rail of hairline "tab" cards physically accumulates the clutter the VO describes.

Scene 1 (0.0–1.1s): fire-orange field, one register, flat — huge lowercase Instrument Sans `tags.` hard-cut flashes in dead-center (`discrete-text-sequence`); mono chrome top-left flips to `01 / 04`; a first hairline mini-tab card drops into the left rail (`spring-pop-entrance`, low overshoot). Centered word carries ~55% of frame; rail at left edge, above the caption band.
Scene 2 (1.1–2.2s): on its cue, `titles.` replaces the word by hard cut (`discrete-text-sequence`) — same center anchor, nothing lingers; a second tab card stacks onto the rail; chrome counter reads `02 / 04`.
Scene 3 (2.2–3.3s): `thumbnails.` swaps in the same way; third card stacks; chrome `03 / 04`; the rail begins to crowd the left edge.
Scene 4 (3.3–4.46s): `math.` lands; the fourth card drops in and the four cards settle into a tight, slightly claustrophobic pile (`spring-pop-entrance` arrivals, then still) — word holds dead-center, pile holds at left, everything still. Hold to cut; no drift.

## Frame 2 — one link

- scene: The turn — one real paste box swallows the problem and answers with the whole toolkit menu
- voiceover: "Or one link. — YT Toolkit: sixty free YouTube tools, one search box."
- duration: 4.885s
- poster: 3.2s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/02-one-link.html
- type: product_intro
- persuasion: Friction reduction
- beat: relief
- blueprint: prompt-type-submit-generate (Adapt)
- sfx: pop, typing
- asset_candidates:
- narrativeRole: The promise lands by beat 2: everything this product is, reachable from one input.
- keyMessage: One search box is the whole product's front door.

Adapt: keep the search-affordance signature (query types live into the product's real input; the machine answers as you type; a confirming state settles); reproduce the site's REAL UrlSearchBox component — no submit button exists; the answer is the "DETECTED VIDEO" caption + five real tool rows.

Scene 1 (0.0–0.9s): ink field; the real paste box (white, 1px #E5E7EB, 16px radius, link icon left, placeholder "Paste YouTube URL...", 55% width, centered) springs in (`spring-pop-entrance`); nothing else on canvas — only what the VO says ("or one link.") has entered.
Scene 2 (0.9–2.2s): the sample URL `youtube.com/watch?v=vT8s2KqL9xQ` types character-by-character behind a blinking caret (`discrete-text-sequence` + `context-sensitive-cursor`); the placeholder clears; a very soft single push-in (≤1.06, on the root) rides the typing.
Scene 3 (2.2–3.7s): parse lands — mono caption "DETECTED VIDEO" rises under the box; the five REAL tool rows cascade in staggered (Thumbnail Downloader, Tags Extractor, Transcript Extractor, Subtitle Downloader, Video Statistics — hairline-divided rows, muted lucide icons, real names) (`spring-pop-entrance`, staggered group, slide-up + fade) as the VO says "sixty free YouTube tools".
Scene 4 (3.7–4.89s): on "one search box" — an accent highlight fills the "Tags Extractor" row (fire-orange text + hairline emphasis) and holds; camera settles; still to cut.

## Frame 3 — tags and transcript

- scene: The extractor's real window works the sample URL — tags cascade, then the transcript streams
- voiceover: "Paste a video. Pull every tag. Read the whole transcript."
- duration: 3.392s
- poster: 3.2s
- transition_in: crossfade
- status: animated
- src: compositions/frames/03-tags-transcript.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: clarity
- blueprint: device-surface-showcase (Adapt)
- focal: assets/scroll-036.png
- roles: scroll-036 = supporting (left index rail, full-strength crop, never dimmed)
- sfx: whoosh
- asset_candidates: assets/scroll-036.png — real Extractors rows plate (Tags Extractor, Channel Tags, Transcript Extractor…), full-strength vertical crop used as the left index rail
- narrativeRole: Proves the paste actually pays off — the tag pull and the transcript are the first evidence beats.
- keyMessage: The tools do the tedious work instantly.

Adapt: keep the surface-hero + screen-cycling signature; the surface is the site's real card style (no macOS window chrome); two screen states (tags → transcript) in ~1.3s each.

Scene 1 (0.0–0.7s): ink field; left rail = the real scroll-036 plate cropped to a tall strip and masked-slid in at full strength (`gsap-effects` masked slide) — the Extractors index; the white tool window (real tokens, 60% width, right of center) drifts in with a slight tilt that settles flat; header shows "Tags Extractor" + the same sample URL in the input. Static camera from here.
Scene 2 (0.7–2.0s): on "Pull every tag." — tag chips cascade into the window body in a staggered grid — 12 neutral demo chips (`youtube seo`, `video editing`, `grow a channel`, `youtube shorts`, `thumbnail design`, `monetization`, `content strategy`, `video ideas`, `youtube algorithm`, `channel growth`, `youtube tips`, `creators`) — small hairline chips, each landing in its own beat; the last three land slightly apart so the eye finishes the cluster.
Scene 3 (2.0–3.0s): on "Read the whole transcript." — the body scale-swaps to the transcript state (`scale-swap-transition`, same center); timestamped lines stream in top-down (mono timestamps `00:00` `00:12` `00:28` `00:41` left, short readable demo lines right, no figures); content translates gently inside the clipped window as lines fill (`gsap-effects` translate, clipped, `data-layout-allow-overflow`).
Scene 4 (3.0–3.39s): hold — the stream stops on the final line; its caret blinks (`context-sensitive-cursor`); no camera drift.

## Frame 4 — generated

- scene: The AI rows arrive under a working state — titles, descriptions, hooks — each row checking off as it lands
- voiceover: "Titles that get clicked. Descriptions that rank. Hooks that hold."
- duration: 3.648s
- poster: 3.4s
- transition_in: cut
- status: animated
- src: compositions/frames/04-generated.html
- type: feature_showcase
- persuasion: Feature-to-benefit translation
- beat: confidence
- blueprint: agent-progress-theater (Adapt)
- sfx: sparkle
- asset_candidates:
- narrativeRole: The AI does the writing work — shown as working-state theater, not a bullet list.
- keyMessage: The generators write clickable titles, descriptions and hooks.

Adapt: keep the trigger→working→receipt signature and the badge state-mutation; the receipt is flat ink rows on fire (no white cards); it opens mid-work (already-generating variant).

Scene 1 (0.0–0.7s): fire field; mono chrome "AI GENERATORS · 13 TOOLS" top-left; a working couplet holds center — ink label "writing titles…" with a white rotating asterisk spinner (`svg-icon-enrichment`, finite, timeline-driven) and a single shimmer sweep passing through the label.
Scene 2 (0.7–1.7s): on "Titles that get clicked." — four title rows cascade in (slide-up + fade, `spring-pop-entrance` staggered) on hairline rules, each with a small numbered outline badge; sample row text (no figures): "How I Grew My Channel With Shorts", "The Editing Trick Nobody Told Me", "Why Your First Videos Flopped", "Stop Uploading at the Wrong Time"; then each badge flips to a solid ink circle with a white check drawn in (`scale-swap-transition` + `svg-path-draw`) — the state mutation runs mid-list as the next cue arrives; the working label swaps tense ("using AI Title Generator" → "used").
Scene 3 (1.7–2.7s): on "Descriptions that rank." — the row group swaps to short grey demo description lines ("A beginner-friendly walkthrough — chapters, links, and a clear call to action."), rows land checked one by one; the theater label briefly returns between groups ("writing descriptions…", shimmer) then docks away.
Scene 4 (2.7–3.65s): on "Hooks that hold." — three short hook rows slam in ("Nobody talks about this part of YouTube.", "Your first views are the hardest — here's why.", "The upload mistake costing you views.") and check off; hold still for the final ~0.6s — everything resolved, no drift, no breathing.

## Frame 5 — tool crawl

- scene: A camera flight down the real All-60-tools grid, pausing on the thumbnail, stats and money rows
- voiceover: "Download the thumbnail. Check the stats. Count the earnings."
- duration: 3.307s
- poster: 3.2s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/05-tool-crawl.html
- type: feature_showcase
- persuasion: Value stacking
- beat: control
- blueprint: camera-journey (Adapt)
- focal: assets/full-page.png
- roles: full-page = background (the world — cropped to the All-60-tools region, y≈2549–6255 of the 1920×9478 plate)
- sfx: whoosh-short
- asset_candidates: assets/full-page.png — the real homepage plate, cropped to the All-60-tools region (Downloaders through Calculators), travelled by the camera at ≤1:1
- narrativeRole: Breadth proven by traversal — the camera's travel itself shows the catalog is real and deep.
- keyMessage: There's a tool for every small job, all in one place.

Adapt: keep the multi-leg motivated journey and the arriving-payoff grammar; the world is flat (no 3D), all travel stays ≤1:1 (1x plate has no headroom above 1:1), and each leg lands a thin focus outline plus one small response pip rather than full result panels.

Scene 1 (0.0–0.6s): ink field; the real grid plate (cropped All-60-tools region) sits at scale 1.0 showing the Downloaders rows; a thin mono focus outline fades in around the "Thumbnail Downloader" card (`ai-tracking-box` restyle) as the VO names it; a small pip beside the card ticks `MaxRes · HD · SD` (mono, factual tier labels only).
Scene 2 (0.6–1.5s): on "Check the stats." the camera pulls back slightly (1.0 → 0.94) and pans down the world to the Analytics rows (`viewport-change` pan on the .world, `multi-phase-camera` leg sequencing, `power2.inOut`); the focus outline sweeps down onto "Video Statistics" (`ai-tracking-box` travel); its pip shows `views / likes / comments` labels with a count-up ticker (value placeholder, marked `sample`).
Scene 3 (1.5–2.8s): on "Count the earnings." the pan continues to the Calculators rows, decelerating (`power4.out` arrival); the outline lands on "YouTube Money Calculator"; its pip count-ups a `$` figure (placeholder, `sample` chip) beside an RPM/CPM label column.
Scene 4 (2.8–3.31s): landing settle — travel stops, a near-imperceptible drift eases out (`multi-phase-camera` drift), ending held on the calculators cluster. `.world` carries `data-layout-allow-overflow` (deliberate edge travel).

## Frame 6 — sixty

- scene: The payoff stack — step by step: 60 tools, 15 calculators, 0 sign-ups, free forever
- voiceover: "Sixty tools. Fifteen calculators. Zero sign-ups. Free forever."
- duration: 4.245s
- poster: 3.2s
- transition_in: cut
- status: animated
- src: compositions/frames/06-sixty.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: excitement
- blueprint: dataviz-countup (Adapt)
- sfx: impact-bass-2
- asset_candidates:
- narrativeRole: The decisive breadth beat — the product's own numbers, at maximum volume, right before the close.
- keyMessage: Sixty tools. Fifteen calculators. Zero sign-ups. Free forever.

Adapt: keep the count-up-with-scale-growth signature; instruments are pure fire-register type (no camera push-through, no cards) — a manifesto stack that builds line by line.

Scene 1 (0.0–1.2s): fire field; giant `60` counts up with its scale growing to finale size (`counting-dynamic-scale`) dead-center-upper; mono label "FREE YOUTUBE TOOLS" seats beneath it; nothing else on canvas — only the first cue's content.
Scene 2 (1.2–2.4s): on the second cue the `60` steps back (scale ~0.6, holds upper-left of the block) and `15` counts up beside/below at 60% of the hero size (`counting-dynamic-scale`), mono label "CALCULATORS".
Scene 3 (2.4–3.2s): on the third cue `0` lands large beneath (settle, no bounce) with mono label "SIGN-UPS", and a small ink chip `no login` masked-slides in beside it (`gsap-effects` masked slide).
Scene 4 (3.2–4.25s): the hero word `free` lands biggest of the block with mono label "FOREVER" beneath it (`spring-pop-entrance` settle, no bounce); the whole stack resolved and STILL — hold to cut.

## Frame 7 — cta lockup

- scene: The mark condenses into the empty paste box; the cursor lands the click; the caret blinks
- voiceover: "YT Tools dot pro. Paste your first link."
- duration: 2.965s
- poster: 2.8s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/07-cta-lockup.html
- type: cta
- persuasion: Risk reversal
- beat: motivation
- blueprint: cta-morph-press (Adapt)
- focal: assets/logo-efec6514.svg
- roles: logo-efec6514 = cutout (the white play glyph inside the real red tile mark)
- sfx: click-soft, pop
- asset_candidates: assets/logo-efec6514.svg — the real white play glyph from the brand mark (red rounded tile + glyph + "YT Toolkit" wordmark, per the site header)
- narrativeRole: The close walks identity → action: here's who we are, here's the one thing you do.
- keyMessage: Go to yttools.pro and paste your first link.

Adapt: keep the same-center morph + human-aimed press signature; the CTA element is the real paste box from Frame 2 returning EMPTY — the circular close.

Scene 1 (0.0–0.9s): ink field; the brand mark (red #FF3B30 rounded tile, white play glyph from the asset, "YT Toolkit" wordmark beside) holds dead-center, still; the domain `yttools.pro` masked-slides in beneath it (`gsap-effects`) on the first cue; everything else rock-still.
Scene 2 (0.9–1.7s): the morph (signature) — the mark condenses at the same center into the smaller paste box (white, real tokens, EMPTY, placeholder visible); shrink-fade ↔ scale-up share one transform-origin (`scale-swap-transition`); a single soft glow blooms behind the focused box — the domain stays locked above.
Scene 3 (1.7–2.5s): on "Paste your first link." — a cursor decel-arrives from off-stage and lands slightly off the box's geometric center (`gsap-effects`, power2.out translate), then presses with the box in lockstep compression (`physics-press-reaction`) and a soft click ripple; the caret begins blinking in the now-focused empty input (`context-sensitive-cursor`).
Scene 4 (2.5–2.97s): hold — only the caret blinks; domain + box + mark lockup still to the last frame. This frame owns the video's only exit motion (none needed — the hold is the ending).
