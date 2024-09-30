"use server";

import { postService } from "@/services/post.service";
import {
  type Post as PostModel,
  type PostParamsDto,
  type CreatePostDto,
  type UpdatePostDto,
} from "@/interfaces/services/post";
import {
  getPostsUseCase,
  getPostIdUseCase,
} from "@/use-cases/post/get-post.use-case";
import { getProfileAction } from "@/app/_action/profile";
import { createPostUseCase } from "@/use-cases/post/create-post.use-case";
import { updatePostUseCase } from "@/use-cases/post/update-post.use-case";
import { deletePostUseCase } from "@/use-cases/post/delete-post.use-case";
import { type ActionResultState } from "@/interfaces/actions/base-action.interface";


export async function getPostsAction(
  postParamsDto?: PostParamsDto,
): Promise<ActionResultState<PostModel[]>> {
  try {
    const { data: result, error } = await getPostsUseCase({
      context: {
        getProfile: getProfileAction,
        getPosts: (data) => postService.getPosts(data),
      },
      postParamsDto,
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

export async function getPostByIdAction(
  id: number,
): Promise<ActionResultState<PostModel>> {
  try {
    const { data: result, error } = await getPostIdUseCase({
      context: {
        getProfile: getProfileAction,
        getPostById: (data) => postService.getPostById(data),
      },
      id,
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

export async function createPostAction(
  createPostDto: CreatePostDto,
): Promise<ActionResultState<PostModel>> {
  try {
    const { data: result, error } = await createPostUseCase({
      context: {
        getProfile: getProfileAction,
        createPost: (data) => postService.createPost(data),
      },
      data: createPostDto,
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

export async function updatePostAction(
  id: number,
  updatePostDto: UpdatePostDto,
): Promise<ActionResultState<PostModel>> {
  try {
    const { data: result, error } = await updatePostUseCase({
      context: {
        getProfile: getProfileAction,
        updatePost: (id, data) => postService.updatePost(id, data),
      },
      id,
      data: updatePostDto,
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

export async function deletePostAction(
  id: number,
): Promise<ActionResultState<PostModel>> {
  try {
    const { data: result, error } = await deletePostUseCase({
      context: {
        getProfile: getProfileAction,
        deletePost: (id) => postService.deletePost(id),
      },
      id,
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
