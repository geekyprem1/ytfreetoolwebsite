import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function SitePagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
