/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import { type ServiceErrorResponse } from "@/interfaces/services/base.service.interface";
import { type UseCaseResponse } from "@/interfaces/use-cases/base.use-case.interface";
import { type AxiosError } from "axios";

export function baseUseCaseHandleResponse<T>(resp: {
  error?: any;
  data?: T;
}): UseCaseResponse<T> {
  if (resp.error ?? !resp.data) {
    const apiError = resp.error?.response?.data as ServiceErrorResponse;
    return {
      error: {
        statusCode: resp.error?.response?.status ?? 500,
        error: resp.error?.response?.statusText,
        message:
          apiError?.message ??
          resp.error?.response?.statusText ??
          resp.error?.message ??
          BaseErrorEnum.UNEXPECTED,
      },
    };
  }

  return { result: resp.data };
}

export function baseUseCaseAxiosErrorResponse<T>(
  error?: AxiosError,
): UseCaseResponse<T> {
  const apiError = error?.response?.data as ServiceErrorResponse;
  return {
    error: {
      statusCode: error?.response?.status ?? 500,
      error: error?.response?.statusText,
      message:
        apiError?.message ??
        error?.response?.statusText ??
        error?.message ??
        BaseErrorEnum.UNEXPECTED,
    },
  };
}
