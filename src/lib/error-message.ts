import axios from "axios";

import type { ApiErrorResponse } from "@/types/auth.types";

export const getErrorMessage = (
  error: unknown
): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      "Something went wrong"
    );
  }

  return "Something went wrong";
};