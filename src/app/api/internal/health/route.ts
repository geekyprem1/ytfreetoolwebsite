import { NextResponse } from 'next/server';
import { getRedis } from '@/lib/cache/redis';

export const dynamic = 'force-dynamic';

interface HealthCheck {
  name: string;
  status: 'ok' | 'degraded' | 'down';
  latencyMs?: number;
  message?: string;
}

/**
 * GET /api/internal/health
 *
 * Lightweight health check used by uptime monitors (e.g. UptimeRobot) and
 * post-deployment verification. Returns aggregated status of core services.
 *
 * NOTE: This route is public (no CRON_SECRET) so external monitors can hit it.
 * It intentionally does NOT expose any secrets or detailed internals.
 */
export async function GET() {
  const startedAt = Date.now();
  const checks: HealthCheck[] = [];

  // 1. App process is alive (if we got here, the server is running)
  checks.push({ name: 'app', status: 'ok' });

  // 2. Redis (Upstash) — optional, degraded if not configured
  try {
    const redis = getRedis();
    if (!redis) {
      checks.push({
        name: 'redis',
        status: 'degraded',
        message: 'UPSTASH_REDIS_URL/TOKEN not set — rate limiting falls back to in-memory',
      });
    } else {
      const t0 = Date.now();
      await redis.ping();
      checks.push({ name: 'redis', status: 'ok', latencyMs: Date.now() - t0 });
    }
  } catch (err) {
    checks.push({
      name: 'redis',
      status: 'degraded',
      message: err instanceof Error ? err.message : 'Redis ping failed',
    });
  }

  // 3. Required env vars presence (without exposing values)
  const requiredEnvVars = [
    'YOUTUBE_API_KEY',
    'GEMINI_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];
  const missing = requiredEnvVars.filter((v) => !process.env[v]);
  checks.push({
    name: 'env',
    status: missing.length === 0 ? 'ok' : 'down',
    message:
      missing.length === 0
        ? 'All required env vars present'
        : `Missing: ${missing.join(', ')}`,
  });

  const hasDown = checks.some((c) => c.status === 'down');
  const hasDegraded = checks.some((c) => c.status === 'degraded');
  const overall = hasDown ? 'down' : hasDegraded ? 'degraded' : 'ok';

  return NextResponse.json(
    {
      status: overall,
      timestamp: new Date().toISOString(),
      uptimeMs: Date.now() - startedAt,
      checks,
    },
    { status: overall === 'down' ? 503 : 200 },
  );
}