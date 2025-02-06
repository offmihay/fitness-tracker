import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

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

const useApi = () => {
  const { getToken } = useAuth();

  const fetchData = useCallback(
    async <T, U>(endpoint: string, options: RequestOptions<T> = {}): Promise<ApiResponse<U>> => {
      const { method = "GET", queryParams = {}, body, headers = {} } = options;

      const token = await getToken(); // Ensure we get a fresh token

      const url = new URL(`/api${endpoint}`, backendUrl);
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Authorization", `Bearer ${token}`);

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (method !== "GET" && body) {
        const isMultipartFormData = requestHeaders.get("Content-Type") === "multipart/form-data";

        if (isMultipartFormData && body instanceof FormData) {
          requestOptions.body = body as any;
          requestHeaders.delete("Content-Type");
        } else {
          requestOptions.body = JSON.stringify(body);
          if (!requestHeaders.has("Content-Type")) {
            requestHeaders.set("Content-Type", "application/json");
          }
        }
      }

      const response = await fetch(url.toString(), requestOptions);

      if (!response.ok) {
        if (response.headers.get("Content-Type")?.startsWith("application/json")) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "An error occurred");
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    },
    [getToken]
  );

  return { fetchData };
};

export default useApi;
