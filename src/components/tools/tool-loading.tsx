'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ToolLoadingProps {
  variant?: 'card' | 'list' | 'text-block';
  className?: string;
}

export function ToolLoading({ variant = 'card', className }: ToolLoadingProps) {
  if (variant === 'card') {
    return (
      <div className={cn('mt-6 space-y-4', className)}>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('mt-6 space-y-3', className)}>
        <Skeleton className="h-6 w-24" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('mt-6 space-y-4', className)}>
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
