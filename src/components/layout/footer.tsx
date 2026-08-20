import Link from 'next/link';
import { tools } from '@/content/tools-metadata';
import { site } from '@/content/site';
import { Play } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
  calculator: 'Calculators',
};

const company = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const resources = [
  { href: '/blog', label: 'Blog & Guides' },
  { href: '/docs', label: 'Documentation' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/roadmap', label: 'Roadmap' },
];

const legal = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export function Footer() {
  const categorized = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category]!.push(tool);
      return acc;
    },
    {} as Record<string, typeof tools>,
  );

  return (
    <footer className="border-t border-border/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="size-7 rounded-lg bg-[#FF3B30] flex items-center justify-center">
                <Play className="size-3.5 text-white fill-white" />
              </div>
              <span className="font-display font-semibold text-base tracking-tight">{site.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-3">
              {site.tagline}
            </p>
            <p className="text-sm text-muted-foreground">
              <a href={`mailto:${site.supportEmail}`} className="hover:text-foreground transition-colors">
                {site.supportEmail}
              </a>
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(categorized).map(([category, categoryTools]) => (
              <div key={category}>
                <h3 className="text-caption font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-4">
                  {categoryLabels[category] || category}
                </h3>
                <ul className="space-y-2.5">
                  {categoryTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={tool.route}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors leading-snug"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 grid grid-cols-3 md:grid-cols-1 gap-8">
            {[
              { heading: 'Company', links: company },
              { heading: 'Resources', links: resources },
              { heading: 'Legal', links: legal },
            ].map((col) => (
              <div key={col.heading}>
                <h3 className="text-caption font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-4">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} {site.legalName}. Not affiliated with YouTube or Google.
          </p>
          <p className="text-sm text-muted-foreground">Made for creators. Free forever.</p>
        </div>
      </div>
    </footer>
  );
}
