import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { Prisma, Comment as CommentModel } from '@prisma/client';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(private prisma: PrismaService) {}

  private handleException(method: string, error: any): never {
    this.logger.error(`${method}`, error.stack);
    throw new InternalServerErrorException(`Failed to ${method}`);
  }

  async findCommentOrThrow(
    where: Prisma.CommentWhereUniqueInput,
  ): Promise<CommentModel> {
    const comment = await this.prisma.comment.findUnique({ where });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${where.id} not found`);
    }
    return comment;
  }

  async getComment(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<CommentModel> {
    try {
      return await this.prisma.comment.findUnique({
        where: commentWhereUniqueInput,
        include: {
          user: true,
        },
      });
    } catch (error) {
      this.handleException('fetch comment', error);
    }
  }

  async getComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<CommentModel[]> {
    try {
      return await this.prisma.comment.findMany({
        skip: params.skip,
        take: params.take,
        cursor: params.cursor,
        where: params.where,
        orderBy: params.orderBy ?? { createdAt: 'desc' },
        include: {
          user: true,
        },
      });
    } catch (error) {
      this.handleException('fetch comments', error);
    }
  }

  async createComment(
    data: Prisma.CommentUncheckedCreateInput,
  ): Promise<CommentModel> {
    try {
      return await this.prisma.comment.create({
        data,
        include: {
          user: true,
        },
      });
    } catch (error) {
      this.handleException('create comment', error);
    }
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<CommentModel> {
    try {
      await this.findCommentOrThrow(params.where);

      return await this.prisma.comment.update({
        where: params.where,
        data: params.data,
        include: {
          user: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleException('update comment', error);
    }
  }

  async deleteComment(
    where: Prisma.CommentWhereUniqueInput,
  ): Promise<CommentModel> {
    try {
      await this.findCommentOrThrow(where);

      return await this.prisma.comment.delete({
        where,
        include: {
          user: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleException('delete comment', error);
    }
  }
}
