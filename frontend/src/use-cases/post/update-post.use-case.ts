/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type APIErrorResponse } from "@/interfaces/services/base";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.d";
import { type updatePost } from "@/interfaces/use-cases/post.use-case.d";
import {
  type UpdatePostDto,
  type Post as PostModel,
} from "@/interfaces/services/post";
import { handleAPIError } from "../base/base.use-case";

export async function updatePostUseCase(params: {
  context: {
    getProfile: getProfile;
    updatePost: updatePost;
  };
  id: number;
  data: UpdatePostDto;
}): Promise<{ data?: PostModel; error?: APIErrorResponse }> {
  const { context, id, data } = params;

  const user = await context.getProfile();
  if (!user) {
    return {
      error: {
        statusCode: 401,
        error: "Unauthorized",
        message: "User not authenticated. Please try again.",
      },
    };
  }

  const resp = await context.updatePost(id, data);
  return handleAPIError(resp);
}
