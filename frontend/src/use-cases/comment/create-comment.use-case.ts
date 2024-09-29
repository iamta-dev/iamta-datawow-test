import { type APIErrorResponse } from "@/interfaces/services/base";
import {
  type Comment as CommentModel,
  type CreateCommentDto,
} from "@/interfaces/services/comment";
import { type createComment } from "@/interfaces/use-cases/comment.use-case.d";
import { handleAPIError } from "../base/base.use-case";
import { type getProfile } from "@/interfaces/use-cases/base.use-case";

export async function createCommentUseCase(params: {
  context: {
    getProfile: getProfile;
    createComment: createComment;
  };
  data: CreateCommentDto;
}): Promise<{ data?: CommentModel; error?: APIErrorResponse }> {
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
  return handleAPIError(resp);
}
