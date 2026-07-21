import type {
  YouTubeChannel,
  YouTubeVideoMonetizationProbe,
  MonetizationEstimate,
  MonetizationSignal,
  MonetizationPrediction,
} from '@/lib/youtube/types';
import type { PageMonetizationSignals } from '@/lib/youtube/page-signals';
import { videoLooksMonetized } from '@/lib/youtube/page-signals';

/**
 * YTLarge-style monetization engine.
 *
 * Primary signals (same family as ytlarge.com):
 * 1. Ad placements on recent videos (ytInitialPlayerResponse.adPlacements / yt_ad)
 * 2. Join / Channel Memberships button on public channel page
 * 3. Super Thanks on watch pages when detectable
 * 4. Supporting scale heuristics (subs / views) only as tie-breakers
 *
 * Output is Monetization ON (YES) / OFF (NO) with confidence — still an estimate.
 */
export function estimateMonetization(
  channel: YouTubeChannel,
  videos: YouTubeVideoMonetizationProbe[],
  page: PageMonetizationSignals | null,
): MonetizationEstimate {
  const signals: MonetizationSignal[] = [];
  let score = 0; // -100 … +100 lean; mapped to probability

  const checkedVideos = page?.videos.filter((v) => v.checked) ?? [];
  const adVideos = checkedVideos.filter((v) => videoLooksMonetized(v));
  const noAdVideos = checkedVideos.filter(
    (v) => v.hasAdPlacements === false && v.ytAdFlag !== true,
  );
  const midrollCount = checkedVideos.filter((v) => v.midroll).length;
  const prerollCount = checkedVideos.filter((v) => v.preroll).length;
  const superThanksHits = checkedVideos.filter((v) => v.superThanks === true).length;

  // ——— 1. Video ad status (YTLarge core) ———
  if (!page || page.videosChecked === 0) {
    signals.push({
      id: 'video_ads',
      label: 'Video ad status',
      status: 'unavailable',
      detail: 'Could not read public watch-page ad placements for recent videos.',
    });
  } else if (adVideos.length >= 1 && adVideos.length >= Math.ceil(checkedVideos.length * 0.4)) {
    signals.push({
      id: 'video_ads',
      label: 'Video ad status',
      status: 'detected',
      detail: `Ads detected on ${adVideos.length}/${checkedVideos.length} recent videos (ad placements / yt_ad). Same class of signal used by tools like YTLarge.`,
    });
    score += 45;
    if (adVideos.length >= 3) score += 12;
    if (midrollCount >= 1) {
      score += 10;
      signals.push({
        id: 'midrolls',
        label: 'Mid-roll ad breaks',
        status: 'detected',
        detail: `Mid-roll style placements found on ${midrollCount} sampled video(s) — strong creator-configured ad signal.`,
      });
    } else {
      signals.push({
        id: 'midrolls',
        label: 'Mid-roll ad breaks',
        status: 'not_detected',
        detail: prerollCount
          ? `Pre-roll detected on ${prerollCount} video(s); no mid-rolls in sample.`
          : 'No mid-roll placements in the sampled videos.',
      });
    }
  } else if (noAdVideos.length > 0 && adVideos.length === 0) {
    signals.push({
      id: 'video_ads',
      label: 'Video ad status',
      status: 'not_detected',
      detail: `No ad placements found on ${checkedVideos.length} recent video(s).`,
    });
    score -= 25;
    signals.push({
      id: 'midrolls',
      label: 'Mid-roll ad breaks',
      status: 'not_detected',
      detail: 'No mid-roll placements in the sampled videos.',
    });
  } else {
    signals.push({
      id: 'video_ads',
      label: 'Video ad status',
      status: 'unavailable',
      detail: 'Mixed or incomplete ad data from public watch pages.',
    });
  }

  // ——— 2. Join / Memberships (YTLarge: “Join button”) ———
  if (!page?.channel.checked) {
    signals.push({
      id: 'membership_button',
      label: 'Join / Membership button',
      status: 'unavailable',
      detail: 'Channel page could not be loaded to check for Join / Memberships.',
    });
  } else if (page.channel.hasMemberships === true) {
    signals.push({
      id: 'membership_button',
      label: 'Join / Membership button',
      status: 'detected',
      detail: `Public channel page shows memberships (${page.channel.hints.slice(0, 3).join(', ') || 'Join'}). Memberships require YPP fan-funding tier+.`,
    });
    score += 40;
  } else {
    signals.push({
      id: 'membership_button',
      label: 'Join / Membership button',
      status: 'not_detected',
      detail: 'No Join / Memberships button detected on the public channel page.',
    });
  }

  // ——— 3. Super Thanks ———
  if (superThanksHits > 0) {
    signals.push({
      id: 'super_thanks',
      label: 'Super Thanks',
      status: 'detected',
      detail: `Super Thanks indicator found on ${superThanksHits} sampled watch page(s).`,
    });
    score += 18;
  } else if (checkedVideos.length > 0) {
    signals.push({
      id: 'super_thanks',
      label: 'Super Thanks',
      status: 'not_detected',
      detail: 'No clear Super Thanks control found on sampled watch pages.',
    });
  } else {
    signals.push({
      id: 'super_thanks',
      label: 'Super Thanks',
      status: 'unavailable',
      detail: 'Watch pages unavailable to check Super Thanks.',
    });
  }

  // ——— 4. Made for Kids ———
  if (channel.madeForKids === true) {
    signals.push({
      id: 'made_for_kids',
      label: 'Made for Kids',
      status: 'detected',
      detail: 'Channel marked Made for Kids — standard ad monetization is typically restricted.',
    });
    score -= 40;
  } else if (channel.madeForKids === false) {
    signals.push({
      id: 'made_for_kids',
      label: 'Made for Kids',
      status: 'not_detected',
      detail: 'Not marked Made for Kids.',
    });
  } else {
    signals.push({
      id: 'made_for_kids',
      label: 'Made for Kids',
      status: 'unavailable',
      detail: 'Made for Kids flag not returned.',
    });
  }

  // ——— 5. Scale (supporting only — YTLarge also cites 1K subs rule) ———
  const subs = channel.subscriberCount;
  if (subs >= 100_000) {
    signals.push({
      id: 'subscriber_scale',
      label: 'Subscriber scale',
      status: 'detected',
      detail: `${subs.toLocaleString()} subscribers — strong supporting context.`,
    });
    score += 12;
  } else if (subs >= 1_000) {
    signals.push({
      id: 'subscriber_scale',
      label: 'YPP subscriber threshold',
      status: 'detected',
      detail: `${subs.toLocaleString()} subscribers meet the common 1,000 YPP threshold (eligibility ≠ confirmed ads).`,
    });
    score += 6;
  } else {
    signals.push({
      id: 'subscriber_scale',
      label: 'YPP subscriber threshold',
      status: 'not_detected',
      detail: `${subs.toLocaleString()} subscribers are below the common 1,000 threshold.`,
    });
    score -= 10;
  }

  if (channel.viewCount >= 1_000_000) score += 5;

  // Licensed content supporting
  const licensed = videos.filter((v) => v.licensedContent === true).length;
  if (licensed >= 3) {
    signals.push({
      id: 'licensed_content',
      label: 'Licensed content',
      status: 'detected',
      detail: `${licensed} recent videos report licensedContent=true.`,
    });
    score += 4;
  }

  // ——— Decision (YTLarge-style ON/OFF) ———
  // Hard rules first — match how ad/membership checkers behave
  const hasMemberships = page?.channel.hasMemberships === true;
  const membershipsOff = page?.channel.hasMemberships === false;
  let forced: MonetizationPrediction | null = null;
  if (hasMemberships) forced = 'YES';
  else if (adVideos.length >= 2) forced = 'YES';
  else if (adVideos.length >= 1 && midrollCount >= 1) forced = 'YES';
  else if (
    checkedVideos.length >= 3 &&
    adVideos.length === 0 &&
    !hasMemberships &&
    subs < 10_000
  ) {
    forced = 'NO';
  }

  // Map score → probability
  let probability = Math.round(50 + score * 0.45);
  probability = Math.max(3, Math.min(97, probability));

  if (forced === 'YES') probability = Math.max(probability, 82);
  if (forced === 'NO') probability = Math.min(probability, 28);
  if (channel.madeForKids === true && !hasMemberships) {
    probability = Math.min(probability, 30);
  }

  // Mega channels with any ad signal → ON
  if (subs >= 100_000 && adVideos.length >= 1) {
    probability = Math.max(probability, 90);
    forced = 'YES';
  }

  // Small channels with membershipsOff + no ads → lean OFF harder
  if (membershipsOff && adVideos.length === 0 && subs < 1_000) {
    probability = Math.min(probability, 22);
    forced = forced ?? 'NO';
  }

  const prediction: MonetizationPrediction =
    forced ?? (probability >= 50 ? 'YES' : 'NO');

  const confidence =
    prediction === 'YES'
      ? Math.max(probability, forced === 'YES' ? 82 : probability)
      : Math.max(3, Math.min(97, 100 - probability));

  const status =
    prediction === 'YES'
      ? confidence >= 80
        ? 'Likely Monetized'
        : 'Probably Monetized'
      : 'No Strong Evidence of Monetization';

  const adStatusLabel =
    !page || page.videosChecked === 0
      ? 'Unavailable'
      : adVideos.length === 0
        ? 'No Ads Detected'
        : adVideos.length === checkedVideos.length
          ? 'Ads Active'
          : 'Mixed Ads';

  const summary =
    prediction === 'YES'
      ? `Monetization: ON — estimated YES (${confidence}% confidence). Channel ad status: ${adStatusLabel}. Based on public watch-page ad placements, memberships, and supporting channel stats (YTLarge-style public signals).`
      : `Monetization: OFF — estimated NO (${confidence}% confidence). Channel ad status: ${adStatusLabel}. Public pages did not show strong monetization ads / memberships.`;

  return {
    prediction,
    status,
    confidence: Math.max(3, Math.min(97, Math.round(confidence))),
    probability: Math.max(3, Math.min(97, Math.round(probability))),
    signals,
    summary,
    adStatus: adStatusLabel,
    monetizationLabel: prediction === 'YES' ? 'ON' : 'OFF',
  };
}
