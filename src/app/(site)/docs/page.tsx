import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';

export const metadata: Metadata = {
  title: 'YouTube Tools Documentation & Quick Start Guide | yttools.pro',
  description:
    'Learn how to use the free YT Toolkit for YouTube metadata, transcripts, tags, analytics, and downloads. Quick start guide with no login required.',
  keywords: [
    'youtube tools documentation',
    'youtube toolkit guide',
    'free youtube creator tools guide',
    'youtube metadata tools',
    'yt toolkit',
  ],
  alternates: { canonical: '/docs' },
  openGraph: {
    title: 'YouTube Tools Documentation & Quick Start Guide | yttools.pro',
    description: 'Learn how to use free YouTube creator tools for metadata, transcripts, tags, analytics, and downloads.',
  },
};

export default function DocsPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Documentation"
      title="YouTube Tools Documentation & Quick Start Guide"
      description="A practical guide to using the free YT Toolkit for YouTube metadata, transcripts, tags, analytics, and downloads."
    >
      <p>
        YT Toolkit is a free YouTube creator tools hub: choose a workflow, provide the public video or channel
        input it needs, and export a useful result without a login. This guide explains which tool category to use
        and what to verify before publishing or downloading.
      </p>

      <h2>Quick start</h2>
      <ol>
        <li>
          <strong>Open a tool</strong> - from the <Link href="/#tools">tools list</Link> or by pasting a URL on the
          home page.
        </li>
        <li>
          <strong>Paste a YouTube URL</strong> - video or channel links work depending on the tool.
        </li>
        <li>
          <strong>Run the tool</strong> - click the action button (Download, Analyze, Generate, etc.).
        </li>
        <li>
          <strong>Copy or download</strong> - use the output actions to save results.
        </li>
      </ol>

      <h2>Tool categories</h2>
      <ul>
        <li>
          <strong>Downloaders</strong> - thumbnails and media helpers.
        </li>
        <li>
          <strong>Extractors</strong> - tags, transcripts, channel keywords, and captions.
        </li>
        <li>
          <strong>AI generators</strong> - titles, descriptions, hooks, hashtags, keywords, and more.
        </li>
        <li>
          <strong>Analytics and SEO</strong> - video/channel stats, monetization estimates, and score helpers.
        </li>
      </ul>

      <h2>Limits and accuracy</h2>
      <p>
        Free use may be rate-limited to keep the service fair. AI tools may have stricter limits. Public-data tools
        cannot reveal private YouTube Studio revenue, YPP approval, or unavailable captions. Always review generated
        metadata, timestamps, links, and claims before publishing.
      </p>

      <h2>Need help?</h2>
      <p>
        <Link href="/contact">Contact us</Link> or read the <Link href="/about">About</Link> page. For tool-specific
        instructions, use the related links on each tool page.
      </p>
    </ContentPageShell>
  );
}
