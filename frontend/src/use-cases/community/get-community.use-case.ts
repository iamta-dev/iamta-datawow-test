import { type APIErrorResponse } from "@/interfaces/services/base.service";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.d";
import { type getCommunities } from "@/interfaces/use-cases/community.use-case.d";
import { type Community } from "@/interfaces/services/community.service";
import { handleAPIError } from "../base/base.use-case";

export async function getCommunitiesUseCase(params: {
  context: {
    getProfile: getProfile;
    getCommunities: getCommunities;
  };
}): Promise<{ data?: Community[]; error?: APIErrorResponse }> {
  const { context } = params;

  const resp = await context.getCommunities();
  return handleAPIError(resp);
}
