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
import { homepageGraph } from '@/lib/seo/schema-graph';

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageGraph(homeFaqs)} />
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
