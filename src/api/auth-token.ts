import axios from "axios";
import type { RefreshTokenResponse } from "@/types/auth.types";

export const requestNewAccessToken =
  async (): Promise<RefreshTokenResponse> => {
    const response = await axios.post<RefreshTokenResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  };