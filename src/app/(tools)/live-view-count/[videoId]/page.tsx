import type { Metadata } from 'next';
import { LiveViewCountClient } from '../client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/live-view-count';

interface PageProps {
  params: Promise<{ videoId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { videoId } = await params;
  const id = decodeURIComponent(videoId);
  const title = `Live View Count for ${id} (Real-Time) | yttools.pro`;
  const description = `Track this YouTube video's view count in real time. Watch views update live, no login required.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/live-view-count/${videoId}` },
    openGraph: { title, description },
    robots: { index: false, follow: true },
  };
}

export default async function LiveViewVideoPage({ params }: PageProps) {
  const { videoId } = await params;
  const id = decodeURIComponent(videoId);

  return (
    <ToolPageShell
      toolName="Live View Count"
      toolDescription="Track a YouTube video’s view count in real time."
      toolSlug="live-view-count"
      title="YouTube Live View Count"
      description="Live view count for this video, updating in real time. The number refreshes automatically with a smooth animation between updates."
      answerFirst="This page tracks the video's YouTube view count live, refreshing about every 60 seconds. It also shows live likes and comments. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <LiveViewCountClient initialVideo={id} />
    </ToolPageShell>
  );
}
