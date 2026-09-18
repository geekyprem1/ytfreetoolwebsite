export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'youtube-monetization-requirements-2027',
    title: 'YouTube Monetization Requirements in 2027: 8,000 Hours or 20M Shorts Views',
    description:
      'The YouTube Partner Program rules for new applicants from 1 February 2027, including the 8,000-hour and 20-million Shorts-view paths.',
    publishedAt: '2026-09-18',
    readingMinutes: 7,
  },
  {
    slug: 'how-many-views-for-8000-watch-hours',
    title: 'How Many Views Do You Need for 8,000 YouTube Watch Hours?',
    description:
      'A practical way to estimate views needed for 8,000 qualified YouTube watch hours using average view duration, with examples and a calculator.',
    publishedAt: '2026-09-18',
    readingMinutes: 6,
  },
  {
    slug: '20-million-shorts-views-in-90-days',
    title: '20 Million YouTube Shorts Views in 90 Days: Daily Targets & Plan',
    description:
      'What 20 million qualified public Shorts views in 90 days means for new YouTube Partner Program applicants from February 2027.',
    publishedAt: '2026-09-18',
    readingMinutes: 7,
  },
  {
    slug: 'qualified-youtube-watch-hours-what-counts',
    title: 'What Counts as Qualified YouTube Watch Hours for Monetization?',
    description:
      'Understand the qualified public watch-hour route for the YouTube Partner Program and how to plan using your own YouTube Studio eligibility data.',
    publishedAt: '2026-09-18',
    readingMinutes: 6,
  },
  {
    slug: 'youtube-monetization-current-vs-2027',
    title: 'YouTube Monetization: Current Requirements vs 2027 Changes',
    description:
      'A side-by-side comparison of the current YouTube Partner Program requirements and the rules announced for new applicants from 1 February 2027.',
    publishedAt: '2026-09-18',
    readingMinutes: 6,
  },
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
