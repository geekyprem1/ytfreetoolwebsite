'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ToolsDropdown } from '@/components/layout/tools-dropdown';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/75 backdrop-blur-xl border-b border-border/40'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-7 rounded-lg bg-[#FF3B30] flex items-center justify-center transition-transform group-hover:scale-[1.03]">
              <Play className="size-3.5 text-white fill-white" />
            </div>
            <span className="font-display font-semibold text-base tracking-tight hidden sm:inline">
              YT Toolkit
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ToolsDropdown />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/#tools" className="hidden sm:inline-flex">
            <Button
              size="sm"
              className="bg-[#FF3B30] hover:bg-[#E0352B] text-white h-9 text-sm rounded-xl px-4"
            >
              Explore tools
              <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </Link>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
