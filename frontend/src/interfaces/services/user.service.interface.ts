import { type Post } from "./post.service.interface";
import { type Comment } from "./comment.service.interface";

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
