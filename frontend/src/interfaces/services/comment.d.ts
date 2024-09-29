import { type User } from "./user.d";

export interface Comment {
  id: number;
  comment: string;
  postId: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  comment: string;
  postId: number;
}

export type UpdateCommentDto = Partial<CreateCommentDto>;

export interface CommentParamsDto {
  postId?: number;
}
