'use client';

import { cn } from '@/lib/utils';

interface ToolOutputProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ToolOutput({ title, children, className }: ToolOutputProps) {
  return (
    <div className={cn('mt-8 pt-8 border-t border-border/60', className)}>
      {title ? (
        <h2 className="text-display text-xl font-semibold tracking-tight mb-4">{title}</h2>
      ) : null}
      {children}
    </div>
  );
}
