"use server";

import { loginUseCase  } from "@/use-cases/auth/auth.use-case";
import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username field must not be empty." }),
})

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

  const {
    username,
  } = validatedFields.data;

  try {
    const { data: resp, error } = await loginUseCase({
      context: {
        // login: (data) => authService.login(data),
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
    // revalidatePath("/attendance");
    return { status: "success" };
  } catch (err) {
    const error = err as Error;
    return { status: "error", message: error.message };
  }
}
