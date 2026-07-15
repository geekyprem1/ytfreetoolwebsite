import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'What we are building next for YT Toolkit.',
  alternates: { canonical: '/roadmap' },
  openGraph: { title: 'Roadmap', description: 'What we are building next for YT Toolkit.' },
};

export default function RoadmapPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Roadmap"
      title="Roadmap"
      description="Where YT Toolkit is headed. Priorities can change."
    >
      <h2>Now</h2>
      <ul>
        <li>Polish core tools for speed, clarity, and mobile use.</li>
        <li>Harder rate limits and clearer error messages.</li>
        <li>Better URL support (more YouTube link formats).</li>
      </ul>

      <h2>Next</h2>
      <ul>
        <li>Deeper transcript language options.</li>
        <li>Smarter related-tool suggestions from a pasted URL.</li>
        <li>Lightweight saved preferences (theme, last tools) without accounts.</li>
      </ul>

      <h2>Later</h2>
      <ul>
        <li>Optional creator workspace features — only if they stay simple and free-first.</li>
        <li>More AI helpers tuned specifically for Shorts and long-form.</li>
      </ul>

      <h2>Ideas welcome</h2>
      <p>
        Tell us what you want on the <Link href="/contact">Contact</Link> page.
      </p>
    </ContentPageShell>
  );
}
