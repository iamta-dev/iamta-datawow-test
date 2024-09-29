import { type ServiceResponse } from "@/interfaces/services/base";
import {
  type Post,
  type CreatePostDto,
  type UpdatePostDto,
  type PostParamsDto,
} from "@/interfaces/services/post";

export type getPostById = (id: number) => Promise<ServiceResponse<Post>>;

export type getPosts = (
  postParamsDto: PostParamsDto,
) => Promise<ServiceResponse<Post[]>>;

export type createPost = (
  data: CreatePostDto,
) => Promise<ServiceResponse<Post>>;

export type updatePost = (
  id: number,
  data: UpdatePostDto,
) => Promise<ServiceResponse<Post>>;

export type deletePost = (id: number) => Promise<ServiceResponse<void>>;
