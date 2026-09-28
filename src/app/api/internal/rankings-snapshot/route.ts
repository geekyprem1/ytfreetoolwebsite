import { NextResponse, type NextRequest } from 'next/server';
import { getRankingPool } from '@/lib/rankings/rankings';
import { recordDailySnapshot, utcDay } from '@/lib/rankings/snapshots';

export const dynamic = 'force-dynamic';

/**
 * GET /api/internal/rankings-snapshot
 *
 * Daily Vercel Cron job (see vercel.json). Guarantees one subscriber snapshot
 * per UTC day for the Fastest Growing ranking, even on days when no ranking
 * page is regenerated. Page renders also write the snapshot, so this is a
 * safety net rather than the only writer.
 *
 * Protected by CRON_SECRET: Vercel sends `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, error: 'CRON_SECRET not configured' }, { status: 500 });
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const pool = await getRankingPool();
  if (pool.channels.length === 0) {
    return NextResponse.json({ success: false, error: 'Ranking pool unavailable' }, { status: 502 });
  }

  // getRankingPool already attempts the write; this reports whether today's exists now.
  const wroteNow = await recordDailySnapshot(pool.channels);

  return NextResponse.json({
    success: true,
    date: utcDay(),
    channels: pool.channels.length,
    fetchedAt: pool.fetchedAt,
    wroteNow,
  });
}
