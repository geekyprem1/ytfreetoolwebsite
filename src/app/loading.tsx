import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-full max-w-md" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}
