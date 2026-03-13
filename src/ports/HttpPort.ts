export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpError extends Error {
  status?: number;
  statusText?: string;
  response?: HttpResponse;
}

export interface HttpRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export interface HttpPort {
  request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>>;
  get<T = unknown>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  put<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  patch<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}
