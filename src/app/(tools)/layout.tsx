import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
