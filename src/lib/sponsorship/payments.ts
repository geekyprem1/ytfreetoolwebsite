import DodoPayments from 'dodopayments';
import { Webhook } from 'standardwebhooks';
import { z } from 'zod';
import type { SponsorDatabase, SponsorEnvironment } from './types';
import { SponsorError } from './http';
import { bookingById, expireBookings, nowSeconds, requireStorage } from './store';
import { SPONSOR_OFFER } from './pricing';

export const checkoutInput = z.object({ id: z.string().uuid() });
export type SponsorPaymentMode = 'test' | 'live';
export interface PaymentAttempt {
  id: string; booking_id: string; product_id: string; amount: number; currency: string;
  duration_seconds: number; session_id: string | null; checkout_url: string | null;
  payment_id: string | null; status: 'creating' | 'checkout' | 'paid' | 'review';
  mode: SponsorPaymentMode; created_at: number; updated_at: number;
}
export function configuredPaymentMode(env: SponsorEnvironment): SponsorPaymentMode | null {
  const mode = env.SPONSOR_PAYMENT_ENABLED;
  const productId = mode === 'test' ? env.DODO_SPONSOR_TEST_PRODUCT_ID : mode === 'live' ? env.DODO_SPONSOR_PRODUCT_ID : undefined;
  const apiKey = mode === 'test' ? env.DODO_PAYMENTS_API_KEY : mode === 'live' ? env.DODO_SPONSOR_LIVE_API_KEY : undefined;
  const webhookKey = mode === 'test' ? env.DODO_PAYMENTS_WEBHOOK_KEY : mode === 'live' ? env.DODO_SPONSOR_LIVE_WEBHOOK_KEY : undefined;
  if ((mode !== 'test' && mode !== 'live') || !apiKey || !webhookKey || !productId) return null;
  return mode;
}
export function paymentClient(env: SponsorEnvironment, mode = configuredPaymentMode(env)) {
  const apiKey = mode === 'test' ? env.DODO_PAYMENTS_API_KEY : mode === 'live' ? env.DODO_SPONSOR_LIVE_API_KEY : undefined;
  if (!mode || !apiKey) throw new SponsorError(503, 'Sponsor payments are not configured.');
  return new DodoPayments({ bearerToken: apiKey, environment: mode === 'test' ? 'test_mode' : 'live_mode', maxRetries: 0, timeout: 10000 });
}
export async function createSponsorCheckout(env: SponsorEnvironment, bookingId: string, origin: string, client?: DodoPayments) {
  const mode = configuredPaymentMode(env);
  if (!mode) throw new SponsorError(503, 'Sponsor payments are not configured.');
  client ??= paymentClient(env, mode);
  const productId = mode === 'test' ? env.DODO_SPONSOR_TEST_PRODUCT_ID! : env.DODO_SPONSOR_PRODUCT_ID!;
  const { db } = requireStorage(env);
  await expireBookings(db);
  const booking = await bookingById(db, bookingId);
  const now = nowSeconds();
  if (!booking || booking.status !== 'approved' || !booking.approval_until || booking.approval_until <= now) throw new SponsorError(409, 'Approve this booking before creating checkout.');
  const previous = await db.prepare('SELECT * FROM sponsor_payments WHERE booking_id=?').bind(bookingId).first<PaymentAttempt>();
  if (previous) {
    if (previous.status === 'checkout' && previous.checkout_url && previous.mode === mode) return { checkoutUrl: previous.checkout_url, mode };
    throw new SponsorError(409, 'A payment attempt already exists. Review its status before trying again.');
  }
  const product = await client.products.retrieve(productId);
  const price = product.price;
  if (product.is_recurring || price.type !== 'one_time_price' || price.price !== SPONSOR_OFFER.amount || price.currency !== SPONSOR_OFFER.currency || !price.tax_inclusive || price.pay_what_you_want || price.purchasing_power_parity || price.discount || price.discount_bps) {
    throw new SponsorError(503, `The ${mode} product must be fixed-price, tax-inclusive ${SPONSOR_OFFER.priceLabel}.`);
  }
  const id = crypto.randomUUID();
  try {
    const inserted = await db.prepare(`INSERT INTO sponsor_payments(id,booking_id,product_id,amount,currency,duration_seconds,mode,created_at,updated_at)
      SELECT ?, ?, ?, ?, ?, ?, ?, ?, ? WHERE EXISTS(SELECT 1 FROM sponsor_bookings WHERE id=? AND status='approved' AND approval_until>?)`).bind(id,bookingId,product.product_id,SPONSOR_OFFER.amount,SPONSOR_OFFER.currency,SPONSOR_OFFER.durationSeconds,mode,now,now,bookingId,now).run();
    if (!inserted.meta.changes) throw new SponsorError(409, 'The booking changed. Refresh the queue.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint')) throw new SponsorError(409, 'Checkout creation is already in progress. Refresh the queue.');
    throw error;
  }
  // Persist intent before calling Dodo. Ambiguous failures remain blocked for owner reconciliation.
  const session = await client.checkoutSessions.create({
    product_cart: [{ product_id: product.product_id, quantity: 1 }],
    billing_currency: SPONSOR_OFFER.currency, customer: { email: booking.contact_email, name: booking.contact_name },
    metadata: { sponsor_attempt_id: id, sponsor_booking_id: bookingId, sponsor_mode: mode },
    return_url: `${origin}/sponsor/payment`, cancel_url: `${origin}/sponsor/payment`,
    feature_flags: { allow_currency_selection: false, allow_discount_code: false },
  });
  const url = session.checkout_url && new URL(session.checkout_url);
  const expectedHost = mode === 'test' ? 'test.checkout.dodopayments.com' : 'checkout.dodopayments.com';
  if (!url || url.protocol !== 'https:' || url.hostname !== expectedHost) throw new SponsorError(503, 'Dodo did not return the expected checkout URL. Review the payment attempt.');
  await db.prepare(`UPDATE sponsor_payments SET session_id=?,checkout_url=?,status='checkout',updated_at=? WHERE id=? AND status='creating'`).bind(session.session_id,url.href,nowSeconds(),id).run();
  return { checkoutUrl: url.href, mode };
}

const eventInput = z.object({type:z.string(),data:z.object({payment_id:z.string().min(1).max(200)})});
export async function processPaymentWebhook(env: SponsorEnvironment, raw: string, headers: Headers, client?: DodoPayments) {
  const mode = configuredPaymentMode(env);
  if (!mode) throw new SponsorError(503, 'Sponsor payments are not configured.');
  client ??= paymentClient(env, mode);
  let verified: unknown;
  const eventId = headers.get('webhook-id');
  if (!eventId || eventId.length > 200) throw new SponsorError(401, 'Invalid webhook signature.');
  try {
    const webhookKey = mode === 'test' ? env.DODO_PAYMENTS_WEBHOOK_KEY : env.DODO_SPONSOR_LIVE_WEBHOOK_KEY;
    if (!webhookKey) throw new Error('Webhook secret is missing.');
    verified = new Webhook(webhookKey).verify(raw, {
      'webhook-id': eventId,
      'webhook-timestamp': headers.get('webhook-timestamp') || '',
      'webhook-signature': headers.get('webhook-signature') || '',
    });
  } catch { throw new SponsorError(401, 'Invalid webhook signature.'); }
  const event = eventInput.safeParse(verified);
  if (!event.success || !['payment.succeeded','refund.succeeded','dispute.opened'].includes(event.data.type)) return { received:true, ignored:true };
  const {db} = requireStorage(env);
  if (await db.prepare('SELECT id FROM sponsor_payment_events WHERE id=?').bind(eventId).first()) return {received:true};
  // Fetch authoritative provider state. Redirects and webhook metadata alone cannot activate ads.
  const payment = await client.payments.retrieve(event.data.data.payment_id);
  const attemptId = payment.metadata.sponsor_attempt_id;
  if (typeof attemptId !== 'string' || !attemptId) return {received:true,ignored:true};
  const attempt = await db.prepare('SELECT * FROM sponsor_payments WHERE id=?').bind(attemptId).first<PaymentAttempt>();
  if (!attempt) return {received:true,ignored:true};
  if (attempt.mode !== mode || payment.metadata.sponsor_mode !== mode || payment.metadata.sponsor_booking_id !== attempt.booking_id || payment.checkout_session_id !== attempt.session_id || !attempt.session_id) throw new SponsorError(422, 'Payment does not match its checkout.');
  const cart = payment.product_cart;
  if (payment.currency !== attempt.currency || payment.total_amount !== attempt.amount || !cart || cart.length !== 1 || cart[0]?.product_id !== attempt.product_id || cart[0]?.quantity !== 1) throw new SponsorError(422, 'Payment does not match the expected product and price.');
  const now = nowSeconds();
  if (event.data.type !== 'payment.succeeded' || payment.refund_status || payment.disputes?.length) {
    await db.batch([
      db.prepare(`UPDATE sponsor_bookings SET status='ended',updated_at=? WHERE id=? AND activation_kind=? AND status IN ('active','paused')`).bind(now,attempt.booking_id,`paid_${mode}`),
      db.prepare(`UPDATE sponsor_payments SET status='review',payment_id=?,updated_at=? WHERE id=?`).bind(payment.payment_id,now,attempt.id),
      db.prepare('INSERT OR IGNORE INTO sponsor_payment_events(id,attempt_id,created_at) VALUES (?,?,?)').bind(eventId,attempt.id,now),
    ]);
    return {received:true};
  }
  if (payment.status !== 'succeeded') throw new SponsorError(409, 'Payment has not settled successfully.');
  await settleSponsorPayment(db,attempt,payment.payment_id,eventId,now);
  return {received:true};
}

export async function settleSponsorPayment(db: SponsorDatabase, attempt: PaymentAttempt, paymentId: string, eventId: string, now = nowSeconds()) {
  // All statements commit together. Late payments are recorded for review and cannot take another slot.
  const activationKind = `paid_${attempt.mode}`;
  const auditAction = attempt.mode === 'test' ? 'test_payment_activated' : 'payment_activated';
  await db.batch([
    db.prepare(`UPDATE sponsor_bookings SET status='active',activation_kind=?,starts_at=?,ends_at=?,updated_at=?
      WHERE id=? AND status='approved' AND approval_until>? AND EXISTS(SELECT 1 FROM sponsor_slots WHERE id=sponsor_bookings.slot_id AND enabled=1)
      AND EXISTS(SELECT 1 FROM sponsor_payments WHERE id=? AND status='checkout')
      AND NOT EXISTS(SELECT 1 FROM sponsor_payment_events WHERE id=?)`).bind(activationKind,now,now+attempt.duration_seconds,now,attempt.booking_id,now,attempt.id,eventId),
    db.prepare(`INSERT INTO sponsor_audit(id,booking_id,action,created_at) SELECT ?,?,?,? WHERE changes()=1`).bind(crypto.randomUUID(),attempt.booking_id,auditAction,now),
    db.prepare(`UPDATE sponsor_payments SET payment_id=?,status=CASE WHEN EXISTS(SELECT 1 FROM sponsor_bookings WHERE id=? AND activation_kind=? AND status='active' AND starts_at=?) THEN 'paid' ELSE 'review' END,updated_at=?
      WHERE id=? AND status='checkout' AND NOT EXISTS(SELECT 1 FROM sponsor_payment_events WHERE id=?)`).bind(paymentId,attempt.booking_id,activationKind,now,now,attempt.id,eventId),
    db.prepare('INSERT OR IGNORE INTO sponsor_payment_events(id,attempt_id,created_at) VALUES (?,?,?)').bind(eventId,attempt.id,now),
  ]);
}
