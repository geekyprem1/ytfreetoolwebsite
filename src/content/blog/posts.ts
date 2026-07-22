export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'youtube-tag-ranking-2026',
    title: 'How YouTube Tag Ranking Works in 2026 (SEO vs AI Recommendation)',
    description:
      'What YouTube Video SEO Tags still do in 2026, how they differ from AI recommendations, and a practical 500-character tagging workflow.',
    publishedAt: '2026-07-22',
    readingMinutes: 8,
  },
  {
    slug: 'youtube-thumbnail-dimensions-guide',
    title: 'Optimal YouTube Thumbnail Dimensions & Resolution Guide',
    description:
      'Exact YouTube video thumbnail sizes from maxresdefault 1280×720 down to 120×90, plus packaging tips from Creator Academy principles.',
    publishedAt: '2026-07-22',
    readingMinutes: 6,
  },
  {
    slug: 'youtube-transcript-to-blog-post',
    title: 'How to Extract & Convert YouTube Transcripts into Blog Posts',
    description:
      'Turn YouTube Video Transcript & Subtitles into a timestamped text file, then reshape captions into a readable blog outline.',
    publishedAt: '2026-07-22',
    readingMinutes: 7,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
