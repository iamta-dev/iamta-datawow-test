import { type APIErrorResponse } from "@/interfaces/services/base";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.d";
import { type getPostById,type getPosts } from "@/interfaces/use-cases/post.use-case.d";
import { type PostParamsDto, type Post as PostModel } from "@/interfaces/services/post";
import { handleAPIError } from "../base/base.use-case";

export async function getPostIdUseCase(params: {
  context: {
    getProfile: getProfile;
    getPostById: getPostById;
  };
  id: number;
}): Promise<{ data?: PostModel; error?: APIErrorResponse }> {
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
}): Promise<{ data?: PostModel[]; error?: APIErrorResponse }> {
  const { context, postParamsDto } = params;

  const resp = await context.getPosts(postParamsDto);
  return handleAPIError(resp);
}
