import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero';
import { FeaturedTools } from '@/components/home/featured-tools';
import { TrustSection } from '@/components/home/trust-section';
import { ToolsGrid } from '@/components/home/tools-grid';
import { HowItWorks } from '@/components/home/how-it-works';
import { HomeFAQ } from '@/components/home/faq-section';
import { JsonLd } from '@/components/seo/json-ld';
import { homeFaqs } from '@/content/home-faqs';

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <FeaturedTools />
        <TrustSection />
        <ToolsGrid />
        <HowItWorks />
        <HomeFAQ />
      </main>
      <Footer />
    </>
  );
}
