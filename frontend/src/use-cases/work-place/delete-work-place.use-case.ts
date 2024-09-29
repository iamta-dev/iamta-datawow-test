import { type APIErrorResponse } from "@/types/services/base";
import { type getProfile } from "@/types/use-cases/base";
import { type deleteWorkPlace } from "@/types/use-cases/work-place";
import { AxiosError } from "axios";

export async function deleteWorkPlaceUseCase(params: {
  context: {
    getProfile: getProfile;
    deleteWorkPlace: deleteWorkPlace;
  };
  id: number;
}): Promise<{ error?: APIErrorResponse }> {
  const { context, id } = params;

  const resp = await context.deleteWorkPlace(id);

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

  return {};
}
