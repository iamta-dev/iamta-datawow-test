import { type APIErrorResponse } from "@/interfaces/services/base.service";
import { type LoginDto, type LoginResponse } from "@/interfaces/services/auth.service";
import { type login } from "@/interfaces/use-cases/auth.use-case.d";

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

  return { data: resp.data };
}
