/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type APIErrorResponse } from "@/interfaces/services/base";
import { type LoginDto, type LoginResponse } from "@/interfaces/services/auth";
import { type login } from "@/interfaces/use-cases/auth.use-case.d";
import { handleAPIError } from "../base/base.use-case";

export async function loginUseCase(params: {
  context: {
    login: login;
  };
  data: LoginDto;
}): Promise<{ data?: LoginResponse; error?: APIErrorResponse }> {
  const { context, data } = params;

  const resp = await context.login(data);
  return handleAPIError(resp);
}
