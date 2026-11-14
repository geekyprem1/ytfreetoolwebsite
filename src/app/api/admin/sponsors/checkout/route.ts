import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { boundedBody, failure, json, requireAdmin, sameOrigin, SponsorError } from '@/lib/sponsorship/http';
import { checkoutInput, createSponsorCheckout } from '@/lib/sponsorship/payments';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    sameOrigin(request); const env = await sponsorEnvironment(); requireAdmin(request,env);
    const bytes = await boundedBody(request,4096);
    let body:unknown;try {body=JSON.parse(new TextDecoder().decode(bytes));} catch {throw new SponsorError(400,'Invalid JSON.');}
    const input=checkoutInput.safeParse(body);if(!input.success)throw new SponsorError(422,'Choose a valid booking.');
    return json(await createSponsorCheckout(env,input.data.id,new URL(request.url).origin));
  } catch(error) {return failure(error);}
}
