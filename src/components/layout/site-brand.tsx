import Link from 'next/link';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteBrand({ className, compactOnMobile = false }: { className?: string; compactOnMobile?: boolean }) {
  return <Link href="/" aria-label="YT Toolkit home" className={cn('inline-flex items-center gap-2.5 group', className)}>
    <span className="size-7 shrink-0 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-[1.03]">
      <Play aria-hidden="true" className="size-3.5 text-white fill-white" />
    </span>
    <span className={cn('font-display font-semibold text-base tracking-tight',compactOnMobile && 'hidden sm:inline')}>YT Toolkit</span>
  </Link>;
}
