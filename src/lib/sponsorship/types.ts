export type SponsorStatus = 'pending' | 'approved' | 'active' | 'paused' | 'rejected' | 'ended';
export interface SponsorBooking {
  id: string; slot_id: number; brand: string; url: string; tagline: string;
  contact_name: string; contact_email: string; note: string; logo_key: string; logo_type: string;
  status: SponsorStatus; created_at: number; updated_at: number;
  approval_until: number | null; starts_at: number | null; ends_at: number | null;
  activation_kind: 'complimentary' | null;
}
export interface SponsorSlot { id: number; kind: 'standard' | 'featured'; available: boolean }
export interface PublicSponsor { id: string; slotId: number; brand: string; url: string; tagline: string; logo: string; expiresAt: number }

// Small structural types keep application code independent of generated Worker types.
export interface Statement {
  bind(...values: (string | number | null)[]): Statement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
  run(): Promise<{ meta: { changes?: number } }>;
}
export interface SponsorDatabase {
  prepare(sql: string): Statement;
  batch(statements: Statement[]): Promise<unknown[]>;
}
export interface LogoBucket {
  put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType: string } }): Promise<unknown>;
  get(key: string): Promise<{ body: ReadableStream<Uint8Array> } | null>;
  delete(key: string): Promise<void>;
}
export interface SponsorEnvironment {
  SPONSOR_DB?: SponsorDatabase;
  SPONSOR_LOGOS?: LogoBucket;
  SPONSOR_ADMIN_TOKEN?: string;
  SPONSOR_BOOKING_ENABLED?: string;
}
