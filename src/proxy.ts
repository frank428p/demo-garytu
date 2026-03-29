import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.next();
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
  requestHeaders.set('x-user-data', JSON.stringify(userData));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|fonts).*)'],
};
