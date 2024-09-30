import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.d";
import { type getCommunities } from "@/interfaces/use-cases/community.use-case.d";
import { type Community } from "@/interfaces/services/community.service";
import { baseUseCaseHandleResponse } from "../base/base.use-case";

export async function getCommunitiesUseCase(params: {
  context: {
    getProfile: getProfile;
    getCommunities: getCommunities;
  };
}): Promise<UseCaseResponse<Community[]>> {
  const { context } = params;

  const resp = await context.getCommunities();
  return baseUseCaseHandleResponse<Community[]>(resp);
}
