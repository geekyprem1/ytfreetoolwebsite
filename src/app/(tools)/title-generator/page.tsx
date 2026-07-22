import type { Metadata } from 'next';
import { TitleGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/title-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'AI YouTube Title Generator (Free Clickable Titles) | yttools.pro',
  },
  description:
    'Free AI YouTube title generator for clickable SEO headlines. Get options near the 40-60 character sweet spot. Choose tone and language. No login required.',
  keywords: [
    'youtube title generator',
    'ai title generator',
    'seo titles',
    'youtube title ideas',
    'video title maker',
  ],
  alternates: { canonical: '/title-generator' },
  openGraph: {
    title: 'AI YouTube Title Generator (Free Clickable Titles) | yttools.pro',
    description:
      'Free AI YouTube title generator for clickable SEO headlines. Get options near the 40-60 character sweet spot. Choose tone and language. No login required.',
  },
};

export default function TitleGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Title Generator"
      toolDescription="Generate SEO-optimized, click-worthy YouTube titles with AI."
      toolSlug="title-generator"
      title="AI YouTube Title Generator"
      description="Generate free AI YouTube titles built to earn clicks—not blog headlines. Get SEO-friendly options near the 40–60 character range, choose a tone, and copy multiple clickable ideas with no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleGeneratorClient />
    </ToolPageShell>
  );
}
