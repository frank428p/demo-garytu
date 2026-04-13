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

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const cookieLocale = getValidCookieLocale(req.cookies);
  const browserLocale = detectLocaleFromBrowser(req.headers.get('accept-language'));
  const effectiveLocale: Locale = cookieLocale ?? browserLocale;

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/user')) {
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const response = req.nextUrl.pathname.startsWith('/user')
      ? NextResponse.redirect(new URL('/', req.nextUrl))
      : NextResponse.next();
    response.cookies.delete('access_token');
    response.cookies.delete('auth_status');
    return response;
  }

  const userData = await res.json();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-data', JSON.stringify(userData?.data));

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  const userLocale: string | null = userData?.data?.locale ?? null;

  if (!userLocale) {
    // userData has no locale → PATCH API with current effective locale
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locale: effectiveLocale }),
    }).catch(() => {});

    if (!cookieLocale) {
      response.cookies.set('locale', effectiveLocale, { path: '/', maxAge: 31536000 });
    }
  } else {
    const validUserLocale = (VALID_LOCALES as readonly string[]).includes(userLocale)
      ? (userLocale as Locale)
      : null;

    if (validUserLocale && validUserLocale !== cookieLocale) {
      // userData locale differs from cookie → cookie follows userData
      response.cookies.set('locale', validUserLocale, { path: '/', maxAge: 31536000 });
    } else if (!cookieLocale) {
      // No valid cookie → set from browser detection
      response.cookies.set('locale', effectiveLocale, { path: '/', maxAge: 31536000 });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|fonts).*)'],
};
