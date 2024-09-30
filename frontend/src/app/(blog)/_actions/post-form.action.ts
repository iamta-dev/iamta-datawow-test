"use server";

import { postService } from "@/services/post.service";
import {
  type Post as PostModel,
} from "@/interfaces/services/post";

import { getProfileAction } from "@/app/_action/profile";
import { createPostUseCase } from "@/use-cases/post/create-post.use-case";
import { updatePostUseCase } from "@/use-cases/post/update-post.use-case";
import { deletePostUseCase } from "@/use-cases/post/delete-post.use-case";
import { ActionStatusEnum } from "@/interfaces/actions/base-action.interface";
import { z } from "zod";

export type postFormState =
  | {
      result?: PostModel;
      errors?: {
        updateId?: string[];
        deleteId?: string[];
        title?: string[];
        detail?: string[];
        communityId?: string[];
      };
      message?: string;
      status?: ActionStatusEnum;
    }
  | undefined;

const createPostFormSchema = z.object({
  title: z.string().min(1, { message: "Titile must not be empty." }),
  detail: z.string().min(1, { message: "Detail must not be empty." }),
  communityId: z
    .number()
    .min(1, { message: "Community ID must not be empty." }),
});

export async function createPostAction(
  state: postFormState,
  formData: FormData,
): Promise<postFormState> {
  const validatedFields = createPostFormSchema.safeParse({
    title: formData.get("title"),
    detail: formData.get("detail"),
    communityId: formData.get("communityId"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { ...data } = validatedFields.data;

  try {
    const { data: result, error } = await createPostUseCase({
      context: {
        getProfile: getProfileAction,
        createPost: (v) => postService.createPost(v),
      },
      data,
    });
    if (error ?? !result) {
      return {
        status: ActionStatusEnum.error,
        message:
          error?.message ?? "An unexpected error occurred. Please try again.",
      };
    }
    return { status: ActionStatusEnum.success, result };
  } catch (err) {
    const error = err as Error;
    return { status: ActionStatusEnum.error, message: error.message };
  }
}

const updatePostFormSchema = z
  .object({
    updateId: z.number().min(1, { message: "UpdateId must not be empty." }),
  })
  .and(createPostFormSchema);

export async function updatePostAction(
  state: postFormState,
  formData: FormData,
): Promise<postFormState> {
  const validatedFields = updatePostFormSchema.safeParse({
    udpateId: formData.get("udpateId"),
    title: formData.get("title"),
    detail: formData.get("detail"),
    communityId: formData.get("communityId"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { updateId, ...data } = validatedFields.data;

  try {
    const { data: result, error } = await updatePostUseCase({
      context: {
        getProfile: getProfileAction,
        updatePost: (...v) => postService.updatePost(...v),
      },
      id: updateId,
      data,
    });
    if (error ?? !result) {
      return {
        status: ActionStatusEnum.error,
        message:
          error?.message ?? "An unexpected error occurred. Please try again.",
      };
    }
    return { status: ActionStatusEnum.success, result };
  } catch (err) {
    const error = err as Error;
    return { status: ActionStatusEnum.error, message: error.message };
  }
}

const deletePostFormSchema = z.object({
  deleteId: z.number().min(1, { message: "DeleteId must not be empty." }),
});

export async function deletePostAction(
  state: postFormState,
  formData: FormData,
): Promise<postFormState> {
  const validatedFields = deletePostFormSchema.safeParse({
    deleteId: formData.get("deleteId"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { deleteId } = validatedFields.data;

  try {
    const { data: result, error } = await deletePostUseCase({
      context: {
        getProfile: getProfileAction,
        deletePost: (v) => postService.deletePost(v),
      },
      id: deleteId,
    });
    if (error ?? !result) {
      return {
        status: ActionStatusEnum.error,
        message:
          error?.message ?? "An unexpected error occurred. Please try again.",
      };
    }
    return { status: ActionStatusEnum.success, result };
  } catch (err) {
    const error = err as Error;
    return { status: ActionStatusEnum.error, message: error.message };
  }
}
