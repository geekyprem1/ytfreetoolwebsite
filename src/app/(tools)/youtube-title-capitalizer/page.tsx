import type { Metadata } from 'next';
import { TitleCapitalizerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-title-capitalizer';

const title = 'YouTube Title Capitalizer — Title Case Converter (Free) | yttools.pro';
const description =
  'Convert a YouTube video title to Title Case, Sentence case, UPPERCASE or lowercase. Keeps small words lowercase and brand spellings like iPhone intact. Free, runs in your browser.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube title capitalizer',
    'youtube title case converter',
    'title case generator',
    'capitalize youtube title',
    'youtube title case',
  ],
  alternates: { canonical: '/youtube-title-capitalizer' },
  openGraph: { title, description },
};

export default function TitleCapitalizerPage() {
  return (
    <ToolPageShell
      toolName="Title Capitalizer"
      toolDescription="Convert a title to Title Case, Sentence case, UPPERCASE or lowercase."
      toolSlug="youtube-title-capitalizer"
      title="YouTube Title Capitalizer"
      description="Paste a title and get it in four casing styles at once — Title Case, Sentence case, UPPERCASE and lowercase — with a character count for each. Copy the one you want."
      answerFirst="YouTube (YT) Toolkit's Title Capitalizer converts any video title to Title Case, Sentence case, UPPERCASE or lowercase. Title Case keeps minor words like ‘the’ and ‘of’ lowercase and preserves brand spellings such as iPhone. Free, runs entirely in your browser."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleCapitalizerClient />
    </ToolPageShell>
  );
}
