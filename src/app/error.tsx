'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertCircle className="size-12 text-destructive mx-auto" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset} variant="outline">
            <RotateCw className="size-4 mr-1.5" />
            Try Again
          </Button>
          <Button onClick={() => router.push('/')}>
            <Home className="size-4 mr-1.5" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
