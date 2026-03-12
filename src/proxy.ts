import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
});

export const config = {
  matcher: ['/user/:path*'],
};
