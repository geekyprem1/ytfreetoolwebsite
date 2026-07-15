import type { Metadata } from 'next';
import { HashtagGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/hashtag-generator';

export const metadata: Metadata = {
  title: 'Free AI YouTube Hashtag Generator — Trending Hashtags',
  description:
    'Generate trending, niche, and broad hashtags for YouTube videos with AI. Grouped by category for better discoverability.',
  keywords: ['youtube hashtag generator', 'ai hashtags', 'trending hashtags', 'video hashtags'],
  alternates: { canonical: '/hashtag-generator' },
  openGraph: {
    title: 'Free AI YouTube Hashtag Generator — Trending Hashtags',
    description:
      'Generate trending, niche, and broad hashtags for YouTube videos with AI. Grouped by category for better discoverability.',
  },
};

export default function HashtagGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Hashtag Generator"
      toolDescription="Generate trending, niche, and broad hashtags for your YouTube videos."
      toolSlug="hashtag-generator"
      title="AI YouTube Hashtag Generator"
      description="Generate trending, niche, and broad hashtags for your YouTube videos. Grouped and ready to copy."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <HashtagGeneratorClient />
    </ToolPageShell>
  );
}
