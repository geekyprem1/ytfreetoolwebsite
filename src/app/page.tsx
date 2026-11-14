import type { Metadata } from 'next';
import { CanvasHome } from '@/components/home/canvas-home';
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
      <CanvasHome>
        <HowItWorks />
        <HomeFAQ />
      </CanvasHome>
    </>
  );
}
