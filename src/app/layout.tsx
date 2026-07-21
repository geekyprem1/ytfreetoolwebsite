import type { Metadata } from 'next';
import { Instrument_Sans, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-provider';
import { ToastProvider } from '@/contexts/toast-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClientProviders } from '@/components/layout/client-providers';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import '@/styles/globals.css';

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'YouTube Toolkit AI — 15+ Free YouTube Creator Tools | No Login Required',
    template: '%s | YouTube Toolkit AI',
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.legalName,
    title: 'YouTube Toolkit AI — 15+ Free YouTube Creator Tools',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Toolkit AI — Free YouTube Creator Tools',
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/icon`,
    description: site.description,
    email: site.supportEmail,
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.legalName,
    url: site.url,
    description: site.description,
    publisher: { '@type': 'Organization', name: site.legalName, url: site.url },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable}`}
    >
      <head>
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <ToastProvider />
            <ClientProviders>{children}</ClientProviders>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
