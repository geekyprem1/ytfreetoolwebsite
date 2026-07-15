import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { ContactForm } from './contact-form';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.legalName} for questions, feedback, or partnership inquiries. Email ${site.supportEmail}.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact',
    description: `Reach ${site.legalName} at ${site.supportEmail}.`,
  },
};

export default function ContactPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Contact"
      title="Contact"
      description="Questions, feedback, or partnership ideas — we read every message."
      wide
    >
      <p>
        Email us directly at{' '}
        <strong>
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        </strong>
        . This address is the primary contact for privacy, AdSense, and product questions.
      </p>
      <p>
        For how-to questions, check the <Link href="/">FAQ on the home page</Link> or{' '}
        <Link href="/docs">Documentation</Link> first.
      </p>
      <div className="mt-2">
        <ContactForm />
      </div>
    </ContentPageShell>
  );
}
