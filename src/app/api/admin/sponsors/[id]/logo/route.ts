import { sponsorEnvironment } from '@/lib/sponsorship/runtime';
import { serveLogo } from '@/lib/sponsorship/logos';
import { failure, requireAdmin } from '@/lib/sponsorship/http';
export const dynamic='force-dynamic';
export async function GET(request: Request, {params}: {params:Promise<{id:string}>}) {
  try { const env=await sponsorEnvironment(); requireAdmin(request,env); return await serveLogo(env,(await params).id,true); } catch(error) { return failure(error); }
}
