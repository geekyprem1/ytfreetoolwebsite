// End-to-end smoke test against a LOCAL preview only. No production bookings.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='http://localhost:4180';
const vars=fs.readFileSync('.dev.vars','utf8');
const key=vars.match(/^SPONSOR_ADMIN_TOKEN=(.+)$/m)?.[1]?.trim();
assert.ok(key,'Local admin key must be configured in ignored .dev.vars.');
const owner={Authorization:`Bearer ${key}`};
async function action(id,action,extra={}) {
  const response=await fetch(`${base}/api/admin/sponsors`,{method:'POST',headers:{...owner,Origin:base,'Content-Type':'application/json'},body:JSON.stringify({id,action,...extra})});
  const data=await response.json();assert.equal(response.status,200,`${action}: ${data.error || response.status}`);return data;
}
const availability=await (await fetch(`${base}/api/sponsorship/availability`)).json();
assert.equal(availability.bookingEnabled,true,'Local bookings should be enabled.');
const slot=availability.slots.find(s=>s.kind==='featured'&&s.available);assert.ok(slot,'A local test slot must be available.');
const form=new FormData();
for(const [k,v] of Object.entries({slotId:String(slot.id),brand:'Local smoke-test sponsor',url:'https://example.com',tagline:'Example only. This is a local backend test.',contactName:'Local Test',contactEmail:'sponsor-test@example.com',note:'Synthetic local validation record; not a real booking.'}))form.set(k,v);
const pixel=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1XkAAAAASUVORK5CYII=','base64');
form.set('logo',new File([pixel],'logo.png',{type:'image/png'}));
const response=await fetch(`${base}/api/sponsorship/bookings`,{method:'POST',headers:{Origin:base},body:form});
const receipt=await response.json();assert.equal(response.status,201,receipt.error);
const id=receipt.id;
try {
  assert.equal((await fetch(`${base}/api/admin/sponsors`)).status,401);
  assert.equal((await fetch(`${base}/api/sponsors/${id}/logo`)).status,404);
  const list=await (await fetch(`${base}/api/admin/sponsors`,{headers:owner})).json();
  assert.equal(list.bookings.find(b=>b.id===id)?.contact_email,'sponsor-test@example.com');
  assert.equal((await fetch(`${base}/api/admin/sponsors/${id}/logo`,{headers:owner})).status,200);
  await action(id,'approve');
  assert.equal((await (await fetch(`${base}/api/sponsors`)).json()).sponsors.some(s=>s.id===id),false);
  await action(id,'activate',{complimentary:true,endsAt:Math.floor(Date.now()/1000)+3600});
  const published=await (await fetch(`${base}/api/sponsors`)).json();
  assert.equal(published.sponsors.some(s=>s.id===id),true);
  assert.equal(JSON.stringify(published).includes('sponsor-test@example.com'),false);
  assert.equal((await fetch(`${base}/api/sponsors/${id}/logo`)).status,200);
  await action(id,'pause');assert.equal((await (await fetch(`${base}/api/sponsors`)).json()).sponsors.some(s=>s.id===id),false);
  await action(id,'resume');await action(id,'end');
  assert.equal((await fetch(`${base}/api/sponsors/${id}/logo`)).status,404);
  assert.equal((await (await fetch(`${base}/api/sponsorship/availability`)).json()).slots.find(s=>s.id===slot.id)?.available,true);
  console.log('PASS: local submit, private logo, admin authentication, approval, complimentary activation, public privacy, pause/resume and end/release. Synthetic request remains ended in the local review queue.');
} catch(error) {
  await action(id,'end').catch(()=>undefined);throw error;
}

// Verify real clock-based expiry through HTTP as well as explicit owner ending.
form.set('brand','Local expiry-test sponsor');
const expiryResponse=await fetch(`${base}/api/sponsorship/bookings`,{method:'POST',headers:{Origin:base},body:form});
const expiring=await expiryResponse.json();assert.equal(expiryResponse.status,201,expiring.error);
try {
  await action(expiring.id,'approve');
  const deadline=Math.floor(Date.now()/1000)+8;
  await action(expiring.id,'activate',{complimentary:true,endsAt:deadline});
  assert.equal((await (await fetch(`${base}/api/sponsors`)).json()).sponsors.some(s=>s.id===expiring.id),true);
  await new Promise(resolve=>setTimeout(resolve,Math.max(0,deadline*1000-Date.now())+150));
  assert.equal((await (await fetch(`${base}/api/sponsors`)).json()).sponsors.some(s=>s.id===expiring.id),false);
  assert.equal((await fetch(`${base}/api/sponsors/${expiring.id}/logo`)).status,404);
  assert.equal((await (await fetch(`${base}/api/sponsorship/availability`)).json()).slots.find(s=>s.id===slot.id)?.available,true);
  const review=await (await fetch(`${base}/api/admin/sponsors`,{headers:owner})).json();
  assert.equal(review.bookings.find(b=>b.id===expiring.id)?.status,'ended');
  console.log('PASS: clock-based expiry hides the public creative/logo, releases its slot and marks the local test request ended.');
} catch(error) {
  await action(expiring.id,'end').catch(()=>undefined);throw error;
}
