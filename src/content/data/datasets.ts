/**
 * Reference datasets for the /data pages.
 *
 * IMPORTANT: These are ESTIMATES compiled from publicly reported creator ranges,
 * ad-industry reporting, and commonly cited figures — NOT measured payouts and
 * NOT private YouTube data. Every page states this in a methodology note.
 * Values are expressed as ranges to avoid false precision.
 */

export interface DataColumn {
  key: string;
  label: string;
}

export interface Dataset {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  answerFirst: string;
  intro: string;
  unitNote: string;
  columns: DataColumn[];
  rows: Record<string, string>[];
  methodology: string;
  keywords: string[];
  lastUpdated: string;
}

const LAST_UPDATED = '2026-08-01';

export const datasets: Dataset[] = [
  {
    slug: 'youtube-cpm-by-country',
    title: 'YouTube CPM by Country (2026 Estimates)',
    metaTitle: 'YouTube CPM by Country 2026 — Estimated Ranges | yttools.pro',
    metaDescription:
      'Estimated YouTube CPM ranges by country for 2026, compiled from publicly reported creator figures. Tier 1 markets like the US and Norway pay the most. Estimates, not payouts.',
    answerFirst:
      'YouTube CPM (cost per 1,000 ad impressions) varies widely by country. Tier 1 markets like the US, Australia, and Norway typically see the highest advertiser CPMs, while many emerging markets are lower. The figures below are estimated ranges from public creator reports, not official payouts.',
    intro:
      'Advertiser CPM is the amount brands pay per 1,000 ad impressions before YouTube’s share. It is one of the biggest drivers of how much a channel earns, and it depends heavily on the viewer’s country because ad demand differs by market. The table lists estimated 2026 ranges by country.',
    unitNote: 'CPM = advertiser cost per 1,000 ad impressions, in USD. RPM (what the creator keeps) is lower.',
    columns: [
      { key: 'country', label: 'Country' },
      { key: 'tier', label: 'Market tier' },
      { key: 'cpm', label: 'Estimated CPM (USD)' },
    ],
    rows: [
      { country: 'United States', tier: 'Tier 1', cpm: '$8 – $22' },
      { country: 'Norway', tier: 'Tier 1', cpm: '$10 – $24' },
      { country: 'Australia', tier: 'Tier 1', cpm: '$9 – $20' },
      { country: 'United Kingdom', tier: 'Tier 1', cpm: '$7 – $18' },
      { country: 'Canada', tier: 'Tier 1', cpm: '$7 – $17' },
      { country: 'Germany', tier: 'Tier 1', cpm: '$6 – $16' },
      { country: 'Switzerland', tier: 'Tier 1', cpm: '$9 – $21' },
      { country: 'Netherlands', tier: 'Tier 1', cpm: '$6 – $15' },
      { country: 'Japan', tier: 'Tier 2', cpm: '$4 – $11' },
      { country: 'South Korea', tier: 'Tier 2', cpm: '$4 – $10' },
      { country: 'France', tier: 'Tier 2', cpm: '$5 – $12' },
      { country: 'Spain', tier: 'Tier 2', cpm: '$3 – $8' },
      { country: 'Italy', tier: 'Tier 2', cpm: '$3 – $8' },
      { country: 'UAE', tier: 'Tier 2', cpm: '$4 – $11' },
      { country: 'Brazil', tier: 'Tier 3', cpm: '$1 – $4' },
      { country: 'Mexico', tier: 'Tier 3', cpm: '$1 – $4' },
      { country: 'India', tier: 'Tier 3', cpm: '$0.50 – $3' },
      { country: 'Indonesia', tier: 'Tier 3', cpm: '$0.50 – $2.50' },
      { country: 'Philippines', tier: 'Tier 3', cpm: '$0.50 – $2.50' },
      { country: 'Pakistan', tier: 'Tier 3', cpm: '$0.30 – $2' },
      { country: 'Nigeria', tier: 'Tier 3', cpm: '$0.30 – $2' },
      { country: 'Egypt', tier: 'Tier 3', cpm: '$0.40 – $2' },
    ],
    methodology:
      'Ranges are aggregated from publicly shared creator earnings reports, ad-industry commentary, and commonly cited figures across niches, then rounded to broad bands. Actual CPM varies by niche, season (Q4 is highest), ad format, and audience. These are directional estimates, not guaranteed rates, and do not represent private YouTube data.',
    keywords: ['youtube cpm by country', 'youtube cpm 2026', 'highest cpm countries youtube'],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: 'youtube-rpm-by-niche',
    title: 'YouTube RPM by Niche (2026 Estimates)',
    metaTitle: 'YouTube RPM by Niche 2026 — Estimated Ranges | yttools.pro',
    metaDescription:
      'Estimated YouTube RPM ranges by niche for 2026. Finance, tech, and business channels earn the most per 1,000 views; entertainment and gaming earn less. Estimates, not payouts.',
    answerFirst:
      'RPM (revenue per 1,000 views, after YouTube’s cut) depends heavily on niche. Finance, business, and tech channels typically earn the highest RPM because advertisers pay more to reach those viewers, while gaming, vlogs, and entertainment tend to earn less. The figures below are estimated ranges.',
    intro:
      'RPM is what a channel actually keeps per 1,000 views across all revenue, after YouTube’s share. Unlike CPM, it reflects real take-home and is strongly shaped by niche because advertiser demand differs by topic. The table lists estimated 2026 RPM ranges by niche.',
    unitNote: 'RPM = creator revenue per 1,000 views (all views, after YouTube’s share), in USD.',
    columns: [
      { key: 'niche', label: 'Niche' },
      { key: 'rpm', label: 'Estimated RPM (USD)' },
      { key: 'note', label: 'Why' },
    ],
    rows: [
      { niche: 'Personal finance / investing', rpm: '$8 – $30', note: 'High-value advertisers' },
      { niche: 'Business / marketing', rpm: '$6 – $25', note: 'B2B ad demand' },
      { niche: 'Technology / software', rpm: '$5 – $18', note: 'Product advertisers' },
      { niche: 'Real estate', rpm: '$5 – $20', note: 'High ticket' },
      { niche: 'Education / how-to', rpm: '$4 – $12', note: 'Broad advertiser fit' },
      { niche: 'Health / fitness', rpm: '$3 – $11', note: 'Varies by sub-topic' },
      { niche: 'Food / cooking', rpm: '$3 – $9', note: 'Brand-friendly' },
      { niche: 'Travel', rpm: '$3 – $9', note: 'Seasonal' },
      { niche: 'Beauty / fashion', rpm: '$3 – $10', note: 'Brand sponsorships common' },
      { niche: 'Lifestyle / vlogs', rpm: '$2 – $6', note: 'Broad, lower value' },
      { niche: 'Gaming', rpm: '$1.50 – $5', note: 'Younger audience' },
      { niche: 'Entertainment / comedy', rpm: '$1 – $4', note: 'High views, low RPM' },
      { niche: 'Music', rpm: '$0.50 – $3', note: 'Rights complexity' },
      { niche: 'Kids / family', rpm: '$0.50 – $3', note: 'Limited ads (COPPA)' },
    ],
    methodology:
      'RPM ranges are compiled from publicly reported creator figures across niches and rounded to bands. Real RPM depends on audience country, watch time, ad formats, and the share of monetizable views. Finance and business skew high; kids and music skew low due to advertiser and policy factors. Estimates only — not payouts or private data.',
    keywords: ['youtube rpm by niche', 'highest paying youtube niches', 'youtube rpm 2026'],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: 'youtube-engagement-rate-benchmarks',
    title: 'YouTube Engagement Rate Benchmarks (2026)',
    metaTitle: 'YouTube Engagement Rate Benchmarks 2026 — By Channel Size | yttools.pro',
    metaDescription:
      'Estimated YouTube engagement rate benchmarks by channel size for 2026. Smaller channels usually see higher engagement rates than very large ones. Estimates, not guarantees.',
    answerFirst:
      'YouTube engagement rate (likes + comments relative to views) tends to be higher for smaller channels and lower for very large ones, because bigger audiences include more passive viewers. A common healthy band is roughly 2–6% for small channels, tapering toward 1–3% at scale. These are estimated benchmarks.',
    intro:
      'Engagement rate measures how actively viewers interact — typically likes and comments as a share of views. It is a rough signal of audience connection, not a ranking factor on its own. Benchmarks vary by size, niche, and format, so use these estimated bands as context, not targets.',
    unitNote: 'Engagement rate ≈ (likes + comments) ÷ views × 100. Shorts and long-form differ.',
    columns: [
      { key: 'size', label: 'Channel size' },
      { key: 'rate', label: 'Typical engagement rate' },
      { key: 'note', label: 'Context' },
    ],
    rows: [
      { size: 'Under 1K subs', rate: '3% – 8%', note: 'Tight-knit early audience' },
      { size: '1K – 10K subs', rate: '2.5% – 6%', note: 'Growing, still personal' },
      { size: '10K – 100K subs', rate: '2% – 5%', note: 'Broader reach' },
      { size: '100K – 1M subs', rate: '1.5% – 4%', note: 'More passive viewers' },
      { size: '1M – 10M subs', rate: '1% – 3%', note: 'Mass audience' },
      { size: 'Over 10M subs', rate: '0.5% – 2%', note: 'Very broad, lower rate' },
    ],
    methodology:
      'Benchmarks are estimated from commonly reported ranges across creators and rounded to bands. Engagement varies by niche (educational and community-driven channels skew higher), format (Shorts often get lower comment rates), and how you define engagement. Treat these as directional context, not targets or guarantees.',
    keywords: ['youtube engagement rate benchmark', 'good youtube engagement rate', 'average engagement rate youtube'],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: 'average-youtube-video-length',
    title: 'Average YouTube Video Length by Niche (2026)',
    metaTitle: 'Average YouTube Video Length by Niche 2026 | yttools.pro',
    metaDescription:
      'Estimated average YouTube video length by niche for 2026. Podcasts and gaming run longest; Shorts and news run shortest. Estimates compiled from public ranges.',
    answerFirst:
      'Average YouTube video length varies a lot by niche. Podcasts, gaming playthroughs, and live content run longest (often 20+ minutes to hours), while news, beauty, and Shorts-driven channels run shortest. Most long-form uploads fall in a rough 8–15 minute band. These are estimated ranges.',
    intro:
      'There is no single ideal length — the right duration is the one that holds attention for your topic. Still, typical lengths cluster by niche, which is useful context when planning. The table lists estimated average long-form durations by niche for 2026.',
    unitNote: 'Figures are for long-form uploads; Shorts are excluded except where noted.',
    columns: [
      { key: 'niche', label: 'Niche' },
      { key: 'length', label: 'Typical length' },
    ],
    rows: [
      { niche: 'Podcasts / interviews', length: '45 min – 2+ hrs' },
      { niche: 'Gaming / playthroughs', length: '15 – 40 min' },
      { niche: 'Education / tutorials', length: '8 – 20 min' },
      { niche: 'Tech reviews', length: '8 – 18 min' },
      { niche: 'Documentary / video essays', length: '15 – 40 min' },
      { niche: 'Vlogs', length: '8 – 16 min' },
      { niche: 'Cooking', length: '6 – 12 min' },
      { niche: 'Fitness', length: '10 – 30 min' },
      { niche: 'Beauty / fashion', length: '6 – 14 min' },
      { niche: 'News / commentary', length: '4 – 10 min' },
      { niche: 'Shorts-driven channels', length: 'under 1 min' },
    ],
    methodology:
      'Ranges are estimated from commonly observed durations across niches and rounded. Actual length depends on format, audience, and goals; longer is not inherently better. Optimize for retention, not a target duration. Estimates only.',
    keywords: ['average youtube video length', 'ideal youtube video length', 'youtube video length by niche'],
    lastUpdated: LAST_UPDATED,
  },
];

export function getDatasetBySlug(slug: string): Dataset | undefined {
  return datasets.find((d) => d.slug === slug);
}

export function datasetToCsv(dataset: Dataset): string {
  const header = dataset.columns.map((c) => c.label).join(',');
  const rows = dataset.rows.map((row) =>
    dataset.columns
      .map((c) => {
        const v = row[c.key] ?? '';
        return /[",]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
      })
      .join(','),
  );
  return [header, ...rows].join('\n');
}
