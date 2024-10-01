"use server";

import { createSession } from "@/actions/session.action";
import { decodeJwt } from "@/lib/user-jwt";
import { authService } from "@/services/auth.service";
import { loginUseCase } from "@/use-cases/auth/auth.use-case";
import { redirect } from "next/navigation";
import { z } from "zod";
import { baseActionErrorResponse } from "./base.action";
import { type ActionStatus } from "@/interfaces/actions/base.action.interface";

const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username field must not be empty." }),
});

export type loginFormState =
  | {
      errors?: {
        username?: string[];
      };
      message?: string;
      status?: ActionStatus;
    }
  | undefined;

export async function loginAction(
  state: loginFormState,
  formData: FormData,
): Promise<loginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username } = validatedFields.data;

  const { result, error } = await loginUseCase({
    context: {
      login: (data) => authService.login(data),
      decodeJwt: (data) => decodeJwt(data),
      createSession: (data) => createSession(data),
    },
    data: {
      username,
    },
  });
  if (error ?? !result) {
    return baseActionErrorResponse(error);
  }

  // Redirect to the HomePage after successful login
  redirect("/");
}
