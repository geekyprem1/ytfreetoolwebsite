import { z } from 'zod';

export const bookingInput = z.object({
  slotId: z.coerce.number().int().min(1).max(8),
  brand: z.string().trim().min(1).max(40),
  url: z.string().trim().max(2048).url().refine(value => {
    try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; }
  }, 'Use an HTTPS website address without credentials.'),
  tagline: z.string().trim().min(1).max(60),
  contactName: z.string().trim().min(1).max(100),
  contactEmail: z.string().trim().email().max(254),
  note: z.string().trim().max(1000).default(''),
});
export const adminInput = z.discriminatedUnion('action', [
  z.object({ action: z.enum(['approve','reject','pause','resume','end']), id: z.string().uuid() }),
  z.object({ action: z.literal('activate'), id: z.string().uuid(), complimentary: z.literal(true), endsAt: z.number().int() }),
]);
export const MAX_LOGO_BYTES = 2 * 1024 * 1024;
export function logoType(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if ([137,80,78,71,13,10,26,10].every((n,i) => bytes[i] === n)) return 'image/png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (new TextDecoder().decode(bytes.slice(0,4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8,12)) === 'WEBP') return 'image/webp';
  return null;
}
