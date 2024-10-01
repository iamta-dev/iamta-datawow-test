import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.interface";
import { type updatePost } from "@/interfaces/use-cases/post.use-case.interface";
import {
  type UpdatePostDto,
  type Post,
} from "@/interfaces/services/post.service.interface";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

export async function updatePostUseCase(params: {
  context: {
    getProfile: getProfile;
    updatePost: updatePost;
  };
  id: number;
  data: UpdatePostDto;
}): Promise<UseCaseResponse<Post>> {
  const { context, id, data } = params;

  const user = await context.getProfile();
  if (!user) {
    return {
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    };
  }

  const resp = await context.updatePost(id, data);
  return baseUseCaseHandleResponse<Post>(resp);
}
