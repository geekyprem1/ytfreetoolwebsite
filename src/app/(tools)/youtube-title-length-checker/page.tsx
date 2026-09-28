import type { Metadata } from 'next';
import { TitleLengthCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-title-length-checker';

const title = 'YouTube Title Length Checker (Free) | yttools.pro';
const description =
  'Check your YouTube title length against the 100-character limit and the ~60-character search cut-off. Live counter with desktop and mobile truncation previews. Free, no login.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube title length checker',
    'youtube title character count',
    'youtube title limit',
    'youtube title length',
    'how long can a youtube title be',
  ],
  alternates: { canonical: '/youtube-title-length-checker' },
  openGraph: { title, description },
};

export default function TitleLengthCheckerPage() {
  return (
    <ToolPageShell
      toolName="Title Length Checker"
      toolDescription="Check a YouTube title against the 100-character limit and the search cut-off."
      toolSlug="youtube-title-length-checker"
      title="YouTube Title Length Checker"
      description="Type your video title and see the character count against YouTube’s 100-character limit, plus a preview of where it is likely to be cut off in desktop search and the mobile app."
      answerFirst="YouTube titles can be up to 100 characters, but only about the first 60 show in search and suggested videos, and around 40 on mobile. This free checker counts your title live and previews where it will be truncated so you can front-load the important words. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleLengthCheckerClient />
    </ToolPageShell>
  );
}
