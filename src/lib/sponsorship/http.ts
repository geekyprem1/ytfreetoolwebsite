import { createHash, timingSafeEqual } from 'node:crypto';
import type { SponsorEnvironment } from './types';

export class SponsorError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}
export function failure(error: unknown) {
  if (error instanceof SponsorError) return json({ error: error.message }, error.status);
  return json({ error: 'The sponsorship service is temporarily unavailable. Please try again later.' }, 503);
}
export function sameOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) throw new SponsorError(403, 'Use the booking form on this website.');
}
export function requireAdmin(request: Request, env: SponsorEnvironment) {
  const secret = env.SPONSOR_ADMIN_TOKEN;
  if (!secret || secret.length < 32) throw new SponsorError(503, 'Sponsor administration is not configured.');
  const provided = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
  if (provided.length > 512 || !timingSafeEqual(createHash('sha256').update(provided).digest(), createHash('sha256').update(secret).digest())) {
    throw new SponsorError(401, 'Invalid admin access key.');
  }
}
export async function boundedBody(request: Request, limit: number) {
  const reader = request.body?.getReader();
  if (!reader) throw new SponsorError(400, 'Request body required.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.length;
    if (size > limit) { await reader.cancel(); throw new SponsorError(413, 'The upload is too large. Logos must be 2 MB or smaller.'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}
