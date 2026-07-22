import type { Metadata } from 'next';
import { HashtagGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/hashtag-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'AI YouTube Hashtag Generator (Free) | yttools.pro',
  },
  description:
    'Free AI YouTube hashtag generator for broad, niche, and trending tags. Stay within the 15-hashtag limit and copy a focused set for discoverability. No login.',
  keywords: ['youtube hashtag generator', 'ai hashtags', 'trending hashtags', 'video hashtags'],
  alternates: { canonical: '/hashtag-generator' },
  openGraph: {
    title: 'AI YouTube Hashtag Generator (Free) | yttools.pro',
    description:
      'Free AI YouTube hashtag generator for broad, niche, and trending tags. Stay within the 15-hashtag limit and copy a focused set for discoverability. No login.',
  },
};

export default function HashtagGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Hashtag Generator"
      toolDescription="Generate trending, niche, and broad hashtags for your YouTube videos."
      toolSlug="hashtag-generator"
      title="AI YouTube Hashtag Generator"
      description="Generate free AI YouTube hashtags grouped by broad, niche, and trending—not Instagram or TikTok tags. Stay inside YouTube’s 15-hashtag limit and copy a focused set for better discoverability."
      answerFirst="YouTube (YT) Toolkit's Hashtag Generator builds trending and niche YouTube hashtags grouped by broad, niche, and trending sets. Free, no login - stay inside the 15-hashtag limit and copy a focused set for discoverability."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <HashtagGeneratorClient />
    </ToolPageShell>
  );
}
