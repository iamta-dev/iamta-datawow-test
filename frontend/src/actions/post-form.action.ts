"use server";

import { postService } from "@/services/post.service";
import { type Post } from "@/interfaces/services/post.service";

import { getProfileAction } from "@/actions/profile";
import { createPostUseCase } from "@/use-cases/post/create-post.use-case";
import { updatePostUseCase } from "@/use-cases/post/update-post.use-case";
import { deletePostUseCase } from "@/use-cases/post/delete-post.use-case";
import {
  baseActionHandleResponse,
  type ActionStatus,
} from "@/interfaces/actions/base.action";
import { z } from "zod";

export type postFormState =
  | {
      result?: Post;
      errors?: {
        updateId?: string[];
        deleteId?: string[];
        title?: string[];
        detail?: string[];
        communityId?: string[];
      };
      message?: string;
      status?: ActionStatus;
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
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { ...data } = validatedFields.data;

  try {
    const { result, error } = await createPostUseCase({
      context: {
        getProfile: getProfileAction,
        createPost: (data) => postService.createPost(data),
      },
      data,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
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
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { updateId, ...data } = validatedFields.data;

  try {
    const { result, error } = await updatePostUseCase({
      context: {
        getProfile: getProfileAction,
        updatePost: (id, data) => postService.updatePost(id, data),
      },
      id: updateId,
      data,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
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
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { deleteId } = validatedFields.data;

  try {
    const { result, error } = await deletePostUseCase({
      context: {
        getProfile: getProfileAction,
        deletePost: (id) => postService.deletePost(id),
      },
      id: deleteId,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}
