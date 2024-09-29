import {
  type PaginationResponse,
  type APIErrorResponse,
  type PaginationParamsDto,
} from "@/types/services/base";
import { type WorkPlace } from "@/types/services/work-place";
import { type getProfile } from "@/types/use-cases/base";
import { type getWorkPlaces } from "@/types/use-cases/work-place";
import { AxiosError } from "axios";

export async function getWorkPlacesUseCase(params: {
  context: {
    getProfile: getProfile;
    getWorkPlaces: getWorkPlaces;
  };
  pagination?: PaginationParamsDto;
}): Promise<{
  data?: PaginationResponse<WorkPlace>;
  error?: APIErrorResponse;
}> {
  const { context, pagination } = params;

  const resp = await context.getWorkPlaces(pagination);

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
