export type ToolCategory =
  | 'downloader'
  | 'extractor'
  | 'ai-generator'
  | 'analytics'
  | 'seo'
  | 'calculator';

export interface ToolMetadata {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  route: string;
  /** Release phase. See TOOL_PHASES in @/lib/utils/constants. */
  phase: number;
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
  {
    slug: 'channel-id-finder',
    name: 'Channel ID Finder',
    description: 'Find any YouTube channel ID (UC…) from a URL, @handle, or custom URL.',
    icon: 'Fingerprint',
    category: 'extractor',
    route: '/channel-id-finder',
    phase: 4,
  },
  {
    slug: 'youtube-profile-picture-downloader',
    name: 'Profile Picture Downloader',
    description: 'Download any YouTube channel profile picture (avatar) in full resolution.',
    icon: 'UserCircle',
    category: 'downloader',
    route: '/youtube-profile-picture-downloader',
    phase: 4,
  },
  {
    slug: 'youtube-banner-downloader',
    name: 'Banner Downloader',
    description: 'Download any YouTube channel banner (channel art) in full resolution.',
    icon: 'GalleryHorizontal',
    category: 'downloader',
    route: '/youtube-banner-downloader',
    phase: 4,
  },
  {
    slug: 'subtitle-downloader',
    name: 'Subtitle Downloader',
    description: 'Download YouTube subtitles as SRT, VTT, or plain TXT with timestamps.',
    icon: 'Captions',
    category: 'downloader',
    route: '/subtitle-downloader',
    phase: 4,
  },
  {
    slug: 'playlist-length-calculator',
    name: 'Playlist Length Calculator',
    description: 'Total duration, video count, and watch time at 1.25x–2x for any playlist.',
    icon: 'ListVideo',
    category: 'calculator',
    route: '/playlist-length-calculator',
    phase: 4,
  },
  {
    slug: 'youtube-embed-code-generator',
    name: 'Embed Code Generator',
    description: 'Generate responsive YouTube embed code with privacy and playback options.',
    icon: 'Code2',
    category: 'seo',
    route: '/youtube-embed-code-generator',
    phase: 4,
  },
  {
    slug: 'youtube-timestamp-link-generator',
    name: 'Timestamp Link Generator',
    description: 'Create a YouTube link that starts playing at a specific time.',
    icon: 'Clock',
    category: 'seo',
    route: '/youtube-timestamp-link-generator',
    phase: 4,
  },
  {
    slug: 'live-subscriber-count',
    name: 'Live Subscriber Count',
    description: 'Track any YouTube channel’s subscriber count in real time.',
    icon: 'Radio',
    category: 'analytics',
    route: '/live-subscriber-count',
    phase: 5,
  },
  {
    slug: 'live-view-count',
    name: 'Live View Count',
    description: 'Track a YouTube video’s view count in real time.',
    icon: 'Eye',
    category: 'analytics',
    route: '/live-view-count',
    phase: 5,
  },
  {
    slug: 'youtube-comment-picker',
    name: 'Comment Picker',
    description: 'Pick a random giveaway winner from a YouTube video’s comments.',
    icon: 'Gift',
    category: 'analytics',
    route: '/youtube-comment-picker',
    phase: 5,
  },
  {
    slug: 'youtube-comment-exporter',
    name: 'Comment Exporter',
    description: 'Export a YouTube video’s comments to CSV or JSON.',
    icon: 'MessageSquare',
    category: 'extractor',
    route: '/youtube-comment-exporter',
    phase: 5,
  },
  {
    slug: 'channel-comparison',
    name: 'Channel Comparison',
    description: 'Compare up to three YouTube channels side by side.',
    icon: 'GitCompare',
    category: 'analytics',
    route: '/channel-comparison',
    phase: 5,
  },
  {
    slug: 'youtube-trending',
    name: 'Trending Videos',
    description: 'See today’s trending YouTube videos by country.',
    icon: 'TrendingUp',
    category: 'analytics',
    route: '/youtube-trending',
    phase: 5,
  },
  {
    slug: 'youtube-video-summarizer',
    name: 'Video Summarizer',
    description: 'Summarize any YouTube video with AI — TL;DR and key takeaways.',
    icon: 'ScrollText',
    category: 'ai-generator',
    route: '/youtube-video-summarizer',
    phase: 5,
  },
  {
    slug: 'youtube-script-generator',
    name: 'Script Generator',
    description: 'Generate a full YouTube video script with AI — hook, body, and CTA.',
    icon: 'FileEdit',
    category: 'ai-generator',
    route: '/youtube-script-generator',
    phase: 5,
  },
  {
    slug: 'youtube-channel-name-generator',
    name: 'Channel Name Generator',
    description: 'Generate channel name ideas with AI and check @handle availability.',
    icon: 'Signature',
    category: 'ai-generator',
    route: '/youtube-channel-name-generator',
    phase: 5,
  },
  {
    slug: 'youtube-video-ideas-generator',
    name: 'Video Ideas Generator',
    description: 'Generate searchable YouTube video ideas with titles and intent.',
    icon: 'Lightbulb',
    category: 'ai-generator',
    route: '/youtube-video-ideas-generator',
    phase: 5,
  },
  {
    slug: 'thumbnail-preview-tester',
    name: 'Thumbnail Preview Tester',
    description: 'Preview a thumbnail in real YouTube layouts and A/B compare two.',
    icon: 'ImagePlay',
    category: 'seo',
    route: '/thumbnail-preview-tester',
    phase: 5,
  },
  {
    slug: 'youtube-monetization-progress-calculator',
    name: 'Monetization Progress Calculator',
    description: 'Track current and 2027 YouTube Partner Program progress with a clear daily plan.',
    icon: 'Target',
    category: 'calculator',
    route: '/youtube-monetization-progress-calculator',
    phase: 6,
  },
  {
    slug: 'youtube-shorts-eligibility-checker',
    name: 'Shorts Eligibility Checker',
    description: 'Check a local video\'s duration and aspect ratio against YouTube Shorts format rules.',
    icon: 'Smartphone',
    category: 'seo',
    route: '/youtube-shorts-eligibility-checker',
    phase: 6,
  },
  {
    slug: 'youtube-end-screen-planner',
    name: 'End Screen Layout Planner',
    description: 'Plan up to four end-screen elements on a local 16:9 frame and export a PNG guide.',
    icon: 'LayoutTemplate',
    category: 'seo',
    route: '/youtube-end-screen-planner',
    phase: 6,
  },
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByPhase(phase: number): ToolMetadata[] {
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

/**
 * Derived counts — never hardcode tool numbers in copy, metadata, or schema.
 * Import these instead so every surface stays correct when a tool is added.
 */
export const toolCount = tools.length;

export const calculatorCount = tools.filter((t) => t.category === 'calculator').length;

export function getToolsByCategory(category: ToolCategory): ToolMetadata[] {
  return tools.filter((t) => t.category === category);
}
