import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth.store";
import { requestNewAccessToken } from "@/api/auth-token";
import type { RetryAxiosRequestConfig } from "@/types/axios.types";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } =
      useAuthStore.getState();

    if (!accessToken) {
      return config;
    }

    config.headers.Authorization =
      `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const axiosError = error as AxiosError;

    const originalRequest =
      axiosError.config as RetryAxiosRequestConfig;

    /*
    ========================================
    SKIP AUTH ENDPOINTS
    ========================================
    */

    const requestUrl =
      originalRequest.url ?? "";

    if (
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }


    /*
    ========================================
    NO REQUEST CONFIG
    ========================================
    */

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /*
    ========================================
    ONLY HANDLE 401
    ========================================
    */

    if (axiosError.response?.status !== 401) {
      return Promise.reject(error);
    }

    /*
    ========================================
    PREVENT INFINITE RETRY LOOPS
    ========================================
    */

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      /*
      ========================================
      REFRESH ACCESS TOKEN
      ========================================
      */

      const refreshResponse =
        await requestNewAccessToken();

      const newAccessToken =
        refreshResponse.data.accessToken;

      /*
      ========================================
      UPDATE AUTH STORE
      ========================================
      */

      useAuthStore
        .getState()
        .setAccessToken(newAccessToken);

      /*
      ========================================
      UPDATE FAILED REQUEST
      ========================================
      */

      // originalRequest.headers.Authorization =
      //   `Bearer ${newAccessToken}`;

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`
      );


      /*
      ========================================
      RETRY ORIGINAL REQUEST
      ========================================
      */

      return apiClient(originalRequest);



    } catch (refreshError) {
      /*
      ========================================
      REFRESH FAILED
      ========================================
      */

      useAuthStore
        .getState()
        .clearAuth();

      return Promise.reject(refreshError);
    }
  }
);