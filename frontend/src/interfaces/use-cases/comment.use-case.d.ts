import { type ServiceResponse } from "@/interfaces/services/base.service";
import {
  type Comment,
  type CreateCommentDto,
  type UpdateCommentDto,
  type CommentParamsDto,
} from "@/interfaces/services/comment.service";

export type getCommentById = (id: number) => Promise<ServiceResponse<Comment>>;

export type getComments = (
  commentParamsDto: CommentParamsDto,
) => Promise<ServiceResponse<Comment[]>>;

export type createComment = (
  data: CreateCommentDto,
) => Promise<ServiceResponse<Comment>>;

export type updateComment = (
  id: number,
  data: UpdateCommentDto,
) => Promise<ServiceResponse<Comment>>;

export type deleteComment = (id: number) => Promise<ServiceResponse<void>>;
