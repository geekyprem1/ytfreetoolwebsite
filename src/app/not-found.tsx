'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SearchX, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-5 max-w-md">
        <SearchX className="size-14 text-muted-foreground mx-auto" />
        <div>
          <p className="text-sm font-medium text-primary mb-1">404</p>
          <h1 className="text-2xl font-bold">Page not found</h1>
          <p className="text-muted-foreground text-sm mt-2">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="size-4 mr-1.5" />
            Go Back
          </Button>
          <Button onClick={() => router.push('/')}>
            <Home className="size-4 mr-1.5" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
