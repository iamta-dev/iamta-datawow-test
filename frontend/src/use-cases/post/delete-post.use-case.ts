import { type APIErrorResponse } from "@/interfaces/services/base.service";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.d";
import { type deletePost } from "@/interfaces/use-cases/post.use-case.d";
import { type Post } from "@/interfaces/services/post.service";
import { handleAPIError } from "../base/base.use-case";

export async function deletePostUseCase(params: {
  context: {
    getProfile: getProfile;
    deletePost: deletePost;
  };
  id: number;
}): Promise<{ data?: Post; error?: APIErrorResponse }> {
  const { context, id } = params;

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

  const resp = await context.deletePost(id);
  return handleAPIError(resp);
}
