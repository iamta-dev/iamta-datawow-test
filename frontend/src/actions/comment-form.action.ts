"use server";

import { commentService } from "@/services/comment.service";
import { type Comment as CommentModel } from "@/interfaces/services/comment.service";
import { createCommentUseCase } from "@/use-cases/comment/create-comment.use-case";
import { getProfileAction } from "@/actions/profile";
import { z } from "zod";
import { type ActionStatus } from "@/interfaces/actions/base.action";

export type commentFormState =
  | {
      result?: CommentModel;
      errors?: {
        comment?: string[];
        postId?: string[];
      };
      message?: string;
      status?: ActionStatus;
    }
  | undefined;

const createCommentFormSchema = z.object({
  comment: z.string().min(1, { message: "Comment must not be empty." }),
  postId: z.number().min(1, { message: "Post ID must not be empty." }),
});

export async function createCommentAction(
  state: commentFormState,
  formData: FormData,
): Promise<commentFormState> {
  const validatedFields = createCommentFormSchema.safeParse({
    comment: formData.get("comment"),
    postId: formData.get("postId"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { ...data } = validatedFields.data;

  try {
    const { data: result, error } = await createCommentUseCase({
      context: {
        getProfile: getProfileAction,
        createComment: (v) => commentService.createComment(v),
      },
      data,
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
