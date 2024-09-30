import { type APIErrorResponse } from "@/interfaces/services/base.service";
import {
  type Comment,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service";
import { type createComment } from "@/interfaces/use-cases/comment.use-case.d";
import { baseUseCaseHandleResponse } from "../base/base.use-case";
import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case";

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
        statusCode: 401,
        error: "Unauthorized",
        message: "User not authenticated. Please try again.",
      },
    };
  }

  const resp = await context.createComment(data);
  return baseUseCaseHandleResponse<Comment>(resp);
}
