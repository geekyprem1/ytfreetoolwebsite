import type { Metadata } from 'next';
import { TagsExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/tags-extractor';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Tags Extractor & Generator - YT Toolkit | Extract Video Tags',
  },
  description:
    'Extract hidden SEO tags and keywords from any YouTube video URL. Copy competitor video tags to boost rankings and recommendations for free.',
  keywords: [
    'YouTube Video Tags Extractor',
    'YouTube Video SEO Tags',
    'extract youtube tags',
    'competitor tags without extension',
    'video tags tool',
  ],
  alternates: { canonical: '/tags-extractor' },
  openGraph: {
    title: 'YouTube Tags Extractor & Generator - YT Toolkit | Extract Video Tags',
    description:
      'Extract hidden SEO tags and keywords from any YouTube video URL. Copy competitor video tags for free - no extension required.',
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
      title="YouTube Video Tags Extractor"
      description="Extract YouTube Video SEO Tags from any public video in under 1.2 seconds - see competitor keyword metadata without a browser extension, then copy all or export TXT/CSV."
      answerFirst="YouTube (YT) Toolkit's YouTube Video Tags Extractor shows the YouTube Video SEO Tags attached to any public video - keyword metadata for search, not HTML or RFID tags. Paste a URL to extract the full visible list without an extension, then copy all or export CSV."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TagsExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
