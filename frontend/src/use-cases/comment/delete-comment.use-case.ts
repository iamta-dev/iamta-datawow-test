import {
  type Comment,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service.interface";
import { type deleteComment } from "@/interfaces/use-cases/comment.use-case.interface";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.interface";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

export async function deleteCommentUseCase(params: {
  context: {
    getProfile: getProfile;
    deleteComment: deleteComment;
  };
  id: number;
}): Promise<UseCaseResponse<Comment>> {
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

  const resp = await context.deleteComment(id);
  return baseUseCaseHandleResponse<Comment>(resp);
}
