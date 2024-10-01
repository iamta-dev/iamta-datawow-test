import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import { type ServiceErrorResponse } from "@/interfaces/services/base.service.interface";
import { redirect } from "next/navigation";

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
  error?: ServiceErrorResponse,
): ActionResultState<T> {
  // Check JWT Token Expired
  // Check Token Unauthorized
  if (error?.message == "Unauthorized") {
    redirect("/auth/login");
  }

  return error || !result
    ? {
        status: "error",
        message: error?.message ?? BaseErrorEnum.UNEXPECTED,
      }
    : { status: "success", result };
}

// Base Server Action Error Response Function
export function baseActionErrorResponse<T>(
  error?: ServiceErrorResponse | Error,
): ActionResultState<T> {
  // Check JWT Token Expired
  // Check Token Unauthorized
  if (error?.message == "Unauthorized") {
    redirect("/auth/login");
  }

  return {
    status: "error",
    message: error?.message ?? BaseErrorEnum.UNEXPECTED,
  };
}
