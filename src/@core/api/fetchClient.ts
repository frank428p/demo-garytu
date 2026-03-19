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
    throw new ApiError(res.status, path);
  }

  return res.json() as Promise<T>;
}
