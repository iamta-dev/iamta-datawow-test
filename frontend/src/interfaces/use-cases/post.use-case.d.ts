import { type ServiceResponse } from "@/interfaces/services/base.service";
import {
  type Post as PostModel,
  type CreatePostDto,
  type UpdatePostDto,
  type PostParamsDto,
} from "@/interfaces/services/post.service";

export type getPostById = (id: number) => Promise<ServiceResponse<PostModel>>;

export type getPosts = (
  postParamsDto?: PostParamsDto,
) => Promise<ServiceResponse<PostModel[]>>;

export type createPost = (
  data: CreatePostDto,
) => Promise<ServiceResponse<PostModel>>;

export type updatePost = (
  id: number,
  data: UpdatePostDto,
) => Promise<ServiceResponse<PostModel>>;

export type deletePost = (id: number) => Promise<ServiceResponse<PostModel>>;
