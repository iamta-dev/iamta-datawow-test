import { type ServiceResponse } from "@/interfaces/services/base.service";
import {
  type Community,
  type CreateCommunityDto,
  type UpdateCommunityDto,
} from "@/interfaces/services/community.service";

export type getCommunityById = (
  id: number,
) => Promise<ServiceResponse<Community>>;

export type getCommunities = () => Promise<ServiceResponse<Community[]>>;

export type createCommunity = (
  data: CreateCommunityDto,
) => Promise<ServiceResponse<Community>>;

export type updateCommunity = (
  id: number,
  data: UpdateCommunityDto,
) => Promise<ServiceResponse<Community>>;

export type deleteCommunity = (id: number) => Promise<ServiceResponse<void>>;
