import type { Metadata } from 'next';
import { TagGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-tag-generator';

const title = 'YouTube Tag Generator (Free, AI) — Copy-Ready Tags | yttools.pro';
const description =
  'Free AI YouTube tag generator. Get primary, related and long-tail tags for your video, stay under the 500-character limit, and copy them straight into YouTube Studio. No login.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube tag generator',
    'youtube tags generator',
    'tag generator for youtube',
    'youtube video tags',
    'youtube keyword tags',
  ],
  alternates: { canonical: '/youtube-tag-generator' },
  openGraph: { title, description },
};

export default function YouTubeTagGeneratorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Tag Generator"
      toolDescription="Generate primary, related and long-tail YouTube tags that fit the 500-character limit."
      toolSlug="youtube-tag-generator"
      title="YouTube Tag Generator"
      description="Enter your video topic and get AI-generated YouTube Studio tags grouped into primary, related and long-tail. A live counter keeps you under YouTube’s 500-character limit, and one click copies the list in the format Studio expects."
      answerFirst="YouTube (YT) Toolkit's Tag Generator creates primary, related and long-tail tags for any video topic, free and without login. It counts characters the way YouTube Studio does, trims the list to the 500-character limit, and copies a comma-separated set ready to paste into the Tags field."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TagGeneratorClient />
    </ToolPageShell>
  );
}
