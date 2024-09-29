"use server";

import { createSession } from "@/lib/session";
import { decodeJwt } from "@/lib/user-jwt";
import { authService } from "@/services/auth.service";
import { loginUseCase } from "@/use-cases/auth/auth.use-case";
import { redirect } from "next/navigation";
import { z } from "zod";

const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username field must not be empty." }),
});

type ResultState =
  | {
      errors?: {
        username?: string[];
      };
      message?: string;
      status?: "default" | "loading" | "error" | "success";
    }
  | undefined;

export async function loginAction(
  state: ResultState,
  formData: FormData,
): Promise<ResultState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username } = validatedFields.data;

  const { data: resp, error } = await loginUseCase({
    context: {
      login: (data) => authService.login(data),
    },
    data: {
      username,
    },
  });
  if (error ?? !resp) {
    return {
      status: "error",
      message:
        error?.message ?? "An unexpected error occurred. Please try again.",
    };
  }

  const userJwt = decodeJwt(resp.accessToken);

  if (userJwt.error ?? !userJwt.data) {
    return {
      status: "error",
      message:
        userJwt.error?.message ??
        "An unexpected error occurred. Please try again.",
    };
  }

  await createSession({
    accessToken: resp.accessToken,
    user: userJwt.data,
  });

  // Redirect to the dashboard after successful login
  redirect("/");
}
