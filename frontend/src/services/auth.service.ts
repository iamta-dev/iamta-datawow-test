import {
  type LoginResponse,
  type LoginDto,
} from "@/interfaces/services/auth.service.interface";
import { BaseService } from "./base.service";
import { type ServiceResponse } from "@/interfaces/services/base.service.interface";

export class AuthService extends BaseService {
  public async login(data: LoginDto): Promise<ServiceResponse<LoginResponse>> {
    return this.handleRequest(() =>
      this.backendApi.post<LoginResponse>("/api/v1/auth/login", data),
    );
  }
}

export const authService = new AuthService();
