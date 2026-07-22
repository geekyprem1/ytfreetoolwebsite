import type { Metadata } from 'next';
import { TagsExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/tags-extractor';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Tag Extractor | Extract Hidden Video Tags | yttools.pro',
  },
  description:
    'Extract YouTube Video SEO Tags from any public video without an extension. Copy all, download TXT or CSV. No login required.',
  keywords: [
    'YouTube Video SEO Tags',
    'youtube tags extractor',
    'extract youtube tags',
    'competitor tags without extension',
    'video tags tool',
  ],
  alternates: { canonical: '/tags-extractor' },
  openGraph: {
    title: 'YouTube Tag Extractor | Extract Hidden Video Tags | yttools.pro',
    description:
      'See competitor YouTube Video SEO Tags without an extension. Copy, TXT, or CSV export in under 1.2 seconds.',
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
      title="YouTube Video SEO Tags Extractor"
      description="Extract YouTube Video SEO Tags from any public video in under 1.2 seconds — see competitor keyword metadata without a browser extension, then copy all or export TXT/CSV."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TagsExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
