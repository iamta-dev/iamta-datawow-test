import { type APIErrorResponse } from "@/interfaces/services/base.service";
import { type UserJwtPayload } from "@/lib/user-jwt";

export interface UseCaseResponse<T> {
  result?: T;
  error?: APIErrorResponse;
}

export type getProfile = () => Promise<UserJwtPayload | null>;
