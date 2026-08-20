export interface ToolMetadata {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'downloader' | 'extractor' | 'ai-generator' | 'analytics' | 'seo' | 'calculator';
  route: string;
  phase: 1 | 2 | 3;
}

export const tools: ToolMetadata[] = [
  {
    slug: 'thumbnail-downloader',
    name: 'Thumbnail Downloader',
    description: 'Download YouTube thumbnails in HD, SD, HQ quality. Free and no login required.',
    icon: 'Image',
    category: 'downloader',
    route: '/thumbnail-downloader',
    phase: 1,
  },
  {
    slug: 'tags-extractor',
    name: 'Tags Extractor',
    description: 'Extract all tags from any YouTube video instantly. Copy or download as TXT.',
    icon: 'Tags',
    category: 'extractor',
    route: '/tags-extractor',
    phase: 1,
  },
  {
    slug: 'channel-tags',
    name: 'Channel Tags',
    description: 'Discover channel keywords by analyzing recent video tags.',
    icon: 'Hash',
    category: 'extractor',
    route: '/channel-tags',
    phase: 2,
  },
  {
    slug: 'transcript-extractor',
    name: 'Transcript Extractor',
    description: 'Get full video transcripts with timestamps. Copy, download, or AI summarize.',
    icon: 'FileText',
    category: 'extractor',
    route: '/transcript-extractor',
    phase: 1,
  },
  {
    slug: 'title-generator',
    name: 'AI Title Generator',
    description: 'Generate SEO-optimized, click-worthy YouTube titles with AI.',
    icon: 'Sparkles',
    category: 'ai-generator',
    route: '/title-generator',
    phase: 1,
  },
  {
    slug: 'description-generator',
    name: 'AI Description Generator',
    description: 'Generate complete video descriptions with chapters, hashtags, and CTAs.',
    icon: 'PenLine',
    category: 'ai-generator',
    route: '/description-generator',
    phase: 1,
  },
  {
    slug: 'hashtag-generator',
    name: 'AI Hashtag Generator',
    description: 'Generate trending, niche, and broad hashtags for your YouTube videos.',
    icon: 'HashIcon',
    category: 'ai-generator',
    route: '/hashtag-generator',
    phase: 2,
  },
  {
    slug: 'video-statistics',
    name: 'Video Statistics',
    description: 'View detailed analytics for any YouTube video. Views, likes, comments, and more.',
    icon: 'BarChart3',
    category: 'analytics',
    route: '/video-statistics',
    phase: 2,
  },
  {
    slug: 'channel-statistics',
    name: 'Channel Statistics',
    description: 'Analyze any YouTube channel. Subscribers, total views, recent uploads.',
    icon: 'Users',
    category: 'analytics',
    route: '/channel-statistics',
    phase: 2,
  },
  {
    slug: 'monetization-checker',
    name: 'YouTube Monetization Checker',
    description:
      'Estimate whether a YouTube channel is monetized using public signals and a confidence score.',
    icon: 'BadgeDollarSign',
    category: 'analytics',
    route: '/monetization-checker',
    phase: 2,
  },
  {
    slug: 'keyword-generator',
    name: 'Keyword Generator',
    description: 'Find high-ranking YouTube keywords with search intent and difficulty analysis.',
    icon: 'Search',
    category: 'ai-generator',
    route: '/keyword-generator',
    phase: 2,
  },
  {
    slug: 'hook-generator',
    name: 'Hook Generator',
    description: 'Create powerful hooks that capture attention in the first 3 seconds.',
    icon: 'Zap',
    category: 'ai-generator',
    route: '/hook-generator',
    phase: 3,
  },
  {
    slug: 'timestamp-generator',
    name: 'Timestamp Generator',
    description: 'Auto-generate video chapters from transcripts with AI precision.',
    icon: 'Clock',
    category: 'ai-generator',
    route: '/timestamp-generator',
    phase: 3,
  },
  {
    slug: 'shorts-ideas',
    name: 'Shorts Idea Generator',
    description: 'Get 50 viral YouTube Shorts ideas with trend and virality scores.',
    icon: 'Lightbulb',
    category: 'ai-generator',
    route: '/shorts-ideas',
    phase: 3,
  },
  {
    slug: 'seo-score-checker',
    name: 'SEO Score Checker',
    description: 'Grade your video SEO with a detailed score breakdown and improvement tips.',
    icon: 'Target',
    category: 'seo',
    route: '/seo-score-checker',
    phase: 2,
  },
  {
    slug: 'title-analyzer',
    name: 'Title Analyzer',
    description: 'Compare two titles and predict which will get more clicks and rank better.',
    icon: 'GitCompare',
    category: 'seo',
    route: '/title-analyzer',
    phase: 3,
  },
  // Calculator category — SEO gold, simple fast no-login
  {
    slug: 'youtube-money-calculator',
    name: 'YouTube Money Calculator',
    description: 'Estimate YouTube earnings from views, CPM and monetized play rate. Free, instant.',
    icon: 'Calculator',
    category: 'calculator',
    route: '/youtube-money-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-rpm-calculator',
    name: 'YouTube RPM Calculator',
    description: 'Calculate RPM (revenue per mille) from total revenue and views.',
    icon: 'TrendingUp',
    category: 'calculator',
    route: '/youtube-rpm-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-cpm-calculator',
    name: 'YouTube CPM Calculator',
    description: 'Calculate CPM from ad revenue and monetized views instantly.',
    icon: 'DollarSign',
    category: 'calculator',
    route: '/youtube-cpm-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-watch-time-calculator',
    name: 'YouTube Watch Time Calculator',
    description: 'Convert views and average view duration into total watch hours.',
    icon: 'Clock',
    category: 'calculator',
    route: '/youtube-watch-time-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-engagement-calculator',
    name: 'YouTube Engagement Rate Calculator',
    description: 'Measure engagement rate from likes, comments and views.',
    icon: 'Heart',
    category: 'calculator',
    route: '/youtube-engagement-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-subscriber-growth-calculator',
    name: 'YouTube Subscriber Growth Calculator',
    description: 'Track subscriber growth rate, daily gain and projections.',
    icon: 'Users',
    category: 'calculator',
    route: '/youtube-subscriber-growth-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-views-to-money-calculator',
    name: 'YouTube Views to Money Calculator',
    description: 'Convert any view count to estimated earnings at your RPM.',
    icon: 'Eye',
    category: 'calculator',
    route: '/youtube-views-to-money-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-shorts-earnings-calculator',
    name: 'YouTube Shorts Earnings Calculator',
    description: 'Estimate Shorts revenue from views with Shorts RPM range.',
    icon: 'Smartphone',
    category: 'calculator',
    route: '/youtube-shorts-earnings-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-live-earnings-calculator',
    name: 'YouTube Live Earnings Calculator',
    description: 'Estimate Live stream earnings from Super Chats, ads and views.',
    icon: 'Radio',
    category: 'calculator',
    route: '/youtube-live-earnings-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-upload-frequency-calculator',
    name: 'YouTube Upload Frequency Calculator',
    description: 'Plan upload schedule — videos per week, month and consistency score.',
    icon: 'Calendar',
    category: 'calculator',
    route: '/youtube-upload-frequency-calculator',
    phase: 2,
  },
  {
    slug: 'youtube-average-view-duration-calculator',
    name: 'YouTube Average View Duration Calculator',
    description: 'Calculate average view duration from watch time and views.',
    icon: 'Timer',
    category: 'calculator',
    route: '/youtube-average-view-duration-calculator',
    phase: 2,
  },
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByPhase(phase: 1 | 2 | 3): ToolMetadata[] {
  return tools.filter((t) => t.phase === phase);
}

export function getRelatedTools(currentSlug: string, count = 4): ToolMetadata[] {
  const current = getToolBySlug(currentSlug);
  if (!current) return tools.slice(0, count);

  const sameCategory = tools.filter((t) => t.category === current.category && t.slug !== currentSlug);
  const others = tools.filter((t) => t.category !== current.category && t.slug !== currentSlug);

  return [...sameCategory, ...others].slice(0, count);
}

export function getPopularTools(count = 8): ToolMetadata[] {
  return tools.slice(0, count);
}
