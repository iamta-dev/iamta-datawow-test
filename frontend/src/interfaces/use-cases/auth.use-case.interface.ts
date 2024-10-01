import { type ServiceResponse } from "@/interfaces/services/base.service.interface";
import { type FuncError } from "@/interfaces/errors/base.error.interface";
import {
  type LoginDto,
  type LoginResponse,
} from "@/interfaces/services/auth.service.interface";
import { type UserJwtPayload } from "@/lib/user-jwt";

export type login = (data: LoginDto) => Promise<ServiceResponse<LoginResponse>>;

export type decodeJwt = (accessToken: string) => {
  data?: UserJwtPayload;
  error?: FuncError;
};

export type createSession = (data: {
  accessToken: string;
  user: UserJwtPayload;
}) => Promise<void>;
