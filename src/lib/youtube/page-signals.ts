export type AdPlacementKind =
  | 'AD_PLACEMENT_KIND_START'
  | 'AD_PLACEMENT_KIND_END'
  | 'AD_PLACEMENT_KIND_MILLISECONDS'
  | 'AD_PLACEMENT_KIND_UNKNOWN'
  | string;

export interface VideoAdSignals {
  videoId: string;
  checked: boolean;
  /** yt_ad token value "1" found in page / player payload */
  ytAdFlag: boolean | null;
  /** Non-empty adPlacements in ytInitialPlayerResponse */
  hasAdPlacements: boolean | null;
  placementKinds: AdPlacementKind[];
  preroll: boolean;
  midroll: boolean;
  postroll: boolean;
  /** Super Thanks UI / tip jar signal when present on watch page */
  superThanks: boolean | null;
}

export interface ChannelPageSignals {
  checked: boolean;
  /** Join / Channel Memberships button visible on public channel page */
  hasMemberships: boolean | null;
  /** Raw hints found (for debugging / signal detail) */
  hints: string[];
}

export interface PageMonetizationSignals {
  channel: ChannelPageSignals;
  videos: VideoAdSignals[];
  videosChecked: number;
  videosWithAds: number;
  videosWithoutAds: number;
  videosFailed: number;
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

function extractJsonObject(html: string, marker: string): unknown | null {
  const startMarker = html.indexOf(marker);
  if (startMarker < 0) return null;
  const braceStart = html.indexOf('{', startMarker);
  if (braceStart < 0) return null;

  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < html.length; i++) {
    const c = html[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) return null;

  try {
    return JSON.parse(html.slice(braceStart, end + 1)) as unknown;
  } catch {
    return null;
  }
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(9_000),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const html = await res.text();
    return html.length > 800 ? html : null;
  } catch {
    return null;
  }
}

function parseYtAdFlag(html: string, playerJson: string): boolean | null {
  if (/"yt_ad"\s*,\s*"value"\s*:\s*"1"/i.test(html)) return true;
  if (/"yt_ad"\s*:\s*['"]1['"]/i.test(html)) return true;
  if (/"yt_ad"\s*,\s*"value"\s*:\s*"0"/i.test(html)) return false;
  if (playerJson.includes('"yt_ad"') && /"yt_ad".{0,24}"1"/.test(playerJson)) return true;
  return null;
}

function parseSuperThanks(html: string): boolean | null {
  if (
    /superThanks/i.test(html) ||
    /SUPER_THANKS/i.test(html) ||
    /super.?thanks/i.test(html) ||
    /"tipJar"/i.test(html)
  ) {
    // Presence of strings can be in JS bundles even when disabled — require stronger markers
    if (
      /superThanksButtonRenderer/i.test(html) ||
      /"superThanks"/i.test(html) ||
      /buttonRenderer[^}]*Super Thanks/i.test(html)
    ) {
      return true;
    }
  }
  return null;
}

export function parseVideoAdSignals(videoId: string, html: string): VideoAdSignals {
  const player = extractJsonObject(html, 'ytInitialPlayerResponse') as {
    adPlacements?: unknown[];
    adSlots?: unknown[];
    playerAds?: unknown[];
  } | null;

  const playerJson = player ? JSON.stringify(player) : '';
  const placements = Array.isArray(player?.adPlacements) ? player.adPlacements : [];

  const kinds: AdPlacementKind[] = [];
  for (const item of placements) {
    const kind = (
      item as {
        adPlacementRenderer?: { config?: { adPlacementConfig?: { kind?: string } } };
      }
    )?.adPlacementRenderer?.config?.adPlacementConfig?.kind;
    if (kind) kinds.push(kind);
  }

  const preroll = kinds.some((k) => k.includes('START'));
  const postroll = kinds.some((k) => k.includes('END'));
  const midroll = kinds.some((k) => k.includes('MILLISECONDS') || k.includes('MIDROLL'));

  const hasAdPlacements =
    placements.length > 0 &&
    // clientForecasting-only with empty useful kinds still counts if placements array non-empty
    (kinds.length > 0 || placements.length > 0);

  return {
    videoId,
    checked: true,
    ytAdFlag: parseYtAdFlag(html, playerJson),
    hasAdPlacements: player ? hasAdPlacements : null,
    placementKinds: kinds,
    preroll,
    midroll,
    postroll,
    superThanks: parseSuperThanks(html),
  };
}

export function parseChannelPageSignals(html: string): ChannelPageSignals {
  const hints: string[] = [];
  let hasMemberships: boolean | null = null;

  const positivePatterns: { re: RegExp; hint: string }[] = [
    { re: /"isMembershipsEnabled"\s*:\s*true/i, hint: 'isMembershipsEnabled:true' },
    { re: /"isMembershipEnabled"\s*:\s*true/i, hint: 'isMembershipEnabled:true' },
    { re: /"offerMemberships"\s*:\s*true/i, hint: 'offerMemberships:true' },
    { re: /sponsorButtonRenderer/i, hint: 'sponsorButtonRenderer' },
    { re: /membershipOfferRenderer/i, hint: 'membershipOfferRenderer' },
    { re: /subscribedAndMembershipButtonViewModel/i, hint: 'membershipButtonViewModel' },
    { re: /"joinText"\s*:\s*"Join"/i, hint: 'joinText:Join' },
    { re: /Join this channel/i, hint: 'Join this channel' },
  ];

  for (const { re, hint } of positivePatterns) {
    if (re.test(html)) {
      hints.push(hint);
      hasMemberships = true;
    }
  }

  if (hasMemberships !== true) {
    if (
      /"isMembershipsEnabled"\s*:\s*false/i.test(html) ||
      /"offerMemberships"\s*:\s*false/i.test(html)
    ) {
      hasMemberships = false;
      hints.push('memberships explicitly false');
    }
  }

  return {
    checked: true,
    hasMemberships,
    hints,
  };
}

export async function probeVideoAdSignals(videoId: string): Promise<VideoAdSignals> {
  const html = await fetchHtml(`https://www.youtube.com/watch?v=${videoId}`);
  if (!html) {
    return {
      videoId,
      checked: false,
      ytAdFlag: null,
      hasAdPlacements: null,
      placementKinds: [],
      preroll: false,
      midroll: false,
      postroll: false,
      superThanks: null,
    };
  }
  return parseVideoAdSignals(videoId, html);
}

export async function probeChannelPageSignals(
  channelId: string,
  customUrl?: string,
): Promise<ChannelPageSignals> {
  const urls: string[] = [];
  if (customUrl) urls.push(`https://www.youtube.com/@${customUrl.replace(/^@/, '')}`);
  urls.push(`https://www.youtube.com/channel/${channelId}`);

  for (const url of urls) {
    const html = await fetchHtml(url);
    if (!html) continue;
    const parsed = parseChannelPageSignals(html);
    if (parsed.hasMemberships !== null || parsed.hints.length > 0) return parsed;
    // page loaded but no membership markers — treat as not detected for this URL
    if (html.includes('ytInitialData')) {
      return { checked: true, hasMemberships: false, hints: ['channel page loaded'] };
    }
  }

  return { checked: false, hasMemberships: null, hints: [] };
}

/** Probe channel page + up to N recent videos for YTLarge-style ad/membership signals. */
export async function collectPageMonetizationSignals(
  channelId: string,
  customUrl: string | undefined,
  videoIds: string[],
  maxVideos = 5,
): Promise<PageMonetizationSignals> {
  const ids = videoIds.filter(Boolean).slice(0, maxVideos);

  const [channel, ...videos] = await Promise.all([
    probeChannelPageSignals(channelId, customUrl),
    ...ids.map((id) => probeVideoAdSignals(id)),
  ]);

  let videosWithAds = 0;
  let videosWithoutAds = 0;
  let videosFailed = 0;

  for (const v of videos) {
    if (!v.checked || v.hasAdPlacements === null) {
      videosFailed += 1;
      continue;
    }
    // YTLarge-style: real ad placements (not only yt_ad token) count as ads-on
    if (v.hasAdPlacements) videosWithAds += 1;
    else videosWithoutAds += 1;
  }

  return {
    channel,
    videos,
    videosChecked: videos.filter((v) => v.checked).length,
    videosWithAds,
    videosWithoutAds,
    videosFailed,
  };
}

/** Whether a video shows monetization-style ads (placements preferred over yt_ad alone). */
export function videoLooksMonetized(v: VideoAdSignals): boolean {
  if (v.hasAdPlacements === true) return true;
  // yt_ad alone is weak (YT can show ads on non-YPP) — only use if placements unknown
  if (v.hasAdPlacements === null && v.ytAdFlag === true) return true;
  return false;
}
