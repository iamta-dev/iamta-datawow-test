import { type ServiceResponse } from "@/interfaces/services/base.service";
import {
  type Comment as CommentModel,
  type CreateCommentDto,
  type UpdateCommentDto,
  type CommentParamsDto,
} from "@/interfaces/services/comment.service";

export type getCommentById = (
  id: number,
) => Promise<ServiceResponse<CommentModel>>;

export type getComments = (
  commentParamsDto: CommentParamsDto,
) => Promise<ServiceResponse<CommentModel[]>>;

export type createComment = (
  data: CreateCommentDto,
) => Promise<ServiceResponse<CommentModel>>;

export type updateComment = (
  id: number,
  data: UpdateCommentDto,
) => Promise<ServiceResponse<CommentModel>>;

export type deleteComment = (id: number) => Promise<ServiceResponse<void>>;
