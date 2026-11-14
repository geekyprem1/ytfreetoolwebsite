// Read-only production verification, plus an invalid-body request to ensure booking is closed.
// Never logs owner-key values or private booking details.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='https://yttools.pro';
const key=fs.readFileSync('.sponsor-production-owner.key','utf8').trim();
assert.ok(key.length>=32,'Production owner key must be available in the ignored local file.');
const results={};
const home=await fetch(base,{headers:{'Cache-Control':'no-cache'}});
const html=await home.text();
results.home=home.status===200 && html.includes('A little less work.');
results.canonical=/rel="canonical"[^>]*href="https:\/\/yttools\.pro\/?"/.test(html);
for(const route of ['/sponsor','/admin/sponsors','/thumbnail-downloader','/playlist-length-calculator']){
  const response=await fetch(base+route);await response.arrayBuffer();results[route]=response.status===200;
}
const availableResponse=await fetch(`${base}/api/sponsorship/availability`);
const availability=await availableResponse.json();
results.storageBound=availableResponse.status===200 && availability.slots?.length===8;
results.publicBookingClosed=availability.bookingEnabled===false;
results.adminProtected=(await fetch(`${base}/api/admin/sponsors`)).status===401;
const ownerResponse=await fetch(`${base}/api/admin/sponsors`,{headers:{Authorization:`Bearer ${key}`}});
const owner=await ownerResponse.json();
results.ownerAuthorized=ownerResponse.status===200 && Array.isArray(owner.bookings);
results.ownerResponseNotCached=ownerResponse.headers.get('cache-control')?.includes('no-store')===true;
const sponsorsResponse=await fetch(`${base}/api/sponsors`);const sponsors=await sponsorsResponse.json();
results.publicListing=sponsorsResponse.status===200 && Array.isArray(sponsors.sponsors);
results.contactsPrivate=Array.isArray(sponsors.sponsors) && sponsors.sponsors.every(s=>!('contact_email' in s)&&!('contact_name' in s)&&!('logo_key' in s));
const closed=await fetch(`${base}/api/sponsorship/bookings`,{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'});
await closed.arrayBuffer();results.closedSubmissionRejected=closed.status===503;
const report={checkedAt:new Date().toISOString(),base,results};
fs.writeFileSync('validation/sponsor-production-smoke.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
assert.ok(Object.values(results).every(Boolean),'Some production checks failed; see the report.');
