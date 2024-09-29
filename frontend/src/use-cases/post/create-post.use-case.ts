import { type APIErrorResponse } from "@/interfaces/services/base";
import {
  type Post as PostModel,
  type CreatePostDto,
} from "@/interfaces/services/post";
import { type createPost } from "@/interfaces/use-cases/post.use-case.d";
import { handleAPIError } from "../base/base.use-case";
import { type getProfile } from "@/interfaces/use-cases/base.use-case";

export async function createPostUseCase(params: {
  context: {
    getProfile: getProfile;
    createPost: createPost;
  };
  data: CreatePostDto;
}): Promise<{ data?: PostModel; error?: APIErrorResponse }> {
  const { context, data } = params;

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

  const resp = await context.createPost(data);
  return handleAPIError(resp);
}
