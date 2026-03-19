import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  if (!token && req.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

export const config = {
  matcher: ['/user/:path*'],
};
