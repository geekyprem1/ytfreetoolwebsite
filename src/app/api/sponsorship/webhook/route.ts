import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { boundedBody, failure, json } from '@/lib/sponsorship/http';
import { processPaymentWebhook } from '@/lib/sponsorship/payments';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const env=await sponsorEnvironment();
    const raw=new TextDecoder('utf-8',{fatal:true}).decode(await boundedBody(request,131072));
    return json(await processPaymentWebhook(env,raw,request.headers));
  } catch(error) {return failure(error);}
}
