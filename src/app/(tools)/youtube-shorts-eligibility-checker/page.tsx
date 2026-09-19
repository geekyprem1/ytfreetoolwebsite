import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-shorts-eligibility-checker';
import { YouTubeShortsEligibilityCheckerClient } from './client';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Shorts Eligibility Checker (3-Minute Rule) | yttools.pro',
  },
  description:
    'Check whether a local video is likely to be categorized as a YouTube Short. Read duration, dimensions, aspect ratio, format and file size privately in your browser.',
  keywords: [
    'is my video eligible for youtube shorts',
    'youtube shorts eligibility checker 3 minutes',
    'youtube shorts aspect ratio checker online',
    'will youtube make my video a short',
    'check if video is short or long form youtube',
  ],
  alternates: { canonical: '/youtube-shorts-eligibility-checker' },
  openGraph: {
    title: 'YouTube Shorts Eligibility Checker | yttools.pro',
    description: 'Check a local video against YouTube\'s square-or-vertical, up-to-three-minute Shorts rule.',
    images: toolOgImages('seo', 'YouTube Shorts Eligibility Checker'),
  },
};

export default function YouTubeShortsEligibilityCheckerPage() {
  return (
    <ToolPageShell
      toolName="YouTube Shorts Eligibility Checker"
      toolDescription="Read local video metadata and see whether a new upload is likely to be categorized as a YouTube Short."
      toolSlug="youtube-shorts-eligibility-checker"
      title="YouTube Shorts Eligibility Checker"
      description="Choose a video file to check its duration, dimensions and aspect ratio locally. Nothing is uploaded to our servers."
      answerFirst="A new square or vertical video up to three minutes long is likely to be categorized as a YouTube Short. This checker reads the local file in your browser and explains whether its format is likely to be Shorts or long-form."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YouTubeShortsEligibilityCheckerClient />
    </ToolPageShell>
  );
}
