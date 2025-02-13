import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions<T> {
  method?: HttpMethod;
  queryParams?: Record<
    string,
    string | number | Date | boolean | Array<string | number> | Record<string, string | number>
  >;
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

      const token = await getToken();

      const url = new URL(`/api${endpoint}`, backendUrl);

      Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => url.searchParams.append(key, v.toString()));
        } else if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            url.searchParams.append(`${key}[${subKey}]`, subValue.toString());
          });
        } else if (value || typeof value === "boolean") {
          url.searchParams.append(key, value.toString());
        }
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
          throw new Error(errorResponse.message || "An error occurred", {
            cause: errorResponse.code || errorResponse.message || "An error occurred",
          });
        }
        throw new Error(`API request failed with status ${response.status}`, {
          cause: `API request failed with status ${response.status}`,
        });
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
