import type { Metadata } from 'next';
import { YoutubeUploadFrequencyCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-upload-frequency-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Upload Frequency Calculator (Free) | yttools.pro',
  },
  description:
    'Free YouTube Upload Frequency Calculator — calculate videos per week, month and average gap. Audit consistency for growth.',
  keywords: ['youtube upload frequency calculator', 'upload frequency youtube', 'how often to upload youtube', 'youtube consistency calculator', 'videos per week calculator'],
  alternates: { canonical: '/youtube-upload-frequency-calculator' },
  openGraph: {
    title: 'YouTube Upload Frequency Calculator (Free) | yttools.pro',
    description: 'Free Upload Frequency Calculator — per week, month, year and gap days. Instant.',
  },
};

export default function YoutubeUploadFrequencyCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Upload Frequency Calculator"
      toolDescription="Plan upload schedule — videos per week, month and consistency score."
      toolSlug="youtube-upload-frequency-calculator"
      title="YouTube Upload Frequency Calculator"
      description="Calculate YouTube upload frequency — videos per week, month and average days between uploads. Audit consistency for algorithm and audience. Free, instant."
      answerFirst="YouTube (YT) Toolkit's Upload Frequency Calculator derives per-week, per-month and gap days from total videos ÷ days, rated High/Good/Moderate/Low consistency. Free, instant — 1-2/week is the sustainable sweet spot."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeUploadFrequencyCalculatorClient />
    </ToolPageShell>
  );
}
