import {
  type UseCaseResponse,
  type getProfile,
} from "@/interfaces/use-cases/base.use-case.interface";
import {
  type getMyPosts,
  type getPostById,
  type getPosts,
} from "@/interfaces/use-cases/post.use-case.interface";
import {
  type PostParamsDto,
  type Post,
} from "@/interfaces/services/post.service.interface";
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

export async function getMyPostsUseCase(params: {
  context: {
    getProfile: getProfile;
    getMyPosts: getMyPosts;
  };
  postParamsDto?: PostParamsDto;
}): Promise<UseCaseResponse<Post[]>> {
  const { context, postParamsDto } = params;

  const resp = await context.getMyPosts(postParamsDto);
  return baseUseCaseHandleResponse<Post[]>(resp);
}
