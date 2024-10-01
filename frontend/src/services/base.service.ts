/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AxiosError } from "axios";
import backendApi from "@/lib/backend-api";
import { type ServiceResponse } from "@/interfaces/services/base.service";
import { BaseErrorEnum } from "@/interfaces/errors/base.error";

export interface CustomAxiosError extends AxiosError {
  errors?: unknown;
}

export class BaseService {
  protected backendApi = backendApi;

  protected async handleRequest<T>(
    requestFn: () => Promise<{ data: T }>,
  ): Promise<ServiceResponse<T>> {
    try {
      const response = await requestFn();
      return { data: response.data };
    } catch (error) {
      return this.processError<T>(error);
    }
  }

  protected processError<T>(error: unknown): ServiceResponse<T> {
    if (error instanceof AxiosError) {
      const customError = error as CustomAxiosError;
      console.error("API Request Error:", {
        message: error.message != "" ? error.message : error.code,
        code: error.code,
        request: {
          // config: error.config,  // Request configuration that was made
          // headers: error.config?.headers, // Request headers
          baseURL: error.config?.baseURL, // Request headers
          url: error?.config?.url, // URL that was being called
          method: error?.config?.method, // HTTP method used
          data: error?.config?.data, // Data sent with the request
        },
        response: {
          status: error.response?.status, // HTTP status code
          statusText: error.response?.statusText, // HTTP status text
          // headers: error.response?.headers, // Response headers
          responseData: error.response?.data, // Data received from the response
        },
        errors: customError?.errors,
      });
      return {
        error: {
          ...error,
          message: error.message != "" ? error.message : error.code,
        } as AxiosError,
      };
    } else {
      console.error("Unexpected Error:", error);
      return {
        error: {
          message: BaseErrorEnum.UNEXPECTED,
        } as AxiosError,
      };
    }
  }
}
