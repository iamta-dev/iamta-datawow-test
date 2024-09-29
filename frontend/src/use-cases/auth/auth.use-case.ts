import { type APIErrorResponse } from "@/interfaces/services/base";
import { type LoginDto, type LoginResponse } from "@/interfaces/services/auth";
import { type login } from "@/interfaces/use-cases/auth.use-case.d";
import { decodeJwt } from "@/lib/user-jwt";

export async function loginUseCase(params: {
  context: {
    login: login;
  };
  data: LoginDto;
}): Promise<{ data?: LoginResponse; error?: APIErrorResponse }> {
  const { context, data } = params;

  const resp = await context.login(data);

  if (resp.error ?? !resp.data) {
    const apiError = resp.error?.response?.data as APIErrorResponse;
    const statusCode = resp.error?.response?.status ?? 500;
    const errorText = resp.error?.response?.statusText;

    if (apiError?.statusCode == 401) {
      return {
        error: {
          statusCode,
          error: errorText,
          message: "Invalid email or password.",
        },
      };
    }

    return {
      error: {
        statusCode,
        error: errorText,
        message:
          apiError?.message ??
          resp.error?.response?.statusText ??
          resp.error?.message ??
          "An unexpected error occurred. Please try again.",
      },
    };
  }

  const userJwt = decodeJwt(resp.data.accessToken);

  if (userJwt.error ?? !userJwt.data) {
    return {
      error: {
        statusCode: 500,
        error: userJwt.error?.message,
        message:
          userJwt.error?.message ??
          "An unexpected error occurred. Please try again.",
      },
    };
  }

  return { data: resp.data };
}
