// @vitest-environment node
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { getPlatformProxy } from 'wrangler';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { SponsorEnvironment } from './types';
import { availability, bookingById, createBooking, expireBookings, moderateBooking, nowSeconds, publicSponsors } from './store';
import { requireAdmin, sameOrigin } from './http';
import { serveLogo } from './logos';
import { bookingInput, logoType } from './validation';

let env:SponsorEnvironment;
let dispose:()=>Promise<void>;
vi.mock('@/lib/sponsorship/runtime',()=>({sponsorEnvironment:async()=>env}));
import { POST as submit } from '@/app/api/sponsorship/bookings/route';
import { GET as adminList } from '@/app/api/admin/sponsors/route';
import { GET as publicList } from '@/app/api/sponsors/route';

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
  const sql=readFileSync(resolve('migrations/sponsorship/0001_sponsorship.sql'),'utf8');
  for(const statement of sql.split(';').map(s=>s.trim()).filter(Boolean))await env.SPONSOR_DB!.prepare(statement).run();
},30000);
beforeEach(async()=>{
  await env.SPONSOR_DB!.batch(['DELETE FROM sponsor_audit','DELETE FROM sponsor_bookings','DELETE FROM sponsor_request_limits','UPDATE sponsor_slots SET enabled=1'].map(sql=>env.SPONSOR_DB!.prepare(sql)));
  env.SPONSOR_BOOKING_ENABLED='true';env.SPONSOR_ADMIN_TOKEN=accessKey;
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
