import { type ServiceResponse } from "@/interfaces/services/base";
import {
  type Community as CommunityModel,
  type CreateCommunityDto,
  type UpdateCommunityDto,
} from "@/interfaces/services/community";

export type getCommunityById = (id: number) => Promise<ServiceResponse<CommunityModel>>;

export type getCommunities = () => Promise<ServiceResponse<CommunityModel[]>>;

export type createCommunity = (
  data: CreateCommunityDto,
) => Promise<ServiceResponse<CommunityModel>>;

export type updateCommunity = (
  id: number,
  data: UpdateCommunityDto,
) => Promise<ServiceResponse<CommunityModel>>;

export type deleteCommunity = (id: number) => Promise<ServiceResponse<void>>;
