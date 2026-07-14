import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit/limiter';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );

  const requestId = crypto.randomUUID();
  response.headers.set('x-request-id', requestId);

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

    let tier: 'youtube' | 'ai' | 'compute' | 'resolve' = 'youtube';
    if (pathname.startsWith('/api/ai/')) {
      tier = 'ai';
    } else if (pathname.startsWith('/api/youtube/resolve')) {
      tier = 'resolve';
    } else if (pathname.includes('seo-score')) {
      tier = 'compute';
    }

    const result = await checkRateLimit(ip, tier);

    if (!result.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: `Too many requests. Please wait ${result.reset} seconds.`,
          },
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(result.reset),
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + result.reset),
          },
        },
      );
    }

    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
