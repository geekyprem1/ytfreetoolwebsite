import type { Metadata } from 'next';
import { DescriptionGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/description-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'AI YouTube Description Generator (Free) | yttools.pro',
  },
  description:
    'Free AI YouTube description generator with summary, chapters, hashtags, and CTAs. Paste a topic and keyword for a Studio-ready plain-text draft. No login.',
  keywords: [
    'youtube description generator',
    'ai description generator',
    'video description',
    'seo description',
  ],
  alternates: { canonical: '/description-generator' },
  openGraph: {
    title: 'AI YouTube Description Generator (Free) | yttools.pro',
    description:
      'Free AI YouTube description generator with summary, chapters, hashtags, and CTAs. Paste a topic and keyword for a Studio-ready plain-text draft. No login.',
  },
};

export default function DescriptionGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Description Generator"
      toolDescription="Generate complete video descriptions with chapters, hashtags, and CTAs using AI."
      toolSlug="description-generator"
      title="AI YouTube Description Generator"
      description="Create a free AI YouTube description with summary, chapters, hashtags, and CTAs—not a product listing blurb. Paste a topic and keyword to get a Studio-ready plain-text draft in seconds."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <DescriptionGeneratorClient />
    </ToolPageShell>
  );
}
