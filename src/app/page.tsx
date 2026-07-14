import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero';
import { PopularTools } from '@/components/home/popular-tools';
import { HomeFAQ } from '@/components/home/faq-section';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <PopularTools />
        <HomeFAQ />
      </main>
      <Footer />
    </>
  );
}
