import { type ServiceErrorResponse } from "@/interfaces/services/base.service";
import { type UserJwtPayload } from "@/lib/user-jwt";

export interface UseCaseResponse<T> {
  result?: T;
  error?: ServiceErrorResponse;
}

export type getProfile = () => Promise<UserJwtPayload | null>;
