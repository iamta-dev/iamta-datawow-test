import { type ServiceErrorResponse } from "@/interfaces/services/base.service";
import {
  type LoginDto,
  type LoginResponse,
} from "@/interfaces/services/auth.service";
import {
  type createSession,
  type decodeJwt,
  type login,
} from "@/interfaces/use-cases/auth.use-case.d";
import { baseUseCaseAxiosErrorResponse } from "../base/base.use-case";
import { type UseCaseResponse } from "@/interfaces/use-cases/base.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error";

export async function loginUseCase(params: {
  context: {
    login: login;
    decodeJwt: decodeJwt;
    createSession: createSession;
  };
  data: LoginDto;
}): Promise<UseCaseResponse<LoginResponse>> {
  const { context, data } = params;

  const resp = await context.login(data);

  if (resp.error ?? !resp.data) {
    const apiError = resp.error?.response?.data as ServiceErrorResponse;

    // custom message api error
    if (apiError?.statusCode == 401) {
      return {
        error: {
          message: "Invalid email or password.",
        },
      };
    }

    return baseUseCaseAxiosErrorResponse(resp.error);
  }

  const { accessToken } = resp.data;

  const userJwt = context.decodeJwt(accessToken);
  if (userJwt.error ?? !userJwt.data) {
    return {
      error: {
        message: userJwt?.error?.message ?? BaseErrorEnum.UNEXPECTED,
      },
    };
  }

  await context.createSession({
    accessToken,
    user: userJwt.data,
  });

  return { result: resp.data };
}
