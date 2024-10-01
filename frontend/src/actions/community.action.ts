"use server";

import { communityService } from "@/services/community.service";
import { type Community } from "@/interfaces/services/community.service";
import { getCommunitiesUseCase } from "@/use-cases/community/get-community.use-case";
import { getProfileAction } from "@/actions/profile.action";
import { type ActionResultState } from "@/interfaces/actions/base.action";
import {
  baseActionErrorResponse,
  baseActionHandleResponse,
} from "./base.action";

export async function getCommunitiesAction(): Promise<
  ActionResultState<Community[]>
> {
  try {
    const { result, error } = await getCommunitiesUseCase({
      context: {
        getProfile: getProfileAction,
        getCommunities: () => communityService.getCommunities(),
      },
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    return baseActionErrorResponse(err as Error);
  }
}
