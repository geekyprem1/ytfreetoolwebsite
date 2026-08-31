/**
 * Comparison / "alternative" pages. Honest feature tables that acknowledge where
 * competitors are genuinely stronger — the intellectual-honesty angle that AI
 * answer engines tend to cite. No competitor is disparaged; facts only.
 */

export interface ComparisonRow {
  feature: string;
  ours: string;
  theirs: string;
}

export interface Comparison {
  slug: string;
  competitor: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  answerFirst: string;
  intro: string;
  rows: ComparisonRow[];
  whereTheyWin: string[];
  whereWeWin: string[];
  faqs: { q: string; a: string }[];
}

export const comparisons: Comparison[] = [
  {
    slug: 'vidiq-alternatives',
    competitor: 'vidIQ',
    title: 'Free vidIQ Alternatives',
    metaTitle: 'Free vidIQ Alternatives (2026) — Honest Comparison | yttools.pro',
    metaDescription:
      'Looking for a free vidIQ alternative? Compare YT Toolkit’s free tools against vidIQ — where each wins, and where vidIQ’s paid features are genuinely stronger.',
    answerFirst:
      'YT Toolkit is a free, no-login alternative to vidIQ for tag extraction, AI titles and descriptions, keyword ideas, and analytics lookups. vidIQ remains stronger for real search-volume data, competitor tracking dashboards, and a browser extension. If you want free per-task tools without a subscription, YT Toolkit covers most everyday jobs.',
    intro:
      'vidIQ is a full YouTube growth suite with a subscription and a browser extension. YT Toolkit is a set of free, single-purpose web tools with no login. This page compares them honestly, including where vidIQ is genuinely better.',
    rows: [
      { feature: 'Price', ours: 'Free, no login', theirs: 'Free tier + paid plans' },
      { feature: 'Tag extraction', ours: 'Yes, free', theirs: 'Yes' },
      { feature: 'AI titles / descriptions', ours: 'Yes, free', theirs: 'Yes (credit-limited free tier)' },
      { feature: 'Real search volume data', ours: 'No (uses AI/heuristics)', theirs: 'Yes (paid)' },
      { feature: 'Competitor tracking dashboard', ours: 'One-off lookups only', theirs: 'Yes (paid)' },
      { feature: 'Browser extension', ours: 'No', theirs: 'Yes' },
      { feature: 'Account required', ours: 'No', theirs: 'Yes' },
    ],
    whereTheyWin: [
      'Real, sourced search-volume and keyword-difficulty data (YT Toolkit uses AI estimates instead).',
      'Persistent dashboards for tracking your channel and competitors over time.',
      'A browser extension that overlays stats directly on YouTube.',
    ],
    whereWeWin: [
      'Completely free with no account or credit limits on core tools.',
      'Nothing to install — works on mobile and desktop.',
      'Fast for one-off tasks: paste a URL, get a result, leave.',
    ],
    faqs: [
      {
        q: 'Is there a truly free vidIQ alternative?',
        a: 'YT Toolkit is free with no login for tag extraction, AI titles/descriptions, keyword ideas, transcripts, and analytics lookups. It does not replace vidIQ’s paid search-volume data or tracking dashboards, but it covers most everyday tasks at no cost.',
      },
      {
        q: 'What can vidIQ do that free tools cannot?',
        a: 'vidIQ’s paid tiers provide real search-volume and difficulty data, ongoing competitor tracking, and a browser extension. Free tools, including YT Toolkit, generally rely on AI estimates rather than licensed search data.',
      },
    ],
  },
  {
    slug: 'tubebuddy-alternatives',
    competitor: 'TubeBuddy',
    title: 'Free TubeBuddy Alternatives',
    metaTitle: 'Free TubeBuddy Alternatives (2026) — Honest Comparison | yttools.pro',
    metaDescription:
      'Looking for a free TubeBuddy alternative? Compare YT Toolkit’s free web tools against TubeBuddy, including where TubeBuddy’s extension and bulk tools are stronger.',
    answerFirst:
      'YT Toolkit is a free, no-login alternative to TubeBuddy for tags, AI titles/descriptions, thumbnails, and analytics lookups. TubeBuddy is stronger for in-YouTube bulk actions, A/B thumbnail testing tied to your channel, and its browser extension. For free per-task web tools, YT Toolkit handles most jobs.',
    intro:
      'TubeBuddy is a browser extension and toolkit that integrates into YouTube Studio, with free and paid tiers. YT Toolkit is a set of free web tools with no login or install. Here is an honest comparison.',
    rows: [
      { feature: 'Price', ours: 'Free, no login', theirs: 'Free tier + paid plans' },
      { feature: 'Works without install', ours: 'Yes (web app)', theirs: 'No (extension)' },
      { feature: 'Tag tools', ours: 'Yes, free', theirs: 'Yes' },
      { feature: 'Thumbnail A/B test on your channel', ours: 'Preview/compare only', theirs: 'Yes (paid, live test)' },
      { feature: 'Bulk Studio actions', ours: 'No', theirs: 'Yes (paid)' },
      { feature: 'AI generation tools', ours: 'Yes, free', theirs: 'Yes (limited free)' },
      { feature: 'Account required', ours: 'No', theirs: 'Yes' },
    ],
    whereTheyWin: [
      'Live A/B thumbnail testing wired directly into your own channel’s analytics.',
      'Bulk actions inside YouTube Studio (bulk descriptions, cards, end screens).',
      'Deep in-Studio integration via the extension.',
    ],
    whereWeWin: [
      'Free core tools with no account and no install.',
      'Usable on any device, including mobile, without an extension.',
      'Quick single-task workflows for tags, titles, thumbnails, and stats.',
    ],
    faqs: [
      {
        q: 'Is there a free TubeBuddy alternative without an extension?',
        a: 'Yes. YT Toolkit runs in the browser with no install and no login, covering tags, AI titles/descriptions, thumbnails, transcripts, and analytics lookups. It cannot perform in-Studio bulk actions the way TubeBuddy’s extension can.',
      },
      {
        q: 'Can I A/B test thumbnails for free?',
        a: 'YT Toolkit’s thumbnail preview and A/B tester lets you compare two thumbnails visually across YouTube layouts. Running a live A/B test tied to your channel’s real click-through data requires a tool like TubeBuddy’s paid feature.',
      },
    ],
  },
  {
    slug: 'social-blade-alternative',
    competitor: 'Social Blade',
    title: 'Free Social Blade Alternative',
    metaTitle: 'Free Social Blade Alternative (2026) — Honest Comparison | yttools.pro',
    metaDescription:
      'Looking for a Social Blade alternative? Compare YT Toolkit’s free channel stats, live counts, and comparison tools against Social Blade’s historical tracking.',
    answerFirst:
      'YT Toolkit offers free channel statistics, a live subscriber counter, and side-by-side channel comparison — similar day-to-day uses to Social Blade. Social Blade is stronger for long-term historical charts and rank tracking. For current public stats and live counts without login, YT Toolkit works well.',
    intro:
      'Social Blade is known for historical stat tracking and rankings across platforms. YT Toolkit provides free, current public stats, live counters, and comparisons for YouTube. Here is how they line up.',
    rows: [
      { feature: 'Price', ours: 'Free, no login', theirs: 'Free + paid tiers' },
      { feature: 'Current channel stats', ours: 'Yes, free', theirs: 'Yes' },
      { feature: 'Live subscriber count', ours: 'Yes, free', theirs: 'Yes' },
      { feature: 'Side-by-side comparison', ours: 'Yes (2–3 channels)', theirs: 'Yes' },
      { feature: 'Long-term historical charts', ours: 'No', theirs: 'Yes' },
      { feature: 'Cross-platform rankings', ours: 'YouTube only', theirs: 'Multi-platform' },
      { feature: 'Account required', ours: 'No', theirs: 'No (basic)' },
    ],
    whereTheyWin: [
      'Years of historical data and trend charts for a channel.',
      'Global and category rankings, plus multi-platform coverage.',
      'Projections based on long-term tracked history.',
    ],
    whereWeWin: [
      'Free, clean current stats and live counters with no clutter.',
      'Focused YouTube comparison of two to three channels at once.',
      'No login and mobile-friendly.',
    ],
    faqs: [
      {
        q: 'What is a free Social Blade alternative for YouTube?',
        a: 'YT Toolkit provides free current channel statistics, a live subscriber counter, and channel comparison without login. It does not offer Social Blade’s long-term historical charts or cross-platform rankings.',
      },
      {
        q: 'Can I see historical subscriber growth?',
        a: 'YT Toolkit shows current public stats and live counts rather than multi-year history. For long-term historical charts, Social Blade is the stronger choice.',
      },
    ],
  },
  {
    slug: 'free-youtube-tools',
    competitor: 'paid suites',
    title: 'Free YouTube Tools vs Paid Suites',
    metaTitle: 'Free YouTube Tools vs Paid Suites (2026) — Honest Guide | yttools.pro',
    metaDescription:
      'When are free YouTube tools enough, and when do you need a paid suite like vidIQ or TubeBuddy? An honest breakdown by task, with a free option for each.',
    answerFirst:
      'Free YouTube tools cover most everyday tasks — tags, titles, descriptions, thumbnails, transcripts, calculators, and stat lookups — without a subscription. Paid suites are worth it mainly for licensed search-volume data, ongoing competitor tracking, and in-Studio bulk actions. Start free; upgrade only for those specific needs.',
    intro:
      'You do not need a subscription for most creator tasks. This page maps common jobs to a free tool and flags the few cases where a paid suite genuinely helps.',
    rows: [
      { feature: 'Extract tags', ours: 'Free (Tags Extractor)', theirs: 'Paid suite also does this' },
      { feature: 'AI titles / descriptions', ours: 'Free', theirs: 'Often credit-limited on free tiers' },
      { feature: 'Keyword ideas', ours: 'Free (AI estimates)', theirs: 'Paid: real search volume' },
      { feature: 'Thumbnails / transcripts', ours: 'Free', theirs: 'Varies' },
      { feature: 'Earnings calculators', ours: 'Free (12 calculators)', theirs: 'Rarely included' },
      { feature: 'Competitor tracking over time', ours: 'One-off lookups', theirs: 'Paid dashboards' },
    ],
    whereTheyWin: [
      'Licensed search-volume and keyword-difficulty data.',
      'Persistent dashboards and alerts for tracking.',
      'Bulk in-Studio operations at scale.',
    ],
    whereWeWin: [
      'Zero cost and zero login for the core creator workflow.',
      'A calculator suite most paid tools do not include.',
      'No lock-in — use a single tool and leave.',
    ],
    faqs: [
      {
        q: 'Are free YouTube tools good enough?',
        a: 'For tags, titles, descriptions, thumbnails, transcripts, earnings math, and one-off stat lookups, free tools like YT Toolkit are enough for most creators. Paid suites mainly add licensed search data, tracking dashboards, and bulk Studio actions.',
      },
      {
        q: 'When should I pay for a YouTube tool?',
        a: 'Consider paying when you specifically need real search-volume numbers, ongoing competitor tracking, or bulk editing across many videos. Otherwise, free tools handle the day-to-day.',
      },
    ],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
