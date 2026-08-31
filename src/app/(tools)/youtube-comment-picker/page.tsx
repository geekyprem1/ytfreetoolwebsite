import type { Metadata } from 'next';
import { CommentPickerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-comment-picker';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Comment Picker — Giveaway Winner Generator (Free) | yttools.pro',
  },
  description:
    'Pick a random YouTube giveaway winner from a video’s comments. Filter duplicates, keywords, and minimum likes, then draw a fair winner with a shareable proof seed. Free, no login.',
  keywords: [
    'youtube comment picker',
    'youtube giveaway picker',
    'random comment picker',
    'youtube giveaway winner generator',
  ],
  alternates: { canonical: '/youtube-comment-picker' },
  openGraph: {
    title: 'YouTube Comment Picker — Giveaway Winner Generator (Free) | yttools.pro',
    description:
      'Pick a random YouTube giveaway winner from a video’s comments. Fair, filterable, with a proof seed. Free, no login.',
  },
};

export default async function CommentPickerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Comment Picker"
      toolDescription="Pick a random giveaway winner from a YouTube video’s comments."
      toolSlug="youtube-comment-picker"
      title="YouTube Comment Picker"
      description="Run a fair YouTube giveaway. Load a video’s comments, filter out duplicates and off-topic entries, require a keyword or minimum likes, then draw one or more random winners with a shareable proof seed."
      answerFirst="Paste a YouTube video URL and this free tool loads its comments so you can draw a random giveaway winner. Filter duplicate entries, require a keyword or minimum likes, pick multiple winners, and share the seed as fairness proof. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <CommentPickerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
