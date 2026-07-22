import type { Metadata } from 'next';
import { HookGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/hook-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'AI YouTube Hook Generator (Free) | yttools.pro',
  },
  description:
    'Free AI YouTube hook generator for the first 3 seconds. Get question, story, curiosity, and shock openings that earn watch time. Paste a topic. No login.',
  keywords: ['youtube hook generator', 'video hooks', 'attention hooks', 'opening hooks'],
  alternates: { canonical: '/hook-generator' },
  openGraph: {
    title: 'AI YouTube Hook Generator (Free) | yttools.pro',
    description:
      'Free AI YouTube hook generator for the first 3 seconds. Get question, story, curiosity, and shock openings that earn watch time. Paste a topic. No login.',
  },
};

export default function HookGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Hook Generator"
      toolDescription="Generate powerful hooks for your YouTube videos — questions, stories, curiosity gaps, and shock statements."
      toolSlug="hook-generator"
      title="AI YouTube Hook Generator"
      description="Generate free AI YouTube hooks for the first 3 seconds—question, story, curiosity, and shock lines—not blog intros. Enter a topic and tone to draft cold opens that earn watch time."
      answerFirst="YouTube (YT) Toolkit's Hook Generator writes AI cold opens for the first 3 seconds - question, story, curiosity, and shock lines that earn watch time. Free with no login - enter a topic and tone to draft hooks fast."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <HookGeneratorClient />
    </ToolPageShell>
  );
}
