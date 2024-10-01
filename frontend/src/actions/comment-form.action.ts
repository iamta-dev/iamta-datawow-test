"use server";

import { commentService } from "@/services/comment.service";
import { type Comment } from "@/interfaces/services/comment.service.interface";
import { createCommentUseCase } from "@/use-cases/comment/create-comment.use-case";
import { getProfileAction } from "@/actions/profile.action";
import { z } from "zod";
import { type ActionStatus } from "@/interfaces/actions/base.action.interface";
import {
  baseActionErrorResponse,
  baseActionHandleResponse,
} from "./base.action";

export type commentFormState =
  | {
      result?: Comment;
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
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { ...data } = validatedFields.data;

  try {
    const { result, error } = await createCommentUseCase({
      context: {
        getProfile: getProfileAction,
        createComment: (data) => commentService.createComment(data),
      },
      data,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    return baseActionErrorResponse(err as Error);
  }
}
