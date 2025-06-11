type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const request = async <T = any>(
  method: HTTPMethod,
  url: string,
  data?: any,
  options: RequestOptions = {}
): Promise<T> => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status} - ${errorText}`);
  }

  return response.json();
};


request.get = <T = any>(url: string, options: RequestOptions = {}) =>
  request<T>('GET', url, undefined, options);

request.post = <T = any>(url: string, data?: any, options: RequestOptions = {}) =>
  request<T>('POST', url, data, options);

request.put = <T = any>(url: string, data?: any, options: RequestOptions = {}) =>
  request<T>('PUT', url, data, options);

request.delete = <T = any>(url: string, options: RequestOptions = {}) =>
  request<T>('DELETE', url, undefined, options);

export default request;
