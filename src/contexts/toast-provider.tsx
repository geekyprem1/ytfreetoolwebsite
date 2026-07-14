'use client';

import { Toaster as Sonner } from '@/components/ui/sonner';

export function ToastProvider() {
  return <Sonner richColors closeButton position="bottom-right" />;
}
