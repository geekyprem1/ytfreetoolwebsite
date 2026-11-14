import type { Metadata } from 'next';
import { SponsorAdmin } from './sponsor-admin';
export const metadata: Metadata = { title:'Sponsor administration', robots:{index:false,follow:false} };
export const dynamic='force-dynamic';
export default function SponsorAdminPage() {return <SponsorAdmin />;}
