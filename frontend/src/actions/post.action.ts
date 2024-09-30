"use server";

import { postService } from "@/services/post.service";
import {
  type Post,
  type PostParamsDto,
  type CreatePostDto,
  type UpdatePostDto,
} from "@/interfaces/services/post.service";
import {
  getPostsUseCase,
  getPostIdUseCase,
} from "@/use-cases/post/get-post.use-case";
import { getProfileAction } from "@/actions/profile";
import { createPostUseCase } from "@/use-cases/post/create-post.use-case";
import { updatePostUseCase } from "@/use-cases/post/update-post.use-case";
import { deletePostUseCase } from "@/use-cases/post/delete-post.use-case";
import {
  baseActionHandleResponse,
  type ActionResultState,
} from "@/interfaces/actions/base.action";

export async function getPostsAction(
  postParamsDto?: PostParamsDto,
): Promise<ActionResultState<Post[]>> {
  try {
    const { result, error } = await getPostsUseCase({
      context: {
        getProfile: getProfileAction,
        getPosts: (data) => postService.getPosts(data),
      },
      postParamsDto,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}

export async function getPostByIdAction(
  id: number,
): Promise<ActionResultState<Post>> {
  try {
    const { result, error } = await getPostIdUseCase({
      context: {
        getProfile: getProfileAction,
        getPostById: (data) => postService.getPostById(data),
      },
      id,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}

export async function createPostAction(
  createPostDto: CreatePostDto,
): Promise<ActionResultState<Post>> {
  try {
    const { result, error } = await createPostUseCase({
      context: {
        getProfile: getProfileAction,
        createPost: (data) => postService.createPost(data),
      },
      data: createPostDto,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}

export async function updatePostAction(
  id: number,
  updatePostDto: UpdatePostDto,
): Promise<ActionResultState<Post>> {
  try {
    const { result, error } = await updatePostUseCase({
      context: {
        getProfile: getProfileAction,
        updatePost: (id, data) => postService.updatePost(id, data),
      },
      id,
      data: updatePostDto,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}

export async function deletePostAction(
  id: number,
): Promise<ActionResultState<Post>> {
  try {
    const { result, error } = await deletePostUseCase({
      context: {
        getProfile: getProfileAction,
        deletePost: (id) => postService.deletePost(id),
      },
      id,
    });

    return baseActionHandleResponse(result, error);
  } catch (err) {
    const error = err as Error;
    return baseActionHandleResponse(undefined, error);
  }
}
