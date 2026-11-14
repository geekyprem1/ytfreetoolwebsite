import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
export const metadata: Metadata={title:'Sponsorship payment',robots:{index:false,follow:false}};
export default function PaymentReturnPage() {
  return <ContentPageShell breadcrumbLabel="Sponsorship" title="Your payment is being checked." description="Returning from checkout does not confirm payment."><p>We verify the payment directly with Dodo. For a live purchase, the placement appears only after payment is verified. If checkout was cancelled, your placement stays inactive.</p><p>Sandbox payments are for testing and never publish a public placement. Keep your payment reference for support.</p><Link href="/sponsor">Back to sponsorship</Link></ContentPageShell>;
}
