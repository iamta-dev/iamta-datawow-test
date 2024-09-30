import { type AxiosError } from "axios";

export interface ServiceResponse<T> {
  data?: T;
  error?: AxiosError;
}

export interface APIErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
}
