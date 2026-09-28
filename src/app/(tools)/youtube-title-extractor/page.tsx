import type { Metadata } from 'next';
import { TitleExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-title-extractor';

const title = 'YouTube Title Extractor — Get a Video Title from Its URL | yttools.pro';
const description =
  'Get the exact title of any YouTube video from its URL. Copy the title and see its character count against the 100-character limit. Free, instant, no login.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube title extractor',
    'get youtube video title',
    'copy youtube title',
    'youtube video title from url',
    'extract youtube title',
  ],
  alternates: { canonical: '/youtube-title-extractor' },
  openGraph: { title, description },
};

export default async function TitleExtractorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Title Extractor"
      toolDescription="Get the exact title of any YouTube video from its URL."
      toolSlug="youtube-title-extractor"
      title="YouTube Title Extractor"
      description="Paste a YouTube video link and get its exact title as clean, copyable text, with a character count against YouTube’s 100-character limit."
      answerFirst="YouTube (YT) Toolkit's Title Extractor returns the exact title of any public YouTube video from its URL. Copy the title in one click and see its character count. Free, instant, no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
