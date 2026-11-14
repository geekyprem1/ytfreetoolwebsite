import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { SponsorEnvironment } from './types';

export async function sponsorEnvironment(): Promise<SponsorEnvironment> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as unknown as SponsorEnvironment;
  } catch {
    return { SPONSOR_ADMIN_TOKEN: process.env.SPONSOR_ADMIN_TOKEN };
  }
}
