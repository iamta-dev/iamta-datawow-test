"use server";

import { postService } from "@/services/post.service";
import {
  type Post as PostModel,
  type PostParamsDto,
} from "@/interfaces/services/post";
import {
  getPostsUseCase,
  getPostIdUseCase,
} from "@/use-cases/post/get-post.use-case";
import { getProfileAction } from "@/app/_action/profile";

export type PostsResultState =
  | {
      result?: PostModel[];
      errors?: {
        fsearch?: string[];
        communityId?: string[];
      };
      message?: string;
      status?: "default" | "loading" | "error" | "success";
    }
  | undefined;

export async function getPostsAction(
  postParamsDto?: PostParamsDto,
): Promise<PostsResultState> {
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

export type PostResultState =
  | {
      result?: PostModel;
      errors?: {
        fsearch?: string[];
        communityId?: string[];
      };
      message?: string;
      status?: "default" | "loading" | "error" | "success";
    }
  | undefined;

export async function getPostByIdAction(id: number): Promise<PostResultState> {
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
