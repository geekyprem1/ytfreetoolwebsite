'use client';

import { CookieConsent } from '@/components/layout/cookie-consent';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}
