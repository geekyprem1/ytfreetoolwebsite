import type { Metadata } from 'next';
import { TimestampGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/timestamp-generator';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Timestamp Generator & Chapter Maker | yttools.pro',
  },
  description:
    'Create free YouTube timestamps and chapters from a transcript. Generate MM:SS lines starting at 0:00 for your video description—no login.',
  keywords: [
    'free youtube timestamp generator',
    'youtube timestamp generator',
    'youtube video timestamp generator',
    'youtube chapter timestamp generator',
    'video timestamp generator',
    'timestamp maker youtube',
  ],
  alternates: { canonical: '/timestamp-generator' },
  openGraph: {
    title: 'Free YouTube Timestamp Generator & Chapter Maker | yttools.pro',
    description:
      'Create free YouTube timestamps and chapters from a transcript. Generate MM:SS lines starting at 0:00 for your video description—no login.',
    images: toolOgImages('seo', 'Free YouTube Timestamp Generator'),
  },
};

export default function TimestampGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Timestamp Generator"
      toolDescription="Auto-generate video chapters from transcripts with AI."
      toolSlug="timestamp-generator"
      title="Free YouTube Timestamp Generator & Chapter Maker"
      description="Generate free YouTube timestamps and chapters from a transcript in MM:SS format starting at 0:00—not generic podcast markers. Paste caption text to get clickable chapter lines for the description."
      answerFirst="YouTube (YT) Toolkit's Timestamp Generator turns a transcript into YouTube chapters in MM:SS format starting at 0:00. Free, no login - paste caption text and copy clickable chapter lines for your description."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Get a transcript', text: 'Export captions or extract the spoken text from the video you want to outline.' },
        { name: 'Paste the transcript', text: 'Add the transcript or caption text so the generator can identify topic changes.' },
        { name: 'Generate timestamp chapters', text: 'Create an ordered list of chapter times and short, descriptive titles.' },
        { name: 'Validate and copy', text: 'Confirm 0:00 is first, times are ascending, and at least three chapters match the final cut before pasting into YouTube Studio.' },
      ]}
    >
      <TimestampGeneratorClient />
    </ToolPageShell>
  );
}
