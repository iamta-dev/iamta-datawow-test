import { type ServiceResponse } from "@/interfaces/services/base";
import {
  type User,
  type CreateUserDto,
  type UpdateUserDto,
} from "@/interfaces/services/user";

export type getUserById = (id: number) => Promise<ServiceResponse<User>>;

export type getUsers = () => Promise<ServiceResponse<User[]>>;

export type createUser = (
  data: CreateUserDto,
) => Promise<ServiceResponse<User>>;

export type updateUser = (
  id: number,
  data: UpdateUserDto,
) => Promise<ServiceResponse<User>>;

export type deleteUser = (id: number) => Promise<ServiceResponse<void>>;
