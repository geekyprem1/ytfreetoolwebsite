import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-upload-time-calculator';
import { YouTubeUploadTimeCalculatorClient } from './client';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Video Upload Time Calculator | yttools.pro',
  },
  description:
    'Calculate how long a YouTube video takes to upload from file size, upload Mbps, and connection efficiency. Includes 10GB, 4K, presets, reverse speed mode, and local file size reading.',
  keywords: [
    'youtube video upload time calculator',
    'how long to upload 10gb video to youtube',
    'youtube upload speed calculator for 4k video',
    'how much upload speed needed for youtube',
    'how long does a 4k video take to upload',
  ],
  alternates: { canonical: '/youtube-upload-time-calculator' },
  openGraph: {
    title: 'YouTube Video Upload Time Calculator | yttools.pro',
    description: 'Estimate YouTube upload time from file size and upload speed, or calculate the speed needed by a deadline.',
  },
};

export default function YouTubeUploadTimeCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Video Upload Time Calculator"
      toolDescription="Estimate video upload time from file size, upload speed, and real-world connection efficiency."
      toolSlug="youtube-upload-time-calculator"
      title="YouTube Video Upload Time Calculator"
      description="Find out how long your YouTube upload may take—or how much upload speed you need to finish by a target time."
      answerFirst="Upload time is calculated from file size × 8 ÷ upload speed in bits per second. Enter a file size, upload Mbps, and efficiency percentage to see the ideal time, a practical estimate, and a 70–90% range."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YouTubeUploadTimeCalculatorClient />
    </ToolPageShell>
  );
}
