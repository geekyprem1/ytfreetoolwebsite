import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { expireBookings, moderateBooking, requireStorage } from '@/lib/sponsorship/store';
import { boundedBody, failure, json, requireAdmin, sameOrigin, SponsorError } from '@/lib/sponsorship/http';
import { adminInput } from '@/lib/sponsorship/validation';
import type { SponsorBooking } from '@/lib/sponsorship/types';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const env = await sponsorEnvironment(); requireAdmin(request,env);
    const {db} = requireStorage(env); await expireBookings(db);
    const rows = await db.prepare('SELECT * FROM sponsor_bookings ORDER BY created_at DESC LIMIT 100').all<SponsorBooking>();
    return json({bookings:rows.results.map(b => ({id:b.id,slot_id:b.slot_id,brand:b.brand,url:b.url,tagline:b.tagline,contact_name:b.contact_name,contact_email:b.contact_email,note:b.note,logo_type:b.logo_type,status:b.status,created_at:b.created_at,updated_at:b.updated_at,approval_until:b.approval_until,starts_at:b.starts_at,ends_at:b.ends_at,activation_kind:b.activation_kind,logo:`/api/admin/sponsors/${b.id}/logo`}))});
  } catch(error) { return failure(error); }
}
export async function POST(request: Request) {
  try {
    sameOrigin(request); const env = await sponsorEnvironment(); requireAdmin(request,env);
    const bytes = await boundedBody(request,4096);
    let body: unknown; try {body=JSON.parse(new TextDecoder().decode(bytes));} catch {throw new SponsorError(400,'Invalid JSON.');}
    const parsed=adminInput.safeParse(body);
    if (!parsed.success) throw new SponsorError(422,'Choose a valid booking action and end date.');
    const {db}=requireStorage(env); const booking=await moderateBooking(db,parsed.data);
    return json({id:booking?.id,status:booking?.status});
  } catch(error) {return failure(error);}
}
