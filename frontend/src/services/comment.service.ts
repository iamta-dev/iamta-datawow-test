import { type ServiceResponse } from "@/interfaces/services/base";
import { BaseService } from "./base.service";
import { type Comment, type CreateCommentDto, type UpdateCommentDto } from "@/interfaces/services/comment";

export class CommentService extends BaseService {
  public async getCommentById(id: number): Promise<ServiceResponse<Comment>> {
    return this.handleRequest(() =>
      this.backendApi.get<Comment>(`/api/v1/comments/${id}`),
    );
  }

  public async createComment(data: CreateCommentDto): Promise<ServiceResponse<Comment>> {
    return this.handleRequest(() =>
      this.backendApi.post<Comment>(`/api/v1/comments`, data),
    );
  }

  public async updateComment(id: number, data: UpdateCommentDto): Promise<ServiceResponse<Comment>> {
    return this.handleRequest(() =>
      this.backendApi.put<Comment>(`/api/v1/comments/${id}`, data),
    );
  }

  public async deleteComment(id: number): Promise<ServiceResponse<Comment>> {
    return this.handleRequest(() =>
      this.backendApi.delete<Comment>(`/api/v1/comments/${id}`),
    );
  }
}

export const commentService = new CommentService();
