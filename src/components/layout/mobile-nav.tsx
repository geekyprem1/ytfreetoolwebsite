'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { tools } from '@/content/tools-metadata';
import { Separator } from '@/components/ui/separator';

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        )}
      </Button>

      {open && (
        <div className="fixed inset-0 top-14 z-40 bg-background overflow-y-auto">
          <nav className="flex flex-col p-6 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Separator className="my-2" />

            <p className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              All Tools
            </p>

            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.route}
                className="px-4 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
