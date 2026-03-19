import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  // Prevent open redirect: only allow relative paths
  const rawReturn = state ? decodeURIComponent(state) : '/';
  const returnTo = rawReturn.startsWith('/') ? rawReturn : '/';
  const response = NextResponse.redirect(new URL(returnTo, req.nextUrl.origin));

  if (!code) return response;

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`;
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) return response;

  const { id_token } = await tokenRes.json();
  if (!id_token) return response;

  const loginRes = await fetch(`${BACKEND_URL}/auth/login/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: id_token }),
  });

  if (!loginRes.ok) return response;

  const loginData = await loginRes.json();
  const accessToken = loginData?.data?.access_token;

  if (accessToken) {
    const cookieOpts = {
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
    };
    response.cookies.set('access_token', accessToken, { ...cookieOpts, httpOnly: true });
    response.cookies.set('auth_status', '1', { ...cookieOpts, httpOnly: false });
  }

  return response;
}
