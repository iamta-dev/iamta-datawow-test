import { type ServiceResponse } from "@/interfaces/services/base.service";
import {
  type LoginDto,
  type LoginResponse,
} from "@/interfaces/services/auth.service";

export type login = (data: LoginDto) => Promise<ServiceResponse<LoginResponse>>;
