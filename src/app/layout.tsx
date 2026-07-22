import type { Metadata } from 'next';
import { Instrument_Sans, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-provider';
import { ToastProvider } from '@/contexts/toast-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClientProviders } from '@/components/layout/client-providers';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { siteWideGraph } from '@/lib/seo/schema-graph';
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
    default: 'Free YouTube Creator Tools - YT Toolkit | 15+ AI Video Tools',
    template: '%s | YouTube Toolkit AI',
  },
  description: site.description,
  keywords: [...site.keywords],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.legalName,
    title: 'Free YouTube Creator Tools - YT Toolkit | 15+ AI Video Tools',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Creator Tools - YT Toolkit | 15+ AI Video Tools',
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable}`}
    >
      <head>
        <JsonLd data={siteWideGraph()} />
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
