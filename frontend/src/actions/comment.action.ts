"use server";

import { commentService } from "@/services/comment.service";
import {
  type Comment as CommentModel,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service";
import { createCommentUseCase } from "@/use-cases/comment/create-comment.use-case";
import { getProfileAction } from "@/actions/profile";
import { type ActionResultState } from "@/interfaces/actions/base.action";

export async function createCommentAction(
  createCommentDto: CreateCommentDto,
): Promise<ActionResultState<CommentModel>> {
  try {
    const { data: result, error } = await createCommentUseCase({
      context: {
        getProfile: getProfileAction,
        createComment: (data) => commentService.createComment(data),
      },
      data: createCommentDto,
    });
    if (error ?? !result) {
      return {
        status: "error",
        message:
          error?.message ?? "An unexpected error occurred. Please try again.",
      };
    }
    return { status: "success", result };
  } catch (err) {
    const error = err as Error;
    return { status: "error", message: error.message };
  }
}
