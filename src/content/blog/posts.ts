export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  dateModified?: string;
  readingMinutes: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-get-youtube-transcript',
    title: 'How to Get the Transcript of a YouTube Video (YouTube to Text)',
    description:
      'Find the transcript inside YouTube or export a captioned video as text with optional timestamps. Includes language, accuracy, and no-caption troubleshooting.',
    publishedAt: '2026-09-28',
    readingMinutes: 6,
  },
  {
    slug: 'srt-vs-vtt-vs-txt',
    title: 'SRT vs VTT vs TXT: Which Transcript Format Should You Download?',
    description:
      'Compare SRT, VTT, and plain TXT transcripts with real cue examples, timing syntax, and a quick guide to choosing the right export.',
    publishedAt: '2026-09-28',
    readingMinutes: 6,
  },
  {
    slug: 'how-to-download-youtube-thumbnails-all-sizes',
    title: 'How to Download YouTube Thumbnails in Available Sizes',
    description:
      'Save a YouTube video thumbnail, understand common CDN sizes from 120×90 to 1280×720, and know when higher-resolution API variants exist.',
    publishedAt: '2026-09-28',
    readingMinutes: 6,
  },
  {
    slug: 'youtube-seo-tips-2027',
    title: 'YouTube SEO Tips for 2027: A Practical Video Checklist',
    description:
      'Plan your YouTube SEO for 2027: choose a specific topic, write an accurate title and description, test packaging, and learn from search traffic.',
    publishedAt: '2026-09-28',
    readingMinutes: 7,
  },
  {
    slug: 'youtube-keyword-research-guide',
    title: 'YouTube Keyword Research: Find Topics Viewers Actually Search',
    description:
      'Research YouTube keywords without invented volume numbers. Use Studio Trends, real search results, viewer intent, and your own search terms to plan a video.',
    publishedAt: '2026-09-28',
    readingMinutes: 7,
  },
  {
    slug: 'how-to-grow-a-youtube-channel-2027',
    title: 'How to Grow a YouTube Channel in 2027: A Practical Plan',
    description:
      'Plan your YouTube channel growth in 2027 around viewer problems, clear packaging, retention, and repeat viewers—without upload-frequency myths.',
    publishedAt: '2026-09-28',
    readingMinutes: 7,
  },
  {
    slug: 'best-free-youtube-tools-2027',
    title: 'Best Free YouTube Tools for 2027: An Honest Creator Toolkit',
    description:
      'A task-based guide to free YouTube tools for research, editing, packaging, transcripts, and analytics, including what each free tool cannot do.',
    publishedAt: '2026-09-28',
    readingMinutes: 7,
  },
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
    title: 'YouTube Thumbnail Size & Dimensions: 1280x720 Guide',
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
