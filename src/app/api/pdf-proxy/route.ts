import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return new NextResponse('Missing url', { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    return new NextResponse('Failed to fetch PDF', { status: res.status });
  }

  const responseHeaders = new Headers();
  responseHeaders.set('Content-Type', 'application/pdf');
  responseHeaders.set('Content-Disposition', 'inline');

  const contentLength = res.headers.get('content-length');
  if (contentLength) responseHeaders.set('Content-Length', contentLength);

  return new NextResponse(res.body, {
    status: 200,
    headers: responseHeaders,
  });
}
