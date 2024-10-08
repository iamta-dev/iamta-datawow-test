import {
  type Post,
  type CreatePostDto,
} from "@/interfaces/services/post.service.interface";
import { type createPost } from "@/interfaces/use-cases/post.use-case.interface";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.interface";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

export async function createPostUseCase(params: {
  context: {
    getProfile: getProfile;
    createPost: createPost;
  };
  data: CreatePostDto;
}): Promise<UseCaseResponse<Post>> {
  const { context, data } = params;

  const user = await context.getProfile();
  if (!user) {
    return {
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    };
  }

  const resp = await context.createPost(data);
  return baseUseCaseHandleResponse<Post>(resp);
}
