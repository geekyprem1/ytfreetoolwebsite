import type { Metadata } from 'next';
import { HookGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/hook-generator';

export const metadata: Metadata = {
  title: 'Free AI YouTube Hook Generator — Capture Attention in 3 Seconds',
  description:
    'Generate powerful hooks for your YouTube videos — questions, stories, curiosity gaps, and shock statements.',
  keywords: ['youtube hook generator', 'video hooks', 'attention hooks', 'opening hooks'],
  alternates: { canonical: '/hook-generator' },
  openGraph: {
    title: 'Free AI YouTube Hook Generator — Capture Attention in 3 Seconds',
    description:
      'Generate powerful hooks for your YouTube videos — questions, stories, curiosity gaps, and shock statements.',
  },
};

export default function HookGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Hook Generator"
      toolDescription="Generate powerful hooks for your YouTube videos — questions, stories, curiosity gaps, and shock statements."
      toolSlug="hook-generator"
      title="AI YouTube Hook Generator"
      description="Generate powerful hooks that grab attention in the first 3 seconds. Question, story, curiosity, and shock hooks."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <HookGeneratorClient />
    </ToolPageShell>
  );
}
