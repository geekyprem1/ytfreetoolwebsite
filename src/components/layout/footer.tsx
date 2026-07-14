import Link from 'next/link';
import { tools } from '@/content/tools-metadata';
import { Play, Globe } from 'lucide-react';

const footerData = {
  Tools: tools.slice(0, 6).map(t => ({ href: t.route, label: t.name })),
  Company: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Resources: [
    { href: '/about', label: 'Documentation' },
    { href: '/about', label: 'Changelog' },
    { href: '/about', label: 'Roadmap' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="size-9 rounded-xl bg-[#FF3B30] flex items-center justify-center">
                <Play className="size-4.5 text-white fill-white" />
              </div>
              <span className="font-bold text-[16px] tracking-tight">YT Toolkit</span>
            </Link>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs mb-5">
              Free YouTube creator toolkit. 15+ AI-powered tools. No login required. Built for creators, by creators.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener" className="size-8 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="GitHub">
                <Globe className="size-4 text-muted-foreground" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener" className="size-8 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Twitter">
                <Globe className="size-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {Object.entries(footerData).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-muted-foreground">
            &copy; {new Date().getFullYear()} YouTube Toolkit AI. Not affiliated with YouTube or Google.
          </p>
          <p className="text-[12px] text-muted-foreground">
            Made for creators. Free forever.
          </p>
        </div>
      </div>
    </footer>
  );
}
