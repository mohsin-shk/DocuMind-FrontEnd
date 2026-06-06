import { apiClient } from "@/api/client";

import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  GetCurrentUserResponse,
  LogoutResponse,
  RefreshTokenResponse,
} from "@/types/auth.types";


export const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await apiClient.post(
    "/auth/register",
    payload
  );

  return response.data;
};

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await apiClient.post(
    "/auth/login",
    payload
  );

  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post(
    "/auth/logout"
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  const response = await apiClient.get(
    "/auth/me"
  );

  return response.data;
};

export const refreshAccessToken =
  async (): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post(
      "/auth/refresh-token"
    );

    return response.data;
};