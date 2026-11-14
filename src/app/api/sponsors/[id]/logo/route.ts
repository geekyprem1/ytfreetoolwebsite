import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { serveLogo } from '@/lib/sponsorship/logos';
import { failure } from '@/lib/sponsorship/http';
export const dynamic='force-dynamic';
export async function GET(_request: Request, {params}: {params:Promise<{id:string}>}) {
  try { return await serveLogo(await sponsorEnvironment(),(await params).id); } catch(error) { return failure(error); }
}
