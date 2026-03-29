const BASE_URL = '/api/proxy';

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
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  console.log(res);

  if (!res.ok) {
    if ((res.status === 401 || res.status === 403) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-error', { detail: { status: res.status } }));
    }
    throw new ApiError(res.status, path);
  }

  return res.json() as Promise<T>;
}
