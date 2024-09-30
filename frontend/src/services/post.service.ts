import { type ServiceResponse } from "@/interfaces/services/base.service";
import { BaseService } from "./base.service";
import {
  type Post,
  type CreatePostDto,
  type UpdatePostDto,
  type PostParamsDto,
} from "@/interfaces/services/post.service";

export class PostService extends BaseService {
  public async getPostById(id: number): Promise<ServiceResponse<Post>> {
    return this.handleRequest(() =>
      this.backendApi.get<Post>(`/api/v1/posts/${id}`),
    );
  }

  public async getPosts(
    postParams: PostParamsDto = { fsearch: undefined, communityId: undefined },
  ): Promise<ServiceResponse<Post[]>> {
    return this.handleRequest(() =>
      this.backendApi.get<Post[]>(`/api/v1/posts`, {
        params: postParams,
      }),
    );
  }

  public async createPost(data: CreatePostDto): Promise<ServiceResponse<Post>> {
    return this.handleRequest(() =>
      this.backendApi.post<Post>(`/api/v1/posts`, data),
    );
  }

  public async updatePost(
    id: number,
    data: UpdatePostDto,
  ): Promise<ServiceResponse<Post>> {
    return this.handleRequest(() =>
      this.backendApi.put<Post>(`/api/v1/posts/${id}`, data),
    );
  }

  public async deletePost(id: number): Promise<ServiceResponse<Post>> {
    return this.handleRequest(() =>
      this.backendApi.delete<Post>(`/api/v1/posts/${id}`),
    );
  }
}

export const postService = new PostService();
