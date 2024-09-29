import { type APIErrorResponse } from "@/types/services/base";
import {
  type WorkPlace,
  type CreateWorkPlaceDto,
} from "@/types/services/work-place";
import { type getProfile } from "@/types/use-cases/base";
import { type createWorkPlace } from "@/types/use-cases/work-place";
import { AxiosError } from "axios";

export async function createWorkPlaceUseCase(params: {
  context: {
    getProfile: getProfile;
    createWorkPlace: createWorkPlace;
  };
  data: CreateWorkPlaceDto;
}): Promise<{ data?: WorkPlace; error?: APIErrorResponse }> {
  const { context, data } = params;

  const resp = await context.createWorkPlace(data);

  if (resp.error ?? !resp.data) {
    const apiError = resp.error?.response?.data as APIErrorResponse;
    return {
      error: {
        statusCode: resp.error?.response?.status ?? 500,
        error: resp.error?.response?.statusText,
        message:
          apiError?.message ??
          resp.error?.response?.statusText ??
          resp.error?.message ??
          "An unexpected error occurred. Please try again.",
      },
    };
  }

  return { data: resp.data };
}
