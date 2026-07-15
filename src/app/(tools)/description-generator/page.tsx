import type { Metadata } from 'next';
import { DescriptionGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/description-generator';

export const metadata: Metadata = {
  title: 'Free AI YouTube Description Generator — SEO Optimized Descriptions',
  description:
    'Generate complete YouTube video descriptions with chapters, hashtags, and CTAs using AI. No login required. Free and easy to use.',
  keywords: [
    'youtube description generator',
    'ai description generator',
    'video description',
    'seo description',
  ],
  alternates: { canonical: '/description-generator' },
  openGraph: {
    title: 'Free AI YouTube Description Generator — SEO Optimized Descriptions',
    description:
      'Generate complete YouTube video descriptions with chapters, hashtags, and CTAs using AI. No login required.',
  },
};

export default function DescriptionGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Description Generator"
      toolDescription="Generate complete video descriptions with chapters, hashtags, and CTAs using AI."
      toolSlug="description-generator"
      title="AI YouTube Description Generator"
      description="Generate complete, SEO-optimized video descriptions with chapters, hashtags, and CTAs. Powered by AI."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <DescriptionGeneratorClient />
    </ToolPageShell>
  );
}
