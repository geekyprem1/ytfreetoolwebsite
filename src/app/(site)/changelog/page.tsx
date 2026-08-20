import type { Metadata } from 'next';
import { ContentPageShell } from '@/components/layout/content-page-shell';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Product updates and improvements for YT Toolkit.',
  alternates: { canonical: '/changelog' },
  openGraph: { title: 'Changelog', description: 'Product updates for YT Toolkit.' },
};

export default function ChangelogPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Changelog"
      title="Changelog"
      description="Notable updates to YT Toolkit."
    >
      <h2>July 2026</h2>
      <ul>
        <li>
          <strong>Design refresh</strong> — quieter Apple-inspired home and tool pages, shared tool
          shell, clearer typography.
        </li>
        <li>
          <strong>Reliability</strong> — rate limiting fails closed when Redis is unavailable;
          transcript timestamps normalized to seconds.
        </li>
        <li>
          <strong>Site pages</strong> — About, Contact, Privacy, Terms, Docs, Changelog, and Roadmap.
        </li>
      </ul>

      <h2>Earlier</h2>
      <ul>
        <li>Launch of 27 free creator tools (thumbnails, tags, transcripts, AI, analytics, SEO, 11 calculators).</li>
        <li>No-login workflow with URL paste across tools.</li>
      </ul>
    </ContentPageShell>
  );
}
