/** YouTube creator glossary. Each term: short extract-friendly definition + detail + optional related tool. */

export interface GlossaryTerm {
  slug: string;
  term: string;
  short: string;
  detail: string;
  formula?: string;
  example?: string;
  relatedTool?: { label: string; href: string };
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'cpm',
    term: 'CPM (Cost Per Mille)',
    short:
      'CPM is the amount advertisers pay per 1,000 ad impressions on YouTube, before YouTube takes its share.',
    detail:
      'CPM reflects advertiser demand and varies by country, niche, and season (Q4 is highest). It is not what the creator keeps — that is RPM, which is lower after YouTube’s cut and unmonetized views.',
    formula: 'CPM = (ad revenue ÷ ad impressions) × 1,000',
    example: 'If advertisers pay $80 for 10,000 impressions, CPM is $8.',
    relatedTool: { label: 'CPM Calculator', href: '/youtube-cpm-calculator' },
  },
  {
    slug: 'rpm',
    term: 'RPM (Revenue Per Mille)',
    short:
      'RPM is how much a creator actually earns per 1,000 views across all revenue, after YouTube’s share.',
    detail:
      'RPM includes all views (not just monetized ones) and all revenue sources (ads, memberships, Super Chats). It is the truest single measure of earning efficiency and is always lower than CPM.',
    formula: 'RPM = (total revenue ÷ total views) × 1,000',
    example: 'Earning $200 from 100,000 views is a $2 RPM.',
    relatedTool: { label: 'RPM Calculator', href: '/youtube-rpm-calculator' },
  },
  {
    slug: 'watch-time',
    term: 'Watch Time',
    short: 'Watch time is the total minutes viewers spend watching a channel’s videos.',
    detail:
      'Watch time is a core signal YouTube uses to decide how widely to recommend content. The Partner Program requires 4,000 public watch hours in 12 months (or Shorts views) to qualify for monetization.',
    formula: 'Watch time (minutes) ≈ views × average view duration',
    relatedTool: { label: 'Watch Time Calculator', href: '/youtube-watch-time-calculator' },
  },
  {
    slug: 'avd',
    term: 'AVD (Average View Duration)',
    short: 'AVD is the average amount of time viewers watch a video before leaving.',
    detail:
      'AVD is best read alongside video length as a percentage (average percentage viewed). A high AVD signals the content holds attention, which supports wider distribution.',
    formula: 'AVD = total watch time ÷ number of views',
    relatedTool: { label: 'Average View Duration Calculator', href: '/youtube-average-view-duration-calculator' },
  },
  {
    slug: 'ctr',
    term: 'CTR (Click-Through Rate)',
    short:
      'CTR is the percentage of people who click a video after seeing its thumbnail and title (impression).',
    detail:
      'CTR mainly reflects packaging — thumbnail and title. Typical values sit around 2–10%, but a “good” CTR depends on how a video is being surfaced. Very high CTR with low retention can signal misleading packaging.',
    formula: 'CTR = (clicks ÷ impressions) × 100',
    relatedTool: { label: 'Thumbnail Preview Tester', href: '/thumbnail-preview-tester' },
  },
  {
    slug: 'impressions',
    term: 'Impressions',
    short: 'Impressions count how many times a video’s thumbnail was shown to viewers on YouTube.',
    detail:
      'Impressions come from the home feed, search, suggested videos, and more. They are the top of the funnel: impressions lead to clicks (CTR), which lead to views and watch time.',
  },
  {
    slug: 'ypp',
    term: 'YPP (YouTube Partner Program)',
    short: 'YPP is the program that lets creators earn money from ads and other features on YouTube.',
    detail:
      'To join, a channel typically needs 1,000 subscribers plus either 4,000 public watch hours in 12 months or 10 million Shorts views in 90 days, and must follow YouTube’s policies.',
  },
  {
    slug: 'monetization',
    term: 'Monetization',
    short: 'Monetization is earning revenue from a YouTube channel, primarily through the Partner Program.',
    detail:
      'Beyond ads, monetization includes channel memberships, Super Chats and Super Thanks, merchandise, and YouTube Premium revenue share.',
    relatedTool: { label: 'Monetization Checker', href: '/monetization-checker' },
  },
  {
    slug: 'shorts',
    term: 'YouTube Shorts',
    short: 'Shorts are vertical videos up to 3 minutes designed for quick, mobile-first viewing.',
    detail:
      'Shorts have their own feed and monetization pool. They are strong for reach and subscriber growth but usually earn a lower RPM than long-form.',
    relatedTool: { label: 'Shorts Earnings Calculator', href: '/youtube-shorts-earnings-calculator' },
  },
  {
    slug: 'mid-roll',
    term: 'Mid-Roll Ad',
    short: 'A mid-roll is an ad that plays partway through a video rather than at the start or end.',
    detail:
      'Videos of 8 minutes or longer are eligible for mid-roll ads, which is a key reason many creators aim past the 8-minute mark. Placement should avoid interrupting key moments.',
  },
  {
    slug: 'end-screen',
    term: 'End Screen',
    short: 'An end screen is the interactive overlay in the last 5–20 seconds of a video.',
    detail:
      'End screens promote other videos, playlists, or subscribing. They help chain viewers into another video, boosting session watch time.',
  },
  {
    slug: 'thumbnail',
    term: 'Thumbnail',
    short: 'A thumbnail is the preview image that represents a video in feeds and search.',
    detail:
      'Along with the title, the thumbnail drives CTR. Recommended size is 1280×720 (16:9). It must read clearly at small mobile sizes.',
    relatedTool: { label: 'Thumbnail Downloader', href: '/thumbnail-downloader' },
  },
  {
    slug: 'tags',
    term: 'Tags',
    short: 'Tags are keywords added to a video to give YouTube context about its content.',
    detail:
      'Tags have a minor ranking role today compared to title, description, and content, but they can help with spelling variations and disambiguation.',
    relatedTool: { label: 'Tags Extractor', href: '/tags-extractor' },
  },
  {
    slug: 'metadata',
    term: 'Metadata',
    short: 'Metadata is the text data around a video: title, description, tags, and chapters.',
    detail:
      'Well-structured metadata helps YouTube understand and surface a video. The title and first lines of the description carry the most weight.',
    relatedTool: { label: 'SEO Score Checker', href: '/seo-score-checker' },
  },
  {
    slug: 'chapters',
    term: 'Chapters',
    short: 'Chapters split a video into labeled sections using timestamps in the description.',
    detail:
      'Chapters improve navigation and can surface as key moments in search. They require at least three timestamps, the first starting at 0:00.',
    relatedTool: { label: 'Timestamp Generator', href: '/timestamp-generator' },
  },
  {
    slug: 'session-time',
    term: 'Session Time',
    short: 'Session time is how long a viewer stays on YouTube overall after watching your video.',
    detail:
      'YouTube favors videos that keep people on the platform, not just on one video. Sending viewers to another of your videos (or a playlist) supports session time.',
  },
  {
    slug: 'retention',
    term: 'Audience Retention',
    short: 'Retention is the percentage of a video viewers watch, plotted across its length.',
    detail:
      'The retention graph reveals where viewers drop off. A strong hook and steady pacing keep the curve high, which supports distribution.',
  },
  {
    slug: 'hook',
    term: 'Hook',
    short: 'The hook is the first few seconds of a video that convince viewers to keep watching.',
    detail:
      'Because early retention is so influential, a sharp hook — a question, bold claim, or preview of the payoff — is one of the highest-leverage parts of a video.',
    relatedTool: { label: 'Hook Generator', href: '/hook-generator' },
  },
  {
    slug: 'super-chat',
    term: 'Super Chat',
    short: 'Super Chat lets viewers pay to highlight their message during a live stream.',
    detail:
      'Part of live monetization, Super Chat (and Super Thanks on regular videos) is a direct fan-support revenue stream separate from ads.',
    relatedTool: { label: 'Live Earnings Calculator', href: '/youtube-live-earnings-calculator' },
  },
  {
    slug: 'handle',
    term: '@Handle',
    short: 'A handle is a channel’s unique @username, used in its URL and mentions.',
    detail:
      'Handles are human-friendly and changeable, unlike the permanent channel ID. A channel’s handle appears as youtube.com/@name.',
    relatedTool: { label: 'Channel Name Generator', href: '/youtube-channel-name-generator' },
  },
  {
    slug: 'channel-id',
    term: 'Channel ID',
    short: 'The channel ID is a channel’s permanent identifier, a 24-character string starting with UC.',
    detail:
      'Unlike the handle, the channel ID never changes and is required by the API, RSS feeds, and many tools.',
    relatedTool: { label: 'Channel ID Finder', href: '/channel-id-finder' },
  },
  {
    slug: 'engagement-rate',
    term: 'Engagement Rate',
    short: 'Engagement rate measures likes and comments relative to views.',
    detail:
      'It is a rough proxy for how connected an audience is. Smaller channels usually see higher rates than very large ones.',
    relatedTool: { label: 'Engagement Rate Calculator', href: '/youtube-engagement-calculator' },
  },
  {
    slug: 'suggested-videos',
    term: 'Suggested Videos',
    short: 'Suggested videos are the recommendations shown beside or after a video.',
    detail:
      'A major traffic source. Videos that keep viewers watching tend to earn more suggested placement next to related content.',
  },
  {
    slug: 'browse-features',
    term: 'Browse Features',
    short: 'Browse features are placements like the home feed and subscriptions tab.',
    detail:
      'Traffic from browse features reflects YouTube proactively recommending your video to the home feed, a strong sign of broad appeal.',
  },
  {
    slug: 'evergreen',
    term: 'Evergreen Content',
    short: 'Evergreen content stays relevant and keeps getting views long after publishing.',
    detail:
      'How-to guides and reference videos are often evergreen, building a durable library that compounds views over time.',
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
