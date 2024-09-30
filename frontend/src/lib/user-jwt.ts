import { env } from "@/env";
import { type FuncError } from "@/interfaces/errors/base.error";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export interface UserJwtPayload extends JwtPayload {
  id: number;
  fullName: string;
  username: string;
  pictureUrl: string;
  iat: number;
  exp: number;
}

// Define the Zod schema for UserJwt validation
export const UserJwtSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  username: z.string(),
  pictureUrl: z.string().url(),
  // JWT standard claims
  iat: z.number(),
  exp: z.number(),
});

export function decodeJwt(accessToken: string): {
  data?: UserJwtPayload;
  error?: FuncError;
} {
  try {
    const secret = env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return {
        error: {
          message: "JWT_SECRET is not defined in environment variables",
        },
      };
    }

    const decoded = jwt.verify(accessToken, secret);
    const parsed = UserJwtSchema.safeParse(decoded);

    if (!parsed.success) {
      console.error("JWT payload validation failed:", parsed.error.errors);
      return {
        error: {
          message: "JWT payload validation failed",
          errors: parsed.error.errors,
        },
      };
    }

    return { data: parsed.data };
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return { error: { message: "Failed to decode JWT" } };
  }
}
