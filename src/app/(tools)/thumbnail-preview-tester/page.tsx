import type { Metadata } from 'next';
import { ThumbnailPreviewTesterClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/thumbnail-preview-tester';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Thumbnail Preview & A/B Tester (Free) | yttools.pro',
  },
  description:
    'Preview your YouTube thumbnail in real layouts — home grid, sidebar, search, and mobile — and compare two thumbnails side by side. Free, no login, no upload to a server.',
  keywords: [
    'youtube thumbnail preview',
    'youtube thumbnail tester',
    'thumbnail ab test',
    'thumbnail mockup',
  ],
  alternates: { canonical: '/thumbnail-preview-tester' },
  openGraph: {
    title: 'YouTube Thumbnail Preview & A/B Tester (Free) | yttools.pro',
    description:
      'Preview your thumbnail in real YouTube layouts and A/B compare two side by side. Free, no login.',
  },
};

export default function ThumbnailPreviewTesterPage() {
  return (
    <ToolPageShell
      toolName="Thumbnail Preview Tester"
      toolDescription="Preview a YouTube thumbnail in real layouts and A/B compare two."
      toolSlug="thumbnail-preview-tester"
      title="YouTube Thumbnail Preview & A/B Tester"
      description="See how your thumbnail actually looks on YouTube before you publish. Preview it in the home grid, sidebar suggestions, search results, and the mobile feed, and compare two thumbnails side by side to pick the stronger one."
      answerFirst="Upload or link a YouTube thumbnail and this free tool previews it in real YouTube layouts — home grid, sidebar, search, and mobile — and lets you compare two side by side. Images stay in your browser and are not uploaded to a server. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ThumbnailPreviewTesterClient />
    </ToolPageShell>
  );
}
