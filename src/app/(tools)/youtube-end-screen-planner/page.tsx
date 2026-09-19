import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-end-screen-planner';
import { YouTubeEndScreenPlannerClient } from './client';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube End Screen Layout Planner (1280x720) | yttools.pro',
  },
  description:
    'Plan a YouTube end screen on a 16:9 canvas. Drag video, playlist, subscribe, channel, and link placeholders; check the last 5–20 seconds and export a PNG guide.',
  keywords: [
    'youtube end screen safe zone template 1280x720',
    'youtube end screen planner last 20 seconds',
    'youtube end screen size calculator',
    'youtube end screen layout preview',
    'where to place youtube end screen elements',
  ],
  alternates: { canonical: '/youtube-end-screen-planner' },
  openGraph: {
    title: 'YouTube End Screen Layout Planner | yttools.pro',
    description: 'Place end-screen elements on a 16:9 frame, check timing, and export a reference PNG.',
    images: toolOgImages('seo', 'YouTube End Screen Layout Planner'),
  },
};

export default function YouTubeEndScreenPlannerPage() {
  return (
    <ToolPageShell
      toolName="YouTube End Screen Layout Planner"
      toolDescription="Lay out end-screen elements on your final frame, check timing rules, and export a clear PNG reference."
      toolSlug="youtube-end-screen-planner"
      title="YouTube End Screen Layout Planner"
      description="Drag placeholders over a blank canvas or your final-frame image, then export a 1280×720 layout guide for your edit."
      answerFirst="For standard 16:9 videos, YouTube allows up to four end-screen elements in the final 5–20 seconds. Videos must be at least 25 seconds long. Use this local planner to block the layout before adding it in YouTube Studio."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YouTubeEndScreenPlannerClient />
    </ToolPageShell>
  );
}
