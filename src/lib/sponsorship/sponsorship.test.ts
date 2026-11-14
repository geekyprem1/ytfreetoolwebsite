// @vitest-environment node
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { getPlatformProxy } from 'wrangler';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { SponsorEnvironment } from './types';
import { availability, bookingById, createBooking, expireBookings, moderateBooking, nowSeconds, publicSponsors } from './store';
import { requireAdmin, sameOrigin } from './http';
import { serveLogo } from './logos';
import { bookingInput, logoType } from './validation';
import { Webhook } from 'standardwebhooks';
import { configuredPaymentMode, createSponsorCheckout, paymentClient, processPaymentWebhook, type PaymentAttempt } from './payments';
import { SPONSOR_OFFER } from './pricing';

let env:SponsorEnvironment;
let dispose:()=>Promise<void>;
let migrationPreserved=false;
vi.mock('@/lib/sponsorship/runtime',()=>({sponsorEnvironment:async()=>env}));
import { POST as submit } from '@/app/api/sponsorship/bookings/route';
import { GET as adminList } from '@/app/api/admin/sponsors/route';
import { GET as publicList } from '@/app/api/sponsors/route';
import { POST as checkoutRoute } from '@/app/api/admin/sponsors/checkout/route';
import { POST as webhookRoute } from '@/app/api/sponsorship/webhook/route';

const accessKey='test-only-owner-key-not-a-real-credential-12345';
const input={slotId:1,brand:'Test Sponsor',url:'https://example.com',tagline:'A test creator product.',contactName:'Test Owner',contactEmail:'owner@example.com',note:'Private review note'};
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1XkAAAAASUVORK5CYII=','base64');
function request(form:FormData) {return new Request('http://localhost/api/sponsorship/bookings',{method:'POST',headers:{origin:'http://localhost'},body:form});}
function form(overrides:Record<string,string>={}) {
  const data=new FormData();for(const [key,value] of Object.entries({...input,...overrides}))data.set(key,String(value));
  data.set('logo',new File([png],'logo.png',{type:'image/png'}));return data;
}
beforeAll(async()=>{
  const proxy=await getPlatformProxy({configPath:resolve('tests/sponsorship/wrangler.jsonc'),persist:false});
  env={...proxy.env as unknown as SponsorEnvironment,SPONSOR_ADMIN_TOKEN:accessKey,SPONSOR_BOOKING_ENABLED:'true'};
  dispose=proxy.dispose;
  for(const file of readdirSync(resolve('migrations/sponsorship')).filter(f=>f.endsWith('.sql')).sort()) {
    if(file==='0002_test_payments.sql') {
      const now=nowSeconds();
      await env.SPONSOR_DB!.prepare(`INSERT INTO sponsor_bookings(id,slot_id,brand,url,tagline,contact_name,contact_email,logo_key,logo_type,status,created_at,updated_at,starts_at,ends_at,activation_kind)
        VALUES ('migration-fixture',8,'Existing sponsor','https://example.com','Existing tagline','Owner','owner@example.com','existing-logo','image/png','active',?,?,?,?, 'complimentary')`).bind(now,now,now,now+3600).run();
      await env.SPONSOR_DB!.prepare("INSERT INTO sponsor_audit VALUES ('migration-audit','migration-fixture','activate',?)").bind(now).run();
    }
    if(file==='0003_live_sponsorship.sql') {
      const now=nowSeconds();
      await env.SPONSOR_DB!.prepare("INSERT INTO sponsor_payments(id,booking_id,product_id,amount,currency,duration_seconds,status,created_at,updated_at) VALUES ('migration-payment','migration-fixture','pdt_test',100,'USD',2592000,'paid',?,?)").bind(now,now).run();
      await env.SPONSOR_DB!.prepare("INSERT INTO sponsor_payment_events VALUES ('migration-event','migration-payment',?)").bind(now).run();
    }
    const sql=readFileSync(resolve('migrations/sponsorship',file),'utf8');
    for(const statement of sql.split(';').map(s=>s.trim()).filter(Boolean))await env.SPONSOR_DB!.prepare(statement).run();
  }
  migrationPreserved=(await bookingById(env.SPONSOR_DB!,'migration-fixture'))?.activation_kind==='complimentary'
    && Boolean(await env.SPONSOR_DB!.prepare("SELECT id FROM sponsor_audit WHERE id='migration-audit'").first())
    && (await env.SPONSOR_DB!.prepare("SELECT mode FROM sponsor_payments WHERE id='migration-payment'").first<{mode:string}>())?.mode==='test'
    && Boolean(await env.SPONSOR_DB!.prepare("SELECT id FROM sponsor_payment_events WHERE id='migration-event'").first());
},30000);
beforeEach(async()=>{
  await env.SPONSOR_DB!.batch(['DELETE FROM sponsor_payment_events','DELETE FROM sponsor_payments','DELETE FROM sponsor_audit','DELETE FROM sponsor_bookings','DELETE FROM sponsor_request_limits','UPDATE sponsor_slots SET enabled=1'].map(sql=>env.SPONSOR_DB!.prepare(sql)));
  env.SPONSOR_BOOKING_ENABLED='true';env.SPONSOR_ADMIN_TOKEN=accessKey;
  env.SPONSOR_PAYMENT_ENABLED='test';env.DODO_PAYMENTS_API_KEY='test-not-real';
  env.DODO_PAYMENTS_WEBHOOK_KEY=`whsec_${Buffer.from('local-webhook-test-secret-only-123').toString('base64')}`;
  env.DODO_SPONSOR_TEST_PRODUCT_ID='pdt_test';
});

describe('sandbox sponsorship checkout and signed payment settlement',()=>{
  it('preserves existing active placements and audit records during migration',()=>{expect(migrationPreserved).toBe(true);});
  function client(mode:'test'|'live'='test') {
    const sdk=paymentClient(env,mode);
    const productId=mode==='test'?'pdt_test':'pdt_live';
    vi.spyOn(sdk.products,'retrieve').mockResolvedValue({product_id:productId,is_recurring:false,price:{type:'one_time_price',price:SPONSOR_OFFER.amount,currency:SPONSOR_OFFER.currency,tax_inclusive:true}} as never);
    vi.spyOn(sdk.checkoutSessions,'create').mockResolvedValue({session_id:`cks_${mode}`,checkout_url:`https://${mode==='test'?'test.':''}checkout.dodopayments.com/session/${mode}`} as never);
    return sdk;
  }
  async function approved() {
    const b=await createBooking(env.SPONSOR_DB!,input,{key:'test-logo',type:'image/png'});
    await moderateBooking(env.SPONSOR_DB!,{action:'approve',id:b.id});return b;
  }
  async function attempt(mode:'test'|'live'='test') {
    if(mode==='live') {env.SPONSOR_PAYMENT_ENABLED='live';env.DODO_SPONSOR_PRODUCT_ID='pdt_live';env.DODO_SPONSOR_LIVE_API_KEY='live-not-real';env.DODO_SPONSOR_LIVE_WEBHOOK_KEY=env.DODO_PAYMENTS_WEBHOOK_KEY;}
    const b=await approved();const sdk=client(mode);
    await createSponsorCheckout(env,b.id,'http://localhost',sdk);
    const a=(await env.SPONSOR_DB!.prepare('SELECT * FROM sponsor_payments WHERE booking_id=?').bind(b.id).first<PaymentAttempt>())!;
    const payment={payment_id:`pay_${mode}`,status:'succeeded',currency:String(SPONSOR_OFFER.currency),total_amount:Number(SPONSOR_OFFER.amount),checkout_session_id:`cks_${mode}`,product_cart:[{product_id:mode==='test'?'pdt_test':'pdt_live',quantity:1}],metadata:{sponsor_attempt_id:a.id,sponsor_booking_id:b.id,sponsor_mode:mode},disputes:[],refund_status:null};
    vi.spyOn(sdk.payments,'retrieve').mockResolvedValue(payment as never);
    return {b,sdk,a,payment};
  }
  function signed(type='payment.succeeded',id=crypto.randomUUID(),date=new Date()) {
    const raw=JSON.stringify({type,data:{payment_id:`pay_${env.SPONSOR_PAYMENT_ENABLED==='live'?'live':'test'}`}});
    const signature=new Webhook(env.DODO_PAYMENTS_WEBHOOK_KEY!).sign(id,date,raw);
    return {raw,headers:new Headers({'webhook-id':id,'webhook-timestamp':String(Math.floor(date.getTime()/1000)),'webhook-signature':signature})};
  }
  it('requires a matching, complete test or live payment configuration',()=>{
    env.SPONSOR_PAYMENT_ENABLED='false';expect(()=>paymentClient(env)).toThrow('not configured');
    expect(configuredPaymentMode(env)).toBeNull();
    env.SPONSOR_PAYMENT_ENABLED='live';env.DODO_SPONSOR_PRODUCT_ID='pdt_live';expect(configuredPaymentMode(env)).toBeNull();
    env.DODO_SPONSOR_LIVE_API_KEY='live-not-real';env.DODO_SPONSOR_LIVE_WEBHOOK_KEY=env.DODO_PAYMENTS_WEBHOOK_KEY;
    expect(configuredPaymentMode(env)).toBe('live');
    expect(paymentClient(env).baseURL).toBe('https://live.dodopayments.com');
    env.SPONSOR_PAYMENT_ENABLED='test';expect(paymentClient(env).baseURL).toBe('https://test.dodopayments.com');
  });
  it('protects checkout routes and rejects unsigned webhook requests',async()=>{
    const url='http://localhost/api/admin/sponsors/checkout';
    expect((await checkoutRoute(new Request(url,{method:'POST',headers:{origin:'http://localhost'},body:'{}'}))).status).toBe(401);
    expect((await checkoutRoute(new Request(url,{method:'POST',headers:{origin:'https://evil.example',authorization:`Bearer ${accessKey}`},body:'{}'}))).status).toBe(403);
    expect((await checkoutRoute(new Request(url,{method:'POST',headers:{origin:'http://localhost',authorization:`Bearer ${accessKey}`},body:'{}'}))).status).toBe(422);
    const webhook=await webhookRoute(new Request('http://localhost/api/sponsorship/webhook',{method:'POST',body:JSON.stringify({type:'payment.succeeded',data:{payment_id:'pay_test'}})}));
    expect(webhook.status).toBe(401);
  });
  it('retains an ambiguous checkout attempt instead of creating a second charge path',async()=>{
    const b=await approved();const sdk=client();vi.mocked(sdk.checkoutSessions.create).mockRejectedValue(new Error('timeout'));
    await expect(createSponsorCheckout(env,b.id,'http://localhost',sdk)).rejects.toThrow('timeout');
    await expect(createSponsorCheckout(env,b.id,'http://localhost',sdk)).rejects.toThrow('already exists');
    expect(sdk.checkoutSessions.create).toHaveBeenCalledTimes(1);
  });
  it('creates only one checkout per approved booking and blocks complimentary activation afterwards',async()=>{
    const b=await approved();const sdk=client();
    const outcomes=await Promise.allSettled([1,2].map(()=>createSponsorCheckout(env,b.id,'http://localhost',sdk)));
    expect(outcomes.filter(o=>o.status==='fulfilled').length).toBeGreaterThanOrEqual(1);
    expect(sdk.checkoutSessions.create).toHaveBeenCalledTimes(1);
    const existing=await createSponsorCheckout(env,b.id,'http://localhost',sdk);expect(existing.mode).toBe('test');
    const attempt=await env.SPONSOR_DB!.prepare('SELECT amount,currency,duration_seconds,mode FROM sponsor_payments WHERE booking_id=?').bind(b.id).first<Pick<PaymentAttempt,'amount'|'currency'|'duration_seconds'|'mode'>>();
    expect(attempt).toEqual({amount:SPONSOR_OFFER.amount,currency:SPONSOR_OFFER.currency,duration_seconds:SPONSOR_OFFER.durationSeconds,mode:'test'});
    await expect(moderateBooking(env.SPONSOR_DB!,{id:b.id,action:'activate',complimentary:true,endsAt:nowSeconds()+3600})).rejects.toThrow('not available');
  });
  it('does not allow pending requests or altered sandbox pricing to collect payment',async()=>{
    const b=await createBooking(env.SPONSOR_DB!,input,{key:'test',type:'image/png'});const sdk=client();
    await expect(createSponsorCheckout(env,b.id,'http://localhost',sdk)).rejects.toThrow('Approve');
    await moderateBooking(env.SPONSOR_DB!,{action:'approve',id:b.id});
    vi.mocked(sdk.products.retrieve).mockResolvedValue({product_id:'pdt_test',price:{type:'one_time_price',price:999,currency:'USD',tax_inclusive:true}} as never);
    await expect(createSponsorCheckout(env,b.id,'http://localhost',sdk)).rejects.toThrow('fixed-price');
    expect(sdk.checkoutSessions.create).not.toHaveBeenCalled();
  });
  it('verifies signature, timestamp and body before querying Dodo',async()=>{
    const {sdk}=await attempt();const e=signed();
    await expect(processPaymentWebhook(env,e.raw+' ',e.headers,sdk)).rejects.toThrow('signature');
    const old=signed('payment.succeeded',crypto.randomUUID(),new Date(Date.now()-600000));
    await expect(processPaymentWebhook(env,old.raw,old.headers,sdk)).rejects.toThrow('signature');
    expect(sdk.payments.retrieve).not.toHaveBeenCalled();
  });
  it('settles once, hides sandbox ads and does not extend placement on replay',async()=>{
    const {sdk,b}=await attempt();const e=signed();
    await processPaymentWebhook(env,e.raw,e.headers,sdk);
    const first=await bookingById(env.SPONSOR_DB!,b.id);expect(first?.activation_kind).toBe('paid_test');expect(first?.status).toBe('active');
    expect(await publicSponsors(env.SPONSOR_DB!)).toEqual([]);
    await expect(serveLogo(env,b.id)).rejects.toThrow('not found');
    await processPaymentWebhook(env,e.raw,e.headers,sdk);
    const second=signed();await processPaymentWebhook(env,second.raw,second.headers,sdk);
    expect((await bookingById(env.SPONSOR_DB!,b.id))?.ends_at).toBe(first?.ends_at);
    const audits=await env.SPONSOR_DB!.prepare("SELECT count(*) AS count FROM sponsor_audit WHERE action='test_payment_activated'").first<{count:number}>();expect(audits?.count).toBe(1);
  });
  it('activates verified live payments publicly for the approved 30-day term',async()=>{
    const {sdk,b}=await attempt('live');const e=signed();
    await processPaymentWebhook(env,e.raw,e.headers,sdk);
    const booking=await bookingById(env.SPONSOR_DB!,b.id);
    expect(booking?.activation_kind).toBe('paid_live');expect(booking?.status).toBe('active');
    if(!booking||booking.starts_at===null||booking.ends_at===null)throw new Error('Live payment did not set a display term.');
    expect(booking.ends_at-booking.starts_at).toBe(SPONSOR_OFFER.durationSeconds);
    expect(await publicSponsors(env.SPONSOR_DB!)).toHaveLength(1);
    await env.SPONSOR_LOGOS!.put('test-logo',png.buffer.slice(png.byteOffset,png.byteOffset+png.byteLength) as ArrayBuffer);
    expect((await serveLogo(env,b.id)).status).toBe(200);
  });
  it.each(['amount','currency','product','quantity','session','booking','mode','status'])('rejects mismatched %s without granting a placement',async(field)=>{
    const {sdk,b,payment}=await attempt();
    if(field==='amount')payment.total_amount=1;
    if(field==='currency')payment.currency='INR';
    if(field==='product')payment.product_cart[0]!.product_id='pdt_other';
    if(field==='quantity')payment.product_cart[0]!.quantity=2;
    if(field==='session')payment.checkout_session_id='cks_other';
    if(field==='booking')payment.metadata.sponsor_booking_id=crypto.randomUUID();
    if(field==='mode')payment.metadata.sponsor_mode='live';
    if(field==='status')payment.status='processing';
    const e=signed();await expect(processPaymentWebhook(env,e.raw,e.headers,sdk)).rejects.toThrow();
    expect((await bookingById(env.SPONSOR_DB!,b.id))?.status).toBe('approved');
  });
  it('records a late payment for owner review without reclaiming someone else’s slot',async()=>{
    const {sdk,b}=await attempt();
    await env.SPONSOR_DB!.prepare('UPDATE sponsor_bookings SET approval_until=? WHERE id=?').bind(nowSeconds()-1,b.id).run();
    await expireBookings(env.SPONSOR_DB!);
    const next=await approved();const e=signed();await processPaymentWebhook(env,e.raw,e.headers,sdk);
    expect((await bookingById(env.SPONSOR_DB!,next.id))?.status).toBe('approved');
    expect((await bookingById(env.SPONSOR_DB!,b.id))?.status).toBe('ended');
    expect((await env.SPONSOR_DB!.prepare('SELECT status FROM sponsor_payments WHERE booking_id=?').bind(b.id).first<PaymentAttempt>())?.status).toBe('review');
  });
  it('ends a test placement on refund and cannot reactivate it with an old success event',async()=>{
    const {sdk,b,payment}=await attempt();const success=signed();await processPaymentWebhook(env,success.raw,success.headers,sdk);
    Object.assign(payment,{refund_status:'full'});
    const refund=signed('refund.succeeded');await processPaymentWebhook(env,refund.raw,refund.headers,sdk);
    const replay=signed();await processPaymentWebhook(env,replay.raw,replay.headers,sdk);
    expect((await bookingById(env.SPONSOR_DB!,b.id))?.status).toBe('ended');
  });
});
afterAll(async()=>{await dispose?.();});

describe('sponsor validation and authentication',()=>{
  it('rejects unsafe destinations and SVG or falsely named uploads',()=>{
    expect(bookingInput.safeParse({...input,url:'javascript:alert(1)'}).success).toBe(false);
    expect(bookingInput.safeParse({...input,url:'https://user:secret@example.com'}).success).toBe(false);
    expect(logoType(new TextEncoder().encode('<svg onload="alert(1)"></svg>'))).toBeNull();
    expect(logoType(png)).toBe('image/png');
  });
  it('fails closed without a configured key and rejects cross-origin requests',()=>{
    expect(()=>requireAdmin(new Request('http://localhost'),{})).toThrow('not configured');
    expect(()=>requireAdmin(new Request('http://localhost'),env)).toThrow('Invalid admin');
    expect(()=>sameOrigin(new Request('http://localhost/api',{headers:{origin:'https://evil.example'}}))).toThrow('this website');
  });
});

describe('D1-backed sponsor lifecycle',()=>{
  it('submits a private request and stores its logo without reserving inventory',async()=>{
    const response=await submit(request(form()));expect(response.status).toBe(201);
    const receipt=await response.json();expect(receipt.status).toBe('pending');
    expect((await availability(env.SPONSOR_DB!)).filter(s=>s.available)).toHaveLength(8);
    expect(await publicSponsors(env.SPONSOR_DB!)).toEqual([]);
    await expect(serveLogo(env,receipt.id)).rejects.toThrow('not found');
    const privateLogo=await serveLogo(env,receipt.id,true);expect(privateLogo.headers.get('content-type')).toBe('image/png');
    expect((await privateLogo.arrayBuffer()).byteLength).toBe(png.length);
  });
  it('prevents two concurrent approvals from claiming one slot',async()=>{
    const first=await createBooking(env.SPONSOR_DB!,input,{key:'a',type:'image/png'});
    const second=await createBooking(env.SPONSOR_DB!,input,{key:'b',type:'image/png'});
    const outcomes=await Promise.allSettled([first,second].map(b=>moderateBooking(env.SPONSOR_DB!,{action:'approve',id:b.id})));
    expect(outcomes.filter(o=>o.status==='fulfilled')).toHaveLength(1);
    expect(outcomes.filter(o=>o.status==='rejected')).toHaveLength(1);
    expect((await availability(env.SPONSOR_DB!))[0]?.available).toBe(false);
    const audit=await env.SPONSOR_DB!.prepare("SELECT count(*) AS count FROM sponsor_audit WHERE action='approve'").first<{count:number}>();
    expect(audit?.count).toBe(1);
  });
  it('requires approval before complimentary activation, supports pause/resume, and expires',async()=>{
    const b=await createBooking(env.SPONSOR_DB!,input,{key:'logo',type:'image/png'});const now=nowSeconds();
    await env.SPONSOR_LOGOS!.put('logo',png.buffer.slice(png.byteOffset,png.byteOffset+png.byteLength) as ArrayBuffer);
    await expect(moderateBooking(env.SPONSOR_DB!,{action:'activate',id:b.id,complimentary:true,endsAt:now+3600},now)).rejects.toThrow('not available');
    await moderateBooking(env.SPONSOR_DB!,{action:'approve',id:b.id},now);
    await moderateBooking(env.SPONSOR_DB!,{action:'activate',id:b.id,complimentary:true,endsAt:now+3600},now);
    const publicData=await publicSponsors(env.SPONSOR_DB!);expect(publicData).toHaveLength(1);
    expect(publicData[0]).not.toHaveProperty('contact_email');expect(publicData[0]).not.toHaveProperty('logo_key');
    expect((await serveLogo(env,b.id)).status).toBe(200);
    await moderateBooking(env.SPONSOR_DB!,{action:'pause',id:b.id},now+1);expect(await publicSponsors(env.SPONSOR_DB!)).toEqual([]);
    expect((await availability(env.SPONSOR_DB!))[0]?.available).toBe(false);
    await moderateBooking(env.SPONSOR_DB!,{action:'resume',id:b.id},now+2);expect(await publicSponsors(env.SPONSOR_DB!)).toHaveLength(1);
    await expireBookings(env.SPONSOR_DB!,now+3601);expect((await bookingById(env.SPONSOR_DB!,b.id))?.status).toBe('ended');
    expect((await availability(env.SPONSOR_DB!))[0]?.available).toBe(true);
  });
  it('releases an unactivated approval after 24 hours and rejects disabling a slot',async()=>{
    const b=await createBooking(env.SPONSOR_DB!,input,{key:'a',type:'image/png'});const now=nowSeconds();
    await moderateBooking(env.SPONSOR_DB!,{action:'approve',id:b.id},now);await expireBookings(env.SPONSOR_DB!,now+86401);
    expect((await availability(env.SPONSOR_DB!))[0]?.available).toBe(true);
    await env.SPONSOR_DB!.prepare('UPDATE sponsor_slots SET enabled=0 WHERE id=1').run();
    await expect(createBooking(env.SPONSOR_DB!,input,{key:'b',type:'image/png'})).rejects.toThrow('unavailable');
  });
});

describe('sponsor request routes',()=>{
  it('does not expose booking contacts without owner authentication',async()=>{
    await createBooking(env.SPONSOR_DB!,input,{key:'a',type:'image/png'});
    expect((await adminList(new Request('http://localhost/api/admin/sponsors'))).status).toBe(401);
    const response=await adminList(new Request('http://localhost/api/admin/sponsors',{headers:{authorization:`Bearer ${accessKey}`}}));
    const data=await response.json();expect(data.bookings[0].contact_email).toBe(input.contactEmail);
    expect(data.bookings[0]).not.toHaveProperty('logo_key');
    expect(JSON.stringify(await (await publicList()).json())).not.toContain(input.contactEmail);
  });
  it('rejects closed bookings, invalid logos and oversized request bodies',async()=>{
    env.SPONSOR_BOOKING_ENABLED='false';expect((await submit(request(form()))).status).toBe(503);env.SPONSOR_BOOKING_ENABLED='true';
    const bad=form();bad.set('logo',new File(['<svg/>'],'logo.png',{type:'image/png'}));expect((await submit(request(bad))).status).toBe(422);
    const huge=form();huge.set('logo',new File([new Uint8Array(2300000)],'logo.png',{type:'image/png'}));expect((await submit(request(huge))).status).toBe(413);
    expect((await env.SPONSOR_DB!.prepare('SELECT count(*) AS count FROM sponsor_bookings').first<{count:number}>())?.count).toBe(0);
  });
  it('limits public submissions using durable D1 counters',async()=>{
    const results=[];for(let i=0;i<6;i++)results.push((await submit(request(form({slotId:'2'})))).status);
    expect(results).toEqual([201,201,201,201,201,429]);
  });
});
