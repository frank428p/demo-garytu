import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = new URL(`/${path.join('/')}`, BACKEND_URL);
  url.search = req.nextUrl.search;

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const headers = new Headers(req.headers);
  headers.delete('host');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined;

  const res = await fetch(url.toString(), {
    method: req.method,
    headers,
    body,
  });

  const responseHeaders = new Headers(res.headers);
  responseHeaders.delete('content-encoding');

  return new NextResponse(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
