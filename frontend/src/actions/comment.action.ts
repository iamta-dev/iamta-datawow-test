"use server";

import { commentService } from "@/services/comment.service";
import {
  type Comment,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service";
import { createCommentUseCase } from "@/use-cases/comment/create-comment.use-case";
import { getProfileAction } from "@/actions/profile";
import {
  type ActionResultState,
} from "@/interfaces/actions/base.action";
import { baseActionHandleResponse } from "./base.action";

export async function createCommentAction(
  createCommentDto: CreateCommentDto,
): Promise<ActionResultState<Comment>> {
  try {
    const { result, error } = await createCommentUseCase({
      context: {
        getProfile: getProfileAction,
        createComment: (data) => commentService.createComment(data),
      },
      data: createCommentDto,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}
