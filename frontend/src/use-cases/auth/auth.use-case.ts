import { type APIErrorResponse } from "@/interfaces/services/base.service";
import {
  type LoginDto,
  type LoginResponse,
} from "@/interfaces/services/auth.service";
import { type login } from "@/interfaces/use-cases/auth.use-case.d";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import { type UseCaseResponse } from "@/interfaces/use-cases/base.use-case";

export async function loginUseCase(params: {
  context: {
    login: login;
  };
  data: LoginDto;
}): Promise<UseCaseResponse<LoginResponse>> {
  const { context, data } = params;

  const resp = await context.login(data);

  if (resp.error ?? !resp.data) {
    const apiError = resp.error?.response?.data as APIErrorResponse;

    // custom message api error
    if (apiError?.statusCode == 401) {
      return {
        error: {
          message: "Invalid email or password.",
        },
      };
    }
  }

  return baseUseCaseHandleResponse<LoginResponse>(resp);
}
