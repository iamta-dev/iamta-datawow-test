/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type APIErrorResponse } from "@/interfaces/services/base.service";
import { type UseCaseResponse } from "@/interfaces/use-cases/base.use-case.d";

export function handleAPIError<T>(resp: {
  error?: any;
  data?: T;
}): UseCaseResponse<T> {
  if (resp.error ?? !resp.data) {
    const apiError = resp.error?.response?.data as APIErrorResponse;
    return {
      error: {
        statusCode: resp.error?.response?.status ?? 500,
        error: resp.error?.response?.statusText,
        message:
          apiError?.message ??
          resp.error?.response?.statusText ??
          resp.error?.message ??
          "An unexpected error occurred. Please try again.",
      },
    };
  }

  return { data: resp.data };
}
