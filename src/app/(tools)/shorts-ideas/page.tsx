import type { Metadata } from 'next';
import { ShortsIdeasClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/shorts-ideas';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Shorts Idea Generator (Free) | yttools.pro',
  },
  description:
    'Free YouTube Shorts idea generator with trend and virality scores. Get up to 50 vertical video concepts from a niche seed. AI powered, no login required.',
  keywords: ['youtube shorts ideas', 'shorts generator', 'viral shorts', 'shorts content'],
  alternates: { canonical: '/shorts-ideas' },
  openGraph: {
    title: 'YouTube Shorts Idea Generator (Free) | yttools.pro',
    description:
      'Free YouTube Shorts idea generator with trend and virality scores. Get up to 50 vertical video concepts from a niche seed. AI powered, no login required.',
  },
};

export default function ShortsIdeasPage() {
  return (
    <ToolPageShell
      toolName="Shorts Idea Generator"
      toolDescription="Generate 50 viral YouTube Shorts ideas with trend and virality scores."
      toolSlug="shorts-ideas"
      title="YouTube Shorts Idea Generator"
      description="Generate free YouTube Shorts ideas with trend and virality scores—up to 50 concepts—not long-form blog topics. Enter a niche seed to plan vertical videos you can film this week."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ShortsIdeasClient />
    </ToolPageShell>
  );
}
