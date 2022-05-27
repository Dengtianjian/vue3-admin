function genQuery(query: Record<string, string>): string {
  const queryStrings: string[] = [];
  for (const key in query) {
    queryStrings.push(`${key}=${query[key]}`);
  }
  return queryStrings.join("&");
}

type TRequestMethod = "GET" | "POST" | string;

export default {
  send<Response>(url: string, method: TRequestMethod = "GET", query?: Record<string, string>, body?: BodyInit | Record<string, unknown> | null, headers?: Record<string, string>): Promise<Response> {
    if (query) {
      url += `?${genQuery(query)}`;
    }
    const options: RequestInit = {
      method
    }
    if (body && method !== "GET") {
      if (Object.prototype.toString.call(body) === "[object Object]") {
        options['body'] = JSON.stringify(body);
        if (!headers) {
          headers = {};
        }
        headers['Content-type'] = "application/json";
      } else {
        options['body'] = body as BodyInit;
      }
    }
    if (headers) {
      const requestHeaders = new Headers();
      for (const key in headers) {
        requestHeaders.set(key, headers[key]);
      }
      options['headers'] = requestHeaders;
    }
    return fetch(url, options).then(res => res.json().then(r => ({
      ...r,
      statusCode: res.status
    })));
  },
  post<Response>(url: string, body: BodyInit | Record<string, unknown> | null, query?: Record<string, string>, headers?: Record<string, string>): Promise<Response> {
    return this.send(url, "POST", query, body, headers);
  },
  get<Response>(url: string, query?: Record<string, string>, headers?: Record<string, string>): Promise<Response> {
    return this.send(url, "GET", query, null, headers);
  },
  delete<Response>(url: string, query?: Record<string, string>, headers?: Record<string, string>): Promise<Response> {
    return this.send(url, "DELETE", query, null, headers);
  }
}