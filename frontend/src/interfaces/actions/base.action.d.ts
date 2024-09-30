import { type APIErrorResponse } from "@/interfaces/services/base.service";

export type ActionStatus = "default" | "loading" | "error" | "success";

export type ActionResultState<T> =
  | {
      result?: T;
      message?: string;
      status?: ActionStatus;
    }
  | undefined;

// Base Server Action Handle Response Function
export function baseActionHandleResponse<T>(
  result: T | undefined,
  error?: APIErrorResponse | Error,
): { status: "success" | "error"; message?: string } {
  return error || !result
    ? {
        status: "error",
        message:
          error?.message ?? "An unexpected error occurred. Please try again.",
      }
    : { status: "success" };
}
