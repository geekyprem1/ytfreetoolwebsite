import type { Metadata } from 'next';
import { DescriptionExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-description-extractor';

const title = 'YouTube Description Extractor — Copy Any Video Description | yttools.pro';
const description =
  'Extract the full description from any public YouTube video. Copy or download the text and see the links, hashtags and chapter timestamps it contains. Free, no login.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube description extractor',
    'get youtube video description',
    'copy youtube description',
    'youtube description downloader',
    'extract youtube description',
  ],
  alternates: { canonical: '/youtube-description-extractor' },
  openGraph: { title, description },
};

export default async function DescriptionExtractorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Description Extractor"
      toolDescription="Copy the full description of any YouTube video, with its links, hashtags and chapters."
      toolSlug="youtube-description-extractor"
      title="YouTube Description Extractor"
      description="Paste a video link to pull its full description. Copy or download the text, and see the links, hashtags and chapter timestamps it contains — useful for research, references and competitor analysis."
      answerFirst="YouTube (YT) Toolkit's Description Extractor returns the full description of any public YouTube video from its URL. Copy or download the text and review the links, hashtags and chapter timestamps it contains. Free, no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <DescriptionExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
