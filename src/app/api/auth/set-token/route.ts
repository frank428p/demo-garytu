import { NextRequest, NextResponse } from 'next/server';

const COOKIE_OPTS = {
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
  secure: process.env.NODE_ENV === 'production',
};

export async function POST(req: NextRequest) {
  const { access_token } = await req.json();

  if (!access_token || typeof access_token !== 'string') {
    return NextResponse.json({ error: 'invalid token' }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('access_token', access_token, { ...COOKIE_OPTS, httpOnly: true });
  // Non-httpOnly flag so client JS knows the user is logged in
  res.cookies.set('auth_status', '1', { ...COOKIE_OPTS, httpOnly: false });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('access_token');
  res.cookies.delete('auth_status');
  return res;
}
