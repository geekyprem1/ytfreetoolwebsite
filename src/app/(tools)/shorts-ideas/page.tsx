import type { Metadata } from 'next';
import { ShortsIdeasClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/shorts-ideas';

export const metadata: Metadata = {
  title: 'Free YouTube Shorts Idea Generator — 50 Viral Ideas',
  description:
    'Generate 50 viral YouTube Shorts ideas with trend and virality scores. AI powered. No login required.',
  keywords: ['youtube shorts ideas', 'shorts generator', 'viral shorts', 'shorts content'],
  alternates: { canonical: '/shorts-ideas' },
  openGraph: {
    title: 'Free YouTube Shorts Idea Generator — 50 Viral Ideas',
    description:
      'Generate 50 viral YouTube Shorts ideas with trend and virality scores. AI powered. No login required.',
  },
};

export default function ShortsIdeasPage() {
  return (
    <ToolPageShell
      toolName="Shorts Idea Generator"
      toolDescription="Generate 50 viral YouTube Shorts ideas with trend and virality scores."
      toolSlug="shorts-ideas"
      title="YouTube Shorts Idea Generator"
      description="Generate viral YouTube Shorts ideas with trend and virality scores. 50 ideas in one click."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ShortsIdeasClient />
    </ToolPageShell>
  );
}
