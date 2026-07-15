import type { Metadata } from 'next';
import { TitleGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/title-generator';

export const metadata: Metadata = {
  title: 'Free AI YouTube Title Generator — SEO Optimized Titles',
  description:
    'Generate SEO-optimized, click-worthy YouTube titles with AI. Choose tone, language, and get multiple title ideas. No login required.',
  keywords: [
    'youtube title generator',
    'ai title generator',
    'seo titles',
    'youtube title ideas',
    'video title maker',
  ],
  alternates: { canonical: '/title-generator' },
  openGraph: {
    title: 'Free AI YouTube Title Generator — SEO Optimized Titles',
    description:
      'Generate SEO-optimized, click-worthy YouTube titles with AI. Choose tone, language, and get multiple ideas.',
  },
};

export default function TitleGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Title Generator"
      toolDescription="Generate SEO-optimized, click-worthy YouTube titles with AI."
      toolSlug="title-generator"
      title="AI YouTube Title Generator"
      description="Generate SEO-optimized, click-worthy YouTube titles with AI. Choose your tone, language, and get multiple ideas."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleGeneratorClient />
    </ToolPageShell>
  );
}
