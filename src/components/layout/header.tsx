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
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-8 rounded-lg bg-[#FF3B30] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="size-4 text-white fill-white" />
            </div>
            <span className="font-bold text-[15px] tracking-tight hidden sm:inline">
              YT Toolkit
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ToolsDropdown />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="#tools" className="hidden sm:inline-flex">
            <Button
              size="sm"
              className="bg-[#FF3B30] hover:bg-[#E0352B] text-white shadow-sm shadow-[#FF3B30]/20 h-8 text-[13px] rounded-lg"
            >
              Explore Tools
              <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </Link>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
