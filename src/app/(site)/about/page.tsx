import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { site } from '@/content/site';
import { toolCount } from '@/content/tools-metadata';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${site.legalName} — a free YouTube creator toolkit with ${toolCount} tools. No login required. Independent and not affiliated with YouTube.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${site.legalName}`,
    description: site.description,
  },
};

export default function AboutPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="About"
      title="About YT Toolkit"
      description="A free toolkit built for YouTube creators — simple tools, no signup, no fluff."
    >
      <h2>Who we are</h2>
      <p>
        {site.legalName} (also called {site.name}) is an independent web project that publishes free
        creator tools for people who make and optimize YouTube videos. We focus on practical
        workflows: paste a URL, run a tool, copy or download the result — without forcing you to
        create an account.
      </p>
      <p>
        The site is operated as a small publisher product. For questions about the product, privacy,
        or advertising, contact us at{' '}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> or use our{' '}
        <Link href="/contact">Contact</Link> page.
      </p>

      <h2>What we offer</h2>
      <p>
        We currently provide {site.tools.length}+ free tools across downloaders, extractors, AI
        generators, analytics helpers, and SEO utilities. Examples include thumbnail download in
        multiple qualities, video and channel tag research, transcripts with timestamps, AI titles
        and descriptions, hashtags, hooks, Shorts ideas, and SEO scoring helpers.
      </p>
      <p>
        Explore the full list on the <Link href="/#tools">home page tools section</Link> or start with
        the <Link href="/thumbnail-downloader">Thumbnail Downloader</Link>.
      </p>

      <h2>Our principles</h2>
      <ul>
        <li>
          <strong>No login required</strong> — useful tools should not gatekeep behind accounts for
          basic use.
        </li>
        <li>
          <strong>Privacy-minded</strong> — we do not require accounts or offer “saved history” of your
          past runs as a product feature. See our <Link href="/privacy">Privacy Policy</Link>.
        </li>
        <li>
          <strong>Built for creators</strong> — features are designed around YouTube workflows, not
          generic SEO software rebranded for video.
        </li>
        <li>
          <strong>Honest product scope</strong> — we document free-tier rate limits and do not claim
          affiliation with YouTube.
        </li>
      </ul>

      <h2>Independence</h2>
      <p>{site.notAffiliated} “YouTube” is a trademark of Google LLC.</p>

      <h2>Advertising</h2>
      <p>
        To keep tools free, we may display advertising (including Google AdSense) on some pages. Ad
        partners may use cookies or similar technologies as described in our Privacy Policy. You can
        manage cookie preferences via the site cookie notice where available.
      </p>

      <h2>Get in touch</h2>
      <p>
        Feedback and partnerships: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> ·{' '}
        <Link href="/contact">Contact form</Link> · <Link href="/docs">Documentation</Link>
      </p>
    </ContentPageShell>
  );
}
