const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export class ApiError extends Error {
  status: number;
  constructor(status: number, path: string) {
    super(`API error ${status}: ${path}`);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const cookie = typeof document !== 'undefined' ? document.cookie : '';
  const locale = cookie.match(/(?:^|;\s*)locale=([^;]+)/)?.[1] ?? '';
  const token = cookie.match(/(?:^|;\s*)access_token=([^;]+)/)?.[1] ?? '';

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(locale && { 'X-Locale': locale }),
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    if (
      (res.status === 401 || res.status === 403) &&
      typeof window !== 'undefined'
    ) {
      window.dispatchEvent(
        new CustomEvent('auth-error', { detail: { status: res.status } }),
      );
    }
    throw new ApiError(res.status, path);
  }

  const body = await res.json();

  if (body?.code !== undefined && body.code !== 0) {
    throw new ApiError(body.code, path);
  }

  return body as T;
}
