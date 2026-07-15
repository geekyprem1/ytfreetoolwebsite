import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'How to use YT Toolkit — paste a YouTube URL, pick a tool, get results. No login required.',
  alternates: { canonical: '/docs' },
  openGraph: {
    title: 'Documentation',
    description: 'How to use YT Toolkit free YouTube creator tools.',
  },
};

export default function DocsPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Documentation"
      title="Documentation"
      description="A short guide to using YT Toolkit."
    >
      <h2>Quick start</h2>
      <ol>
        <li>
          <strong>Open a tool</strong> — from the <Link href="/#tools">tools list</Link> or by pasting
          a URL on the home page.
        </li>
        <li>
          <strong>Paste a YouTube URL</strong> — video or channel links work depending on the tool.
        </li>
        <li>
          <strong>Run the tool</strong> — click the action button (Download, Analyze, Generate, etc.).
        </li>
        <li>
          <strong>Copy or download</strong> — use the output actions to save results.
        </li>
      </ol>

      <h2>Tool categories</h2>
      <ul>
        <li>
          <strong>Downloaders</strong> — thumbnails and media helpers.
        </li>
        <li>
          <strong>Extractors</strong> — tags, transcripts, channel keywords.
        </li>
        <li>
          <strong>AI generators</strong> — titles, descriptions, hooks, hashtags, and more.
        </li>
        <li>
          <strong>Analytics &amp; SEO</strong> — video/channel stats and score helpers.
        </li>
      </ul>

      <h2>Limits</h2>
      <p>
        Free use may be rate-limited to keep the service fair. AI tools may have stricter limits.
        See the FAQ on the <Link href="/">home page</Link>.
      </p>

      <h2>Need help?</h2>
      <p>
        <Link href="/contact">Contact us</Link> or read the <Link href="/about">About</Link> page.
      </p>
    </ContentPageShell>
  );
}
