import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-banner-safe-area-checker';
import { YouTubeBannerSafeAreaCheckerClient } from './client';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Banner Safe Area Checker: Mobile & Desktop | yttools.pro',
  },
  description:
    'Preview a YouTube channel banner on TV, desktop, tablet, and mobile crops. Check the 16:9 dimensions and keep text and logos inside the safe area privately in your browser.',
  keywords: [
    'youtube banner safe area checker mobile desktop',
    'youtube channel art crop preview online',
    'youtube banner safe zone template',
    'preview youtube banner on all devices',
  ],
  alternates: { canonical: '/youtube-banner-safe-area-checker' },
  openGraph: {
    title: 'YouTube Banner Safe Area Checker | yttools.pro',
    description: 'Preview local channel art across device crops and check the official safe area.',
    images: toolOgImages('seo', 'YouTube Banner Safe-Area Checker'),
  },
};

export default function YouTubeBannerSafeAreaCheckerPage() {
  return (
    <ToolPageShell
      toolName="YouTube Banner Safe-Area Checker"
      toolDescription="Preview a local channel banner on device crops and keep important branding inside the safe area."
      toolSlug="youtube-banner-safe-area-checker"
      title="YouTube Banner Safe-Area Checker"
      description="Upload a banner locally and preview the TV, desktop, tablet, and mobile crops before you publish it."
      answerFirst="YouTube recommends a 2560×1440 channel banner and a centered safe area for text and logos. This checker keeps your image in the browser, overlays the safe guide, and shows how the same artwork is cropped on common device layouts."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YouTubeBannerSafeAreaCheckerClient />
    </ToolPageShell>
  );
}
