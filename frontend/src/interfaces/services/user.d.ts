import { type Post } from "./post.d";
import { type Comment } from "./comment.d";

export interface User {
  id: number;
  fullName: string;
  username: string;
  pictureUrl: string;
  posts?: Post[];
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  pictureUrl: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
