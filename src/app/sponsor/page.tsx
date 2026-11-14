import type { Metadata } from 'next';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { SponsorForm } from './sponsor-form';
export const metadata: Metadata = {
  title:'Sponsor YT Toolkit', description:'Request a homepage placement for your product on YT Toolkit. Choose a standard or featured space and preview your creative.',
  alternates:{canonical:'/sponsor'},
};
export default function SponsorPage() {
  return <ContentPageShell breadcrumbLabel="Sponsorship" title="Meet your next creator." description="Your product, in a toolkit creators come to use." wide><SponsorForm /></ContentPageShell>;
}
