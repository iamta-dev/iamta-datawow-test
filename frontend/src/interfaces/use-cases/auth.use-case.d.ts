import { type ServiceResponse } from "@/interfaces/services/base";
import { type LoginDto, type LoginResponse } from "@/interfaces/services/auth";

export type login = (data: LoginDto) => Promise<ServiceResponse<LoginResponse>>;
