import { tools } from './tools-metadata';
import { inspectYouTubeInput } from '@/lib/youtube/url-parser';

const suggestedSlugs = {
  video: ['thumbnail-downloader', 'tags-extractor', 'transcript-extractor', 'subtitle-downloader', 'video-statistics', 'youtube-description-extractor', 'youtube-comment-exporter', 'youtube-comment-sentiment-analyzer', 'youtube-video-summarizer'],
  channel: ['channel-statistics', 'channel-id-finder', 'youtube-profile-picture-downloader', 'channel-tags', 'monetization-checker', 'youtube-channel-age-checker', 'live-subscriber-count'],
  playlist: ['playlist-length-calculator'],
} as const;

/** Local parsing only; no video/channel lookup or third-party request. */
export function getHomeToolSuggestions(input: string) {
  const detected = inspectYouTubeInput(input);
  if (!detected) return null;
  const slugs: readonly string[] = suggestedSlugs[detected.type];
  return {
    type: detected.type,
    suggestions: slugs.flatMap(slug => {
      const tool = tools.find(tool => tool.slug === slug);
      return tool ? [{ tool, href: `${tool.route}?${new URLSearchParams({ url: detected.normalizedUrl })}` }] : [];
    }),
  };
}
