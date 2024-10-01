import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.interface";
import { type deletePost } from "@/interfaces/use-cases/post.use-case.interface";
import { type Post } from "@/interfaces/services/post.service.interface";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

export async function deletePostUseCase(params: {
  context: {
    getProfile: getProfile;
    deletePost: deletePost;
  };
  id: number;
}): Promise<UseCaseResponse<Post>> {
  const { context, id } = params;

  const user = await context.getProfile();
  if (!user) {
    return {
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    };
  }

  const resp = await context.deletePost(id);
  return baseUseCaseHandleResponse<Post>(resp);
}
