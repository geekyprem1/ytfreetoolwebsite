import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${site.legalName}. Rules for using our free YouTube creator tools and advertising disclosures.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service',
    description: `Rules for using ${site.legalName}.`,
  },
};

export default function TermsPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Terms of Service"
      title="Terms of Service"
      description={`Last updated: July 15, 2026. Rules for using ${site.legalName}.`}
    >
      <h2>Agreement</h2>
      <p>
        By accessing or using {site.legalName} (&quot;the Service&quot;), you agree to these Terms. If
        you do not agree, do not use the Service.
      </p>

      <h2>The Service</h2>
      <p>
        We provide free web tools related to YouTube content (for example thumbnails, tags,
        transcripts, AI text helpers, and analytics views). Features may change, be rate-limited, or
        become unavailable without notice.
      </p>

      <h2>No affiliation</h2>
      <p>{site.notAffiliated} You must comply with YouTube&apos;s Terms of Service and applicable law when using content from YouTube.</p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not abuse, overload, or attempt to bypass rate limits or security controls.</li>
        <li>Do not use the Service for unlawful, harmful, or infringing activity.</li>
        <li>Do not scrape, reverse engineer, or resell the Service in a way that harms the site or its providers.</li>
        <li>Respect copyright and the rights of video owners when downloading or reusing thumbnails or text.</li>
      </ul>

      <h2>User content and AI output</h2>
      <p>
        You are responsible for inputs you submit and for reviewing any AI-generated suggestions
        (titles, descriptions, hooks, and similar) before publishing. We do not guarantee ranking,
        accuracy, originality, or fitness for a particular purpose.
      </p>

      <h2>Advertising</h2>
      <p>
        The Service may display advertisements, including Google AdSense. Ads do not constitute an
        endorsement. Advertising partners may use cookies as described in our{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The Service is provided <strong>&quot;as is&quot; and &quot;as available&quot;</strong> without
        warranties of any kind, express or implied. We do not warrant uninterrupted or error-free
        operation, or that third-party APIs will remain available.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.legalName} and its operators will not be liable
        for any indirect, incidental, special, consequential, or punitive damages, or any loss of
        data, profits, or goodwill arising from your use of the Service.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> describes how we handle information related to
        the Service.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms. Continued use after changes means you accept the updated Terms. The
        &quot;Last updated&quot; date will be revised when we publish changes.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> or{' '}
        <Link href="/contact">Contact</Link>.
      </p>
    </ContentPageShell>
  );
}
