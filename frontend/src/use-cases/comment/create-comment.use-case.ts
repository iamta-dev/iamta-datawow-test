import {
  type Comment,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service.interface";
import { type createComment } from "@/interfaces/use-cases/comment.use-case.interface";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.interface";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

export async function createCommentUseCase(params: {
  context: {
    getProfile: getProfile;
    createComment: createComment;
  };
  data: CreateCommentDto;
}): Promise<UseCaseResponse<Comment>> {
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

  const resp = await context.createComment(data);
  return baseUseCaseHandleResponse<Comment>(resp);
}
