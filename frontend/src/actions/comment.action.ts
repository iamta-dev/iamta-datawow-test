"use server";

import { commentService } from "@/services/comment.service";
import {
  type Comment,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service.interface";
import { createCommentUseCase } from "@/use-cases/comment/create-comment.use-case";
import { getProfileAction } from "@/actions/profile.action";
import { type ActionResultState } from "@/interfaces/actions/base.action.interface";
import { baseActionHandleResponse } from "./base.action";

export async function createCommentAction(
  createCommentDto: CreateCommentDto,
): Promise<ActionResultState<Comment>> {
  const { result, error } = await createCommentUseCase({
    context: {
      getProfile: getProfileAction,
      createComment: (data) => commentService.createComment(data),
    },
    data: createCommentDto,
  });

  return baseActionHandleResponse(result, error);
}
