export interface ToolMetadata {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'downloader' | 'extractor' | 'ai-generator' | 'analytics' | 'seo';
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
