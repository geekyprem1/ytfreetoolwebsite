import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { YouTubeDislikeCheckerClient } from './client';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-dislike-checker';

const title = 'YouTube Dislike Checker — Third-Party Estimate | yttools.pro';
const description = 'Check whether Return YouTube Dislike has an estimated dislike count for a YouTube video. Estimates are third-party, may be stale, and are not actual YouTube counts.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ['youtube dislike checker', 'youtube dislike estimate', 'estimated youtube dislikes', 'return youtube dislike checker'],
  alternates: { canonical: '/youtube-dislike-checker' },
  openGraph: { title, description, type: 'website' },
};

export default async function YouTubeDislikeCheckerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Dislike Estimate Checker"
      toolDescription="Check for a third-party estimate of a YouTube video's dislikes."
      toolSlug="youtube-dislike-checker"
      title="YouTube Dislike Checker"
      description="Look up a third-party dislike estimate for a public YouTube video when the provider has data."
      answerFirst="Paste a YouTube video URL to check for Return YouTube Dislike's estimated dislike count. This is a third-party estimate based partly on extension-user votes and archived or scraped data; YouTube does not publish the actual public dislike count. Estimates may be stale or unavailable."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YouTubeDislikeCheckerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
