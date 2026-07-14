import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero';
import { TrustSection } from '@/components/home/trust-section';
import { ToolsGrid } from '@/components/home/tools-grid';
import { HowItWorks } from '@/components/home/how-it-works';
import { HomeFAQ } from '@/components/home/faq-section';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <TrustSection />
        <ToolsGrid />
        <HowItWorks />
        <HomeFAQ />
      </main>
      <Footer />
    </>
  );
}
