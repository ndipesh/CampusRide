interface ApiResponse<T> {
  status: number;
  ok: boolean;
  data: T;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  const options: RequestInit = {
    method,
    credentials: 'include',
    headers: {},
  };

  if (body instanceof FormData) {
    options.body = body;
  } else if (body !== undefined) {
    (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(path, options);

  let data: T;
  try {
    data = await response.json();
  } catch {
    data = null as T;
  }

  return {
    status: response.status,
    ok: response.ok,
    data,
  };
}

export function get<T>(path: string): Promise<ApiResponse<T>> {
  return request<T>('GET', path);
}

export function post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  return request<T>('POST', path, body);
}

export function put<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  return request<T>('PUT', path, body);
}

export function del<T>(path: string): Promise<ApiResponse<T>> {
  return request<T>('DELETE', path);
}
