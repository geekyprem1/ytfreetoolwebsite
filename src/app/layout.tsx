import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-provider';
import { ToastProvider } from '@/contexts/toast-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClientProviders } from '@/components/layout/client-providers';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'YouTube Toolkit AI — 15+ Free YouTube Creator Tools | No Login Required',
    template: '%s | YouTube Toolkit AI',
  },
  description:
    'Free YouTube creator toolkit with 15+ tools. Thumbnail Downloader, Tags Extractor, Transcript Extractor, AI Title & Description Generator, and more. No login required.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'YouTube Toolkit AI',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YouTube Toolkit AI',
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description: 'Free YouTube creator toolkit with 15+ tools. No login required.',
    sameAs: [
      'https://twitter.com/yttoolkit',
      'https://github.com/yttoolkit',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
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
