import { type APIErrorResponse } from "@/types/services/base";
import {
  type WorkPlace,
  type UpdateWorkPlaceDto,
} from "@/types/services/work-place";
import { type getProfile } from "@/types/use-cases/base";
import { type updateWorkPlace } from "@/types/use-cases/work-place";
import { AxiosError } from "axios";

export async function updateWorkPlaceUseCase(params: {
  context: {
    getProfile: getProfile;
    updateWorkPlace: updateWorkPlace;
  };
  id: number;
  data: UpdateWorkPlaceDto;
}): Promise<{ data?: WorkPlace; error?: APIErrorResponse }> {
  const { context, id, data } = params;

  const resp = await context.updateWorkPlace(id, data);

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
