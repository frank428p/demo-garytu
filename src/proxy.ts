import { NextRequest, NextResponse } from 'next/server';

const VALID_LOCALES = ['en', 'zh-TW'] as const;
type Locale = (typeof VALID_LOCALES)[number];

function detectLocaleFromBrowser(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return 'en';
  return acceptLanguage.toLowerCase().includes('zh') ? 'zh-TW' : 'en';
}

function getValidCookieLocale(cookies: NextRequest['cookies']): Locale | null {
  const val = cookies.get('locale')?.value;
  return val && (VALID_LOCALES as readonly string[]).includes(val)
    ? (val as Locale)
    : null;
}

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const cookieLocale = getValidCookieLocale(req.cookies);
  const browserLocale = detectLocaleFromBrowser(req.headers.get('accept-language'));
  const effectiveLocale: Locale = cookieLocale ?? browserLocale;

  if (!token && req.nextUrl.pathname.startsWith('/user')) {
    const response = NextResponse.redirect(new URL('/', req.nextUrl));
    if (!cookieLocale) {
      response.cookies.set('locale', effectiveLocale, { path: '/', maxAge: 31536000 });
    }
    return response;
  }

  const response = NextResponse.next();
  if (!cookieLocale) {
    response.cookies.set('locale', effectiveLocale, { path: '/', maxAge: 31536000 });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|fonts).*)'],
};
