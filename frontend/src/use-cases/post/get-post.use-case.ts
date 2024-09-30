import { type APIErrorResponse } from "@/interfaces/services/base.service";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.d";
import {
  type getPostById,
  type getPosts,
} from "@/interfaces/use-cases/post.use-case.d";
import {
  type PostParamsDto,
  type Post,
} from "@/interfaces/services/post.service";
import { handleAPIError } from "../base/base.use-case";

export async function getPostIdUseCase(params: {
  context: {
    getProfile: getProfile;
    getPostById: getPostById;
  };
  id: number;
}): Promise<{ data?: Post; error?: APIErrorResponse }> {
  const { context, id } = params;

  const resp = await context.getPostById(id);
  return handleAPIError(resp);
}

export async function getPostsUseCase(params: {
  context: {
    getProfile: getProfile;
    getPosts: getPosts;
  };
  postParamsDto?: PostParamsDto;
}): Promise<{ data?: Post[]; error?: APIErrorResponse }> {
  const { context, postParamsDto } = params;

  const resp = await context.getPosts(postParamsDto);
  return handleAPIError(resp);
}
