import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='http://localhost:4180';
const content=fs.readFileSync('.dev.vars','utf8');
const key=content.match(/^SPONSOR_ADMIN_TOKEN=(.+)$/m)?.[1]?.trim().replace(/^(['"])(.*)\1$/,'$2');
assert.ok(key,'Local owner key required.');
const owner={Authorization:`Bearer ${key}`};
const stateFile='.wrangler/sponsor-test/checkout-10usd.json';
async function json(path,options={}) {
  const response=await fetch(base+path,options);const body=await response.json();
  assert.ok(response.ok,`${path}: HTTP ${response.status} ${body.error||''}`);return body;
}
async function action(id,action) {
  return json('/api/admin/sponsors',{method:'POST',headers:{...owner,Origin:base,'Content-Type':'application/json'},body:JSON.stringify({id,action})});
}
if(process.argv[2]==='prepare') {
  assert.ok(!fs.existsSync(stateFile),'An existing test checkout must be checked/ended first.');
  const slots=await json('/api/sponsorship/availability');const slot=slots.slots.find(s=>s.available);assert.ok(slot,'No local slot available.');
  const form=new FormData();
  for(const [k,v] of Object.entries({slotId:String(slot.id),brand:'Dodo sandbox smoke test',url:'https://example.com',tagline:'Synthetic local payment verification.',contactName:'Sandbox Test',contactEmail:'sponsor-test@example.com',note:'Local test only. Never publish.'}))form.set(k,v);
  form.set('logo',new File([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1XkAAAAASUVORK5CYII=','base64')],'test.png',{type:'image/png'}));
  const booking=await json('/api/sponsorship/bookings',{method:'POST',headers:{Origin:base},body:form});
  fs.mkdirSync('.wrangler/sponsor-test',{recursive:true});
  fs.writeFileSync(stateFile,JSON.stringify({id:booking.id,createdAt:new Date().toISOString()},null,2));
  await action(booking.id,'approve');
  const checkout=await json('/api/admin/sponsors/checkout',{method:'POST',headers:{...owner,Origin:base,'Content-Type':'application/json'},body:JSON.stringify({id:booking.id})});
  const state={id:booking.id,checkoutUrl:checkout.checkoutUrl,createdAt:new Date().toISOString()};
  fs.writeFileSync(stateFile,JSON.stringify(state,null,2));console.log(JSON.stringify(state));
} else {
  const state=JSON.parse(fs.readFileSync(stateFile,'utf8'));
  const list=await json('/api/admin/sponsors',{headers:owner});const b=list.bookings.find(b=>b.id===state.id);assert.ok(b,'Test booking missing.');
  if(process.argv[2]==='check') {
    console.log(JSON.stringify({bookingId:b.id,status:b.status,paymentMode:b.payment?.mode,amount:b.payment?.amount,currency:b.payment?.currency,durationSeconds:b.payment?.duration_seconds,paymentStatus:b.payment?.status,paymentId:b.payment?.payment_id??null,activationKind:b.activation_kind}));
    if(b.payment?.status==='paid') {
      assert.equal(b.payment.mode,'test');assert.equal(b.payment.amount,1000);assert.equal(b.payment.currency,'USD');assert.equal(b.payment.duration_seconds,30*24*60*60);
      assert.equal(b.activation_kind,'paid_test');assert.equal(b.status,'active');
      assert.equal((await json('/api/sponsors')).sponsors.some(s=>s.id===b.id),false);
      assert.equal((await fetch(base+`/api/sponsors/${b.id}/logo`)).status,404);
      await action(b.id,'end');
      const report={verifiedAt:new Date().toISOString(),mode:'test_mode',bookingId:b.id,paymentId:b.payment.payment_id,amount:b.payment.amount,currency:b.payment.currency,durationSeconds:b.payment.duration_seconds,realApplicationCheckout:true,deliveredWebhookActivated:true,sandboxExcludedFromPublicListing:true,sandboxPublicLogoDenied:true,syntheticPlacementEnded:true,productionChanged:false};
      fs.writeFileSync('validation/sponsor-payment-local-smoke.json',JSON.stringify(report,null,2)+'\n');
      console.log('PASS: real sandbox checkout and webhook settlement; test placement hidden publicly and ended.');
    }
  }else if(process.argv[2]==='end') {await action(state.id,'end');console.log('Local test placement ended.');}
  else throw new Error('Use prepare, check or end.');
}
