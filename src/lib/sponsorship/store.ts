import { createHash } from 'node:crypto';
import type { z } from 'zod';
import type { SponsorBooking, SponsorDatabase, SponsorEnvironment, SponsorSlot, PublicSponsor } from './types';
import { adminInput, bookingInput } from './validation';
import { SponsorError } from './http';

export const nowSeconds = () => Math.floor(Date.now() / 1000);
export function requireStorage(env: SponsorEnvironment) {
  if (!env.SPONSOR_DB || !env.SPONSOR_LOGOS) throw new SponsorError(503, 'Sponsorship storage is not configured yet.');
  return { db: env.SPONSOR_DB, logos: env.SPONSOR_LOGOS };
}
export function bookingsOpen(env: SponsorEnvironment) {
  return env.SPONSOR_BOOKING_ENABLED === 'true' && Boolean(env.SPONSOR_ADMIN_TOKEN && env.SPONSOR_ADMIN_TOKEN.length >= 32 && env.SPONSOR_DB && env.SPONSOR_LOGOS);
}
export async function expireBookings(db: SponsorDatabase, now = nowSeconds()) {
  await db.prepare(`UPDATE sponsor_bookings SET status='ended',updated_at=?
    WHERE (status='approved' AND approval_until<=?) OR (status IN ('active','paused') AND ends_at<=?)`).bind(now,now,now).run();
}
export async function availability(db: SponsorDatabase) {
  await expireBookings(db);
  const { results } = await db.prepare(`SELECT s.id,s.kind,
    CASE WHEN s.enabled=1 AND NOT EXISTS (SELECT 1 FROM sponsor_bookings b WHERE b.slot_id=s.id AND b.status IN ('approved','active','paused')) THEN 1 ELSE 0 END AS available
    FROM sponsor_slots s ORDER BY s.id`).all<{ id: number; kind: 'standard' | 'featured'; available: number }>();
  return results.map(s => ({ ...s, available: Boolean(s.available) })) satisfies SponsorSlot[];
}
export async function publicSponsors(db: SponsorDatabase): Promise<PublicSponsor[]> {
  const now = nowSeconds();
  const { results } = await db.prepare(`SELECT b.id,b.slot_id,b.brand,b.url,b.tagline,b.ends_at FROM sponsor_bookings b
    JOIN sponsor_slots s ON s.id=b.slot_id WHERE s.enabled=1 AND b.status='active' AND b.activation_kind IN ('complimentary','paid_live') AND b.starts_at<=? AND b.ends_at>? ORDER BY s.id`).bind(now,now).all<Pick<SponsorBooking,'id'|'slot_id'|'brand'|'url'|'tagline'|'ends_at'>>();
  return results.map(b => ({id:b.id,slotId:b.slot_id,brand:b.brand,url:b.url,tagline:b.tagline,logo:`/api/sponsors/${b.id}/logo`,expiresAt:b.ends_at!}));
}
export async function bookingById(db: SponsorDatabase, id: string) {
  return db.prepare('SELECT * FROM sponsor_bookings WHERE id=?').bind(id).first<SponsorBooking>();
}
export async function limitSubmissions(db: SponsorDatabase, ip: string, now = nowSeconds()) {
  const period = Math.floor(now / 900);
  const key = createHash('sha256').update(`${ip}\0${period}`).digest('hex');
  const row = await db.prepare(`INSERT INTO sponsor_request_limits(key,count,expires_at) VALUES (?,1,?)
    ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count`).bind(key,(period+1)*900).first<{count:number}>();
  await db.prepare('DELETE FROM sponsor_request_limits WHERE expires_at<?').bind(now).run();
  if (!row || row.count > 5) throw new SponsorError(429, 'Too many requests. Please try again in 15 minutes.');
}
export async function createBooking(db: SponsorDatabase, input: z.infer<typeof bookingInput>, logo: {key:string;type:string}, id = crypto.randomUUID()) {
  const now = nowSeconds();
  const slots = await availability(db);
  if (!slots.some(s => s.id === input.slotId && s.available)) throw new SponsorError(409, 'That slot is unavailable. Choose another slot.');
  // A pending request is not a reservation; availability may change during review.
  await db.batch([
    db.prepare(`INSERT INTO sponsor_bookings(id,slot_id,brand,url,tagline,contact_name,contact_email,note,logo_key,logo_type,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(id,input.slotId,input.brand,input.url,input.tagline,input.contactName,input.contactEmail,input.note,logo.key,logo.type,now,now),
    db.prepare('INSERT INTO sponsor_audit(id,booking_id,action,created_at) VALUES (?,?,?,?)').bind(crypto.randomUUID(),id,'submitted',now),
  ]);
  return { id, status:'pending' as const };
}

export async function moderateBooking(db: SponsorDatabase, input: z.infer<typeof adminInput>, now = nowSeconds()) {
  await expireBookings(db,now);
  let sql: string; let values: (string|number|null)[];
  switch (input.action) {
    case 'approve':
      sql = `UPDATE sponsor_bookings SET status='approved',approval_until=?,updated_at=? WHERE id=? AND status='pending'
        AND EXISTS(SELECT 1 FROM sponsor_slots s WHERE s.id=sponsor_bookings.slot_id AND s.enabled=1)`;
      values = [now+86400,now,input.id]; break;
    case 'reject':
      sql = `UPDATE sponsor_bookings SET status='rejected',updated_at=? WHERE id=? AND status IN ('pending','approved')`;
      values = [now,input.id]; break;
    case 'activate':
      if (input.endsAt <= now || input.endsAt > now+366*86400) throw new SponsorError(422, 'Choose an end date within the next year.');
      sql = `UPDATE sponsor_bookings SET status='active',activation_kind='complimentary',starts_at=?,ends_at=?,updated_at=? WHERE id=? AND status='approved' AND approval_until>?
        AND NOT EXISTS(SELECT 1 FROM sponsor_payments WHERE booking_id=sponsor_bookings.id)`;
      values = [now,input.endsAt,now,input.id,now]; break;
    case 'pause':
      sql = `UPDATE sponsor_bookings SET status='paused',updated_at=? WHERE id=? AND status='active' AND ends_at>?`;
      values = [now,input.id,now]; break;
    case 'resume':
      sql = `UPDATE sponsor_bookings SET status='active',updated_at=? WHERE id=? AND status='paused' AND ends_at>?`;
      values = [now,input.id,now]; break;
    case 'end':
      sql = `UPDATE sponsor_bookings SET status='ended',updated_at=? WHERE id=? AND status IN ('approved','active','paused')`;
      values = [now,input.id]; break;
  }
  try {
    const result = await db.batch([
      db.prepare(sql).bind(...values),
      db.prepare(`INSERT INTO sponsor_audit(id,booking_id,action,created_at) SELECT ?,?,?,? WHERE changes()=1`).bind(crypto.randomUUID(),input.id,input.action,now),
    ]) as { meta: { changes?: number } }[];
    if (!result[0]?.meta.changes) throw new SponsorError(409, 'The booking changed or this action is not available. Refresh the list.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) throw new SponsorError(409, 'This slot is already reserved by another approved booking.');
    throw error;
  }
  return bookingById(db,input.id);
}
