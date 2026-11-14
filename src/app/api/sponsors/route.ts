import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { publicSponsors, requireStorage } from '@/lib/sponsorship/store';
import { failure, json } from '@/lib/sponsorship/http';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { const {db} = requireStorage(await sponsorEnvironment()); return json({sponsors:await publicSponsors(db)}); }
  catch(error) { return failure(error); }
}
