import { type User } from "./user.service.interface";
import { type Community } from "./community.service.interface";
import { type Comment } from "./comment.service.interface";

export interface Post {
  id: number;
  title: string;
  detail: string;
  userId: number;
  communityId: number;
  user?: User;
  community?: Community;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  title: string;
  detail: string;
  communityId: number;
}

export type UpdatePostDto = Partial<CreatePostDto>;

export interface PostParamsDto {
  fsearch?: string;
  communityId?: string;
}
