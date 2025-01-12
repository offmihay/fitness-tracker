const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions<T> {
  method?: HttpMethod;
  queryParams?: Record<string, string>;
  body?: T;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

const fetchApi = async <T, U>(
  endpoint: string,
  options: RequestOptions<T> = {}
): Promise<ApiResponse<U>> => {
  const { method = "GET", queryParams = {}, body, headers = {} } = options;

  const url = new URL(endpoint, backendUrl);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (method !== "GET" && body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), requestOptions);

  if (!response.ok) {
    if (response.headers.get("Content-Type")?.startsWith("application/json")) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "An error occurred");
    }
    throw new Error(`API request failed with status ${response.status}`, {});
  }

  const data = await response.json();

  // todo: handle errors and transform data as needed
  // e.g. 401

  return {
    data,
    status: response.status,
    headers: response.headers,
  };
};

export default fetchApi;
