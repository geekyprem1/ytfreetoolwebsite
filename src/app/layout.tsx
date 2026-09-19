import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-provider';
import { ToastProvider } from '@/contexts/toast-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClientProviders } from '@/components/layout/client-providers';
import { site } from '@/content/site';
import { toolCount, calculatorCount } from '@/content/tools-metadata';
import '@/styles/globals.css';

const siteTitle = `Free YouTube Creator Tools - YT Toolkit | ${toolCount} Tools Including ${calculatorCount} Calculators`;

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
    default: siteTitle,
    template: '%s | YouTube Toolkit AI',
  },
  description: site.description,
  keywords: [...site.keywords],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.legalName,
    title: siteTitle,
    description: site.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'YT Toolkit - Free YouTube creator tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: site.description,
    images: ['/opengraph-image'],
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable}`}
    >
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
