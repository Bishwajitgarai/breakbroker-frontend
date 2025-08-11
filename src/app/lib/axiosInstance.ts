// utils/axiosInstance.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { showSuccessToast, showErrorToast, showInfoToast, showToast } from "@/utils/toastHelper";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (reqConfig) => {
    if (reqConfig.headers?.hasOwnProperty("add_token") && reqConfig.headers.add_token === false) {
      delete reqConfig.headers.add_token;
      return reqConfig;
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // Redirect using window.location since we are in utils and can't use next/router here safely
        window.location.href = "/login";
        return Promise.reject(new Error("No auth token, redirecting to signup"));
      }
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }

    return reqConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

type Method = "get" | "post" | "put" | "patch" | "delete";

interface RequestOptions {
  url: string;
  method?: Method;
  data?: any;
  params?: Record<string, any>;  // <-- add this for query params
  headers?: Record<string, string>;
  add_token?: boolean; // control if auth token sent, default true
}

interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function apiClient<T = any>({
  url,
  method = "get",
  data = undefined,
  params = undefined,   // <-- default undefined
  headers = {},
  add_token = true,
}: RequestOptions): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.request({
      url,
      method,
      data,
      params,             // <-- pass params to axios
      headers: {
        ...headers,
        ...(add_token === false ? { add_token: false as any } : {}),
      },
    });
    return response.data as ApiResponse<T>;
  } catch (error: any) {
    if (error.response?.data) {
      return {
        success: false,
        statusCode: error.response.status,
        message: error.response.data.message || "An error occurred",
        data: (error.response.data.data as T) || ({} as T),
      };
    }

    return {
      success: false,
      statusCode: 500,
      message: error.message || "Network or unknown error",
      data: {} as T,
    };
  }
}
