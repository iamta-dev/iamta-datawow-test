import { type ServiceResponse } from "@/interfaces/services/base";
import {
  type User as UserModel,
  type CreateUserDto,
  type UpdateUserDto,
} from "@/interfaces/services/user";

export type getUserById = (id: number) => Promise<ServiceResponse<UserModel>>;

export type getUsers = () => Promise<ServiceResponse<UserModel[]>>;

export type createUser = (
  data: CreateUserDto,
) => Promise<ServiceResponse<UserModel>>;

export type updateUser = (
  id: number,
  data: UpdateUserDto,
) => Promise<ServiceResponse<UserModel>>;

export type deleteUser = (id: number) => Promise<ServiceResponse<void>>;
