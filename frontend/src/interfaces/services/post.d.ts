import { type User } from "./user.d";
import { type Community } from "./community.d";
import { type Comment } from "./comment.d";

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
