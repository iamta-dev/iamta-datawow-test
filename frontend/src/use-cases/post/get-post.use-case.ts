import { type APIErrorResponse } from "@/interfaces/services/base.service";
import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.d";
import {
  type getOwnerPosts,
  type getPostById,
  type getPosts,
} from "@/interfaces/use-cases/post.use-case.d";
import {
  type PostParamsDto,
  type Post,
} from "@/interfaces/services/post.service";
import { baseUseCaseHandleResponse } from "../base/base.use-case";

export async function getPostIdUseCase(params: {
  context: {
    getProfile: getProfile;
    getPostById: getPostById;
  };
  id: number;
}): Promise<UseCaseResponse<Post>> {
  const { context, id } = params;

  const resp = await context.getPostById(id);
  return baseUseCaseHandleResponse<Post>(resp);
}

export async function getPostsUseCase(params: {
  context: {
    getProfile: getProfile;
    getPosts: getPosts;
  };
  postParamsDto?: PostParamsDto;
}): Promise<UseCaseResponse<Post[]>> {
  const { context, postParamsDto } = params;

  const resp = await context.getPosts(postParamsDto);
  return baseUseCaseHandleResponse<Post[]>(resp);
}

export async function getOwnerPostsUseCase(params: {
  context: {
    getProfile: getProfile;
    getOwnerPosts: getOwnerPosts;
  };
  postParamsDto?: PostParamsDto;
}): Promise<UseCaseResponse<Post[]>> {
  const { context, postParamsDto } = params;

  const resp = await context.getOwnerPosts(postParamsDto);
  return baseUseCaseHandleResponse<Post[]>(resp);
}
