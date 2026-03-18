import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { access_token } = await req.json();

  if (!access_token || typeof access_token !== 'string') {
    return NextResponse.json({ error: 'invalid token' }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('access_token', access_token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('access_token');
  return res;
}
