import type { Metadata } from 'next';
import { TagsExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/tags-extractor';

export const metadata: Metadata = {
  title: 'Free YouTube Tags Extractor — Extract Video Tags Instantly',
  description:
    'Extract all tags from any YouTube video instantly. Copy tags or download as TXT. No login required. Find competitor tags for SEO research.',
  keywords: ['youtube tags extractor', 'extract youtube tags', 'youtube tag finder', 'video tags tool'],
  alternates: { canonical: '/tags-extractor' },
  openGraph: {
    title: 'Free YouTube Tags Extractor — Extract Video Tags Instantly',
    description:
      'Extract all tags from any YouTube video instantly. Copy tags or download as TXT. No login required.',
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
      title="Free YouTube Tags Extractor"
      description="Extract tags from any YouTube video. Copy, download, and analyze competitor video tags for SEO research."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TagsExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
