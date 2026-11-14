import type { SponsorEnvironment } from './types';
import { bookingById, nowSeconds, requireStorage } from './store';
import { SponsorError } from './http';
export async function serveLogo(env: SponsorEnvironment, id: string, admin = false) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new SponsorError(404,'Logo not found.');
  const {db,logos}=requireStorage(env);
  const booking=await bookingById(db,id); const now=nowSeconds();
  if (!booking) throw new SponsorError(404,'Logo not found.');
  if (!admin) {
    const slot = await db.prepare('SELECT enabled FROM sponsor_slots WHERE id=?').bind(booking.slot_id).first<{enabled:number}>();
    if (!slot?.enabled || booking.status!=='active' || !booking.starts_at || !booking.ends_at || booking.starts_at>now || booking.ends_at<=now) throw new SponsorError(404,'Logo not found.');
  }
  const logo=await logos.get(booking.logo_key);
  if (!logo) throw new SponsorError(404,'Logo not found.');
  return new Response(logo.body,{headers:{'Content-Type':booking.logo_type,'X-Content-Type-Options':'nosniff','Cache-Control':'private, no-store','Content-Security-Policy':"default-src 'none'; sandbox"}});
}
