import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { bookingsOpen, createBooking, limitSubmissions, requireStorage } from '@/lib/sponsorship/store';
import { boundedBody, failure, json, sameOrigin, SponsorError } from '@/lib/sponsorship/http';
import { bookingInput, logoType, MAX_LOGO_BYTES } from '@/lib/sponsorship/validation';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const env = await sponsorEnvironment();
    if (!bookingsOpen(env)) throw new SponsorError(503, 'Sponsorship requests are not open yet.');
    const {db,logos} = requireStorage(env);
    await limitSubmissions(db,request.headers.get('cf-connecting-ip') || 'local');
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.startsWith('multipart/form-data;')) throw new SponsorError(415,'Use the sponsorship form to upload a logo.');
    const bytes = await boundedBody(request,MAX_LOGO_BYTES+32*1024);
    const form = await new Response(bytes,{headers:{'content-type':contentType}}).formData();
    const parsed = bookingInput.safeParse(Object.fromEntries(['slotId','brand','url','tagline','contactName','contactEmail','note'].map(k => [k,form.get(k) ?? ''])));
    if (!parsed.success) throw new SponsorError(422, parsed.error.issues[0]?.message || 'Check your details.');
    const logo = form.get('logo');
    if (!(logo instanceof File) || !logo.size || logo.size > MAX_LOGO_BYTES) throw new SponsorError(422,'Upload a PNG, JPG or WebP logo, 2 MB or smaller.');
    const data = await logo.arrayBuffer(); const type = logoType(new Uint8Array(data));
    if (!type || type !== logo.type) throw new SponsorError(422,'The logo must be a PNG, JPG or WebP image. SVG is not supported.');
    const id = crypto.randomUUID(); const key = `bookings/${id}`;
    await logos.put(key,data,{httpMetadata:{contentType:type}});
    try { return json(await createBooking(db,parsed.data,{key,type},id),201); }
    catch(error) { await logos.delete(key).catch(() => undefined); throw error; }
  } catch(error) { return failure(error); }
}
