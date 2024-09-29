/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { type UserJwtPayload } from "@/lib/user-jwt";

export interface UseCaseResponse<T> {
  data?: T;
  error?: APIErrorResponse;
}

export type getProfile = () => Promise<UserJwtPayload | null>;
