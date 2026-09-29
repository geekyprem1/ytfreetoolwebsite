import type { ToolCategory, ToolMetadata } from '@/content/tools-metadata';

/** Common task names that lead to an existing tool with a different public name. */
export const toolSearchAliases: Record<string, readonly string[]> = {
  'youtube-description-extractor': ['description viewer', 'youtube description viewer', 'video description viewer'],
  'youtube-comment-exporter': ['comment finder', 'comments viewer', 'search comments', 'comment search'],
  'youtube-dislike-checker': ['youtube dislikes', 'dislike estimate', 'return youtube dislike', 'dislike viewer'],
  'youtube-comment-sentiment-analyzer': ['comment sentiment', 'youtube sentiment analysis', 'audience feedback analyzer', 'analyze comment tone'],
  'youtube-creator-income-calculator': [
    'creator income',
    'youtube creator income',
    'creator revenue calculator',
    'youtube channel income',
    'sponsorship income calculator',
    'affiliate revenue calculator',
  ],
  'thumbnail-downloader': ['thumbnail viewer', 'image tool', 'youtube thumbnail viewer'],
  'youtube-profile-picture-downloader': ['profile downloader', 'channel avatar viewer'],
  'youtube-banner-downloader': ['channel art viewer'],
  'video-statistics': ['metadata viewer', 'video metadata', 'upload date finder', 'video info'],
  'channel-statistics': ['channel metadata', 'channel info', 'recent upload history'],
  'title-generator': ['clickbait title generator', 'catchy title ideas'],
  'youtube-video-ideas-generator': ['channel ideas', 'video topic ideas'],
};

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function searchTools(
  availableTools: readonly ToolMetadata[],
  query: string,
  category: ToolCategory | 'all' = 'all',
): ToolMetadata[] {
  const normalizedQuery = normalize(query);
  const words = normalizedQuery.split(' ').filter(Boolean);

  return availableTools.filter((tool) => {
    if (category !== 'all' && tool.category !== category) return false;
    if (!normalizedQuery) return true;

    const searchable = normalize([
      tool.name,
      tool.description,
      tool.slug,
      tool.category,
      ...(toolSearchAliases[tool.slug] ?? []),
    ].join(' '));
    return words.every((word) => searchable.includes(word));
  });
}
