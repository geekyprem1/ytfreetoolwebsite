import { UrlSearchBox } from '@/components/home/url-search-box';

export function HeroSection() {
  return (
    <section className="py-20 md:py-28 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in">
        The Ultimate Free{' '}
        <span className="text-red-500">YouTube Creator Toolkit</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        15+ Free YouTube Tools · No Login Required · Instant Results
      </p>
      <UrlSearchBox />
    </section>
  );
}
