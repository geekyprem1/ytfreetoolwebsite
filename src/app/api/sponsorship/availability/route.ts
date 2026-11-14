import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { availability, bookingsOpen, requireStorage } from '@/lib/sponsorship/store';
import { failure, json } from '@/lib/sponsorship/http';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { const env = await sponsorEnvironment(); const {db} = requireStorage(env); return json({bookingEnabled:bookingsOpen(env),slots:await availability(db)}); }
  catch(error) { return failure(error); }
}
