"use server";

import { communityService } from "@/services/community.service";
import {
  type Community as CommunityModel,
} from "@/interfaces/services/community";
import { getCommunitiesUseCase } from "@/use-cases/community/get-community.use-case";
import { getProfileAction } from "@/app/_action/profile";
import { type ActionResultState } from "@/interfaces/actions/base-action.interface";

export async function getCommunitiesAction(): Promise<ActionResultState<CommunityModel[]>> {
  try {
    const { data: result, error } = await getCommunitiesUseCase({
      context: {
        getProfile: getProfileAction,
        getCommunities: () => communityService.getCommunities(),
      },
    });
    if (error ?? !result) {
      return {
        status: "error",
        message:
          error?.message ?? "An unexpected error occurred. Please try again.",
      };
    }
    return { status: "success", result };
  } catch (err) {
    const error = err as Error;
    return { status: "error", message: error.message };
  }
}
