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
    'Extract tags from any public YouTube video, then copy or export them as TXT or CSV. Free, fast, and no browser extension required.',
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
      'Extract, copy, filter, and export tags from any public YouTube video. Free TXT/CSV downloads with no browser extension.',
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
      toolDescription="Extract tags from any public YouTube video. Copy or export the list as TXT or CSV."
      toolSlug="tags-extractor"
      title="Free YouTube Tag Extractor"
      description="Extract tags from any public YouTube video, then copy or export the list as TXT or CSV. Review competitor metadata without a browser extension."
      answerFirst="This free YouTube video tag extractor shows the public tags attached to a video. Paste a URL to review, copy, or export the list as TXT or CSV—no browser extension required."
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
