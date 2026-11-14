import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Clone request headers to pass downstream to server components
  const requestHeaders = new Headers(request.headers);

  // Add security headers to all responses
  // We'll set these on the response object later
  const responseHeaders = new Headers();
  responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ─── i18n Language Negotiation ──────────────────────────────────────────
  const SUPPORTED_LOCALES = ['en', 'ar'];
  const defaultLocale = 'en';
  let locale = request.cookies.get('axiom_locale')?.value;

  // Check if query param forces a locale change
  const queryLocale = request.nextUrl.searchParams.get('lang');
  if (queryLocale && SUPPORTED_LOCALES.includes(queryLocale)) {
    locale = queryLocale;
  } else if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    // Check Accept-Language header
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang?.includes('ar')) {
      locale = 'ar';
    } else {
      locale = defaultLocale;
    }
  }

  // Expose locale to request headers so server components can read it via headers()
  requestHeaders.set('x-axiom-locale', locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Apply security headers to the final response
  responseHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  // Expose locale to response headers for the browser
  response.headers.set('x-axiom-locale', locale);

  // Set cookie if changed or not present
  if (request.cookies.get('axiom_locale')?.value !== locale) {
    response.cookies.set('axiom_locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }

  // ─── Admin route protection ─────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('axiom_admin_token')?.value;

    if (!adminToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('type', 'admin');
      return NextResponse.redirect(loginUrl);
    }

    const payload = verifyToken(adminToken);
    if (!payload || payload.type !== 'admin') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('type', 'admin');
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // ─── Account route protection ───────────────────────────────────────────
  if (pathname.startsWith('/account')) {
    const authToken = request.cookies.get('axiom_auth_token')?.value;

    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = verifyToken(authToken);
    if (!payload) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // ─── Redirect authenticated users away from login/register ──────────────
  if (pathname === '/login' || pathname === '/register') {
    const authToken = request.cookies.get('axiom_auth_token')?.value;
    if (authToken) {
      const payload = verifyToken(authToken);
      if (payload) {
        return NextResponse.redirect(new URL('/account', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - api (API routes handle their own auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|api/).*)',
  ],
};
