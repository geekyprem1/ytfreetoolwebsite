import type { Metadata } from 'next';
import { TagsExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/tags-extractor';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Tag Extractor & Video Tags Tool | yttools.pro',
  },
  description:
    'Extract and copy tags from any public YouTube video. View SEO keywords, filter Shorts-related tags, and download TXT or CSV—free, no extension.',
  keywords: [
    'youtube tag extractor',
    'extract youtube tags',
    'youtube tags extractor',
    'copy tags from youtube video',
    'download youtube video tags',
    'youtube video tags tool',
  ],
  alternates: { canonical: '/tags-extractor' },
  openGraph: {
    title: 'Free YouTube Tag Extractor & Video Tags Tool | yttools.pro',
    description:
      'Extract, copy, filter, and download tags from any public YouTube video. Free TXT/CSV export with no browser extension.',
    images: toolOgImages('extractor', 'Free YouTube Tag Extractor'),
  },
};

export default async function TagsExtractorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Tags Extractor"
      toolDescription="Extract all tags from any YouTube video instantly. Copy or download as TXT."
      toolSlug="tags-extractor"
      title="Free YouTube Tag Extractor"
      description="Extract YouTube Video SEO Tags from any public video in under 1.2 seconds - see competitor keyword metadata without a browser extension, then copy all or export TXT/CSV."
      answerFirst="YouTube (YT) Toolkit's YouTube Video Tags Extractor shows the YouTube Video SEO Tags attached to any public video - keyword metadata for search, not HTML or RFID tags. Paste a URL to extract the full visible list without an extension, then copy all or export CSV."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Copy a public video URL', text: 'Use a YouTube watch or Shorts link for the video whose public tags you want to inspect.' },
        { name: 'Paste and analyze', text: 'Submit the link and let the tool read available video metadata.' },
        { name: 'Review or filter tags', text: 'Inspect the full tag list and optionally show only Shorts-related tags.' },
        { name: 'Copy or export', text: 'Copy individual tags or download the full list as TXT or CSV for your research sheet.' },
      ]}
    >
      <TagsExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
