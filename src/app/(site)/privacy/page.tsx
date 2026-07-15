import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${site.legalName}. How we handle cookies, analytics, Google AdSense advertising, and data when you use our free YouTube tools.`,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy',
    description: `How ${site.legalName} handles cookies, analytics, and advertising.`,
  },
};

export default function PrivacyPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Privacy Policy"
      title="Privacy Policy"
      description={`Last updated: July 15, 2026. How ${site.legalName} handles your information.`}
    >
      <h2>Overview</h2>
      <p>
        {site.legalName} (&quot;we&quot;, &quot;us&quot;) provides free YouTube creator tools at{' '}
        {site.url}. This policy explains what information may be processed when you visit or use the
        Service. We designed core tools so you can use them without creating an account.
      </p>

      <h2>Information we process</h2>
      <ul>
        <li>
          <strong>Tool inputs you submit</strong> — such as YouTube URLs, titles, keywords, or
          transcript text. These are used to generate a response for your request. We do not offer
          account profiles or a permanent saved history of past tool runs as a product feature.
        </li>
        <li>
          <strong>Technical logs</strong> — standard server logs (for example IP address, user agent,
          request path, and timestamps) may be collected to operate the Service, enforce rate limits,
          debug errors, and prevent abuse.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — we may use cookies or local storage for
          preferences (theme, cookie consent), analytics, and advertising as described below.
        </li>
      </ul>

      <h2>Advertising (including Google AdSense)</h2>
      <p>
        To support free tools, we may show third-party advertisements, including ads served by{' '}
        <strong>Google AdSense</strong> and related Google advertising services. Google and other ad
        partners may use cookies, device identifiers, and similar technologies to:
      </p>
      <ul>
        <li>Serve ads on this site and measure ad performance</li>
        <li>Limit how often you see an ad</li>
        <li>Personalize ads based on your interests (where permitted by law and your settings)</li>
      </ul>
      <p>
        Third parties, including Google, may receive information about your visits to this and other
        sites. Learn more about how Google uses data when you use partner sites:{' '}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
          Google Partner Sites Policy
        </a>
        . You can manage ad personalization at{' '}
        <a href="https://adssettings.google.com/" rel="noopener noreferrer" target="_blank">
          Google Ads Settings
        </a>{' '}
        and learn about cookies at{' '}
        <a href="https://policies.google.com/technologies/cookies" rel="noopener noreferrer" target="_blank">
          Google Cookies Policy
        </a>
        .
      </p>

      <h2>Analytics</h2>
      <p>
        We may use analytics tools (for example privacy-respecting product analytics or Google
        Analytics where enabled) to understand aggregate traffic, popular tools, and errors. Analytics
        providers may set cookies or process IP addresses under their own policies.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Use the on-site cookie notice (where shown) to accept or reject non-essential cookies.</li>
        <li>Adjust Google ad settings and browser cookie controls.</li>
        <li>Stop using the Service at any time; no account deletion is required for basic use.</li>
      </ul>

      <h2>Third-party APIs</h2>
      <p>
        Tools may call third-party APIs (for example YouTube Data API and AI providers) to fulfill
        your request. Those providers process data needed to respond under their own terms and privacy
        policies. We are not responsible for third-party practices.
      </p>

      <h2>Data retention</h2>
      <p>
        Server logs and security records are retained only as long as reasonably needed for operation,
        abuse prevention, and legal compliance. Advertising and analytics retention is controlled by
        those partners under their policies.
      </p>

      <h2>Children</h2>
      <p>
        The Service is not directed at children under 13. We do not knowingly collect personal
        information from children.
      </p>

      <h2>Independence</h2>
      <p>{site.notAffiliated}</p>

      <h2>Contact</h2>
      <p>
        Privacy questions: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> or{' '}
        <Link href="/contact">Contact</Link>. See also our <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top will
        change when we do.
      </p>
    </ContentPageShell>
  );
}
