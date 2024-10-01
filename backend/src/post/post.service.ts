import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Post as PostModel, Prisma } from '@prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private prisma: PrismaService) {}

  private handleException(method: string, error: any): never {
    this.logger.error(`${method}`, error.stack);
    throw new InternalServerErrorException(`Failed to ${method}`);
  }

  async findPostOrThrow(
    where: Prisma.PostWhereUniqueInput,
  ): Promise<PostModel> {
    const post = await this.prisma.post.findUnique({ where });
    if (!post) {
      throw new NotFoundException(`Post with ID ${where.id} not found`);
    }
    return post;
  }

  async rowsCount(): Promise<number> {
    try {
      return await this.prisma.post.count();
    } catch (error) {
      this.handleException('count', error);
    }
  }

  async getPost(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    try {
      return await this.prisma.post.findUnique({
        where: postWhereUniqueInput,
        include: {
          user: true,
          community: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    } catch (error) {
      this.handleException('fetch post', error);
    }
  }

  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PostModel[]> {
    try {
      return await this.prisma.post.findMany({
        skip: params.skip,
        take: params.take,
        cursor: params.cursor,
        where: params.where,
        orderBy: params.orderBy ?? { createdAt: 'desc' },
        include: {
          user: true,
          community: true,
          comments: { orderBy: { createdAt: 'desc' } },
        },
      });
    } catch (error) {
      this.handleException('fetch posts', error);
    }
  }

  async createPost(data: Prisma.PostUncheckedCreateInput): Promise<PostModel> {
    try {
      return await this.prisma.post.create({
        data,
        include: {
          user: true,
          community: true,
          comments: { orderBy: { createdAt: 'desc' } },
        },
      });
    } catch (error) {
      this.handleException('create post', error);
    }
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUncheckedUpdateInput;
  }): Promise<PostModel> {
    try {
      await this.findPostOrThrow(params.where);

      return await this.prisma.post.update({
        where: params.where,
        data: params.data,
        include: {
          user: true,
          community: true,
          comments: { orderBy: { createdAt: 'desc' } },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleException('update post', error);
    }
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<PostModel> {
    try {
      await this.findPostOrThrow(where);

      return await this.prisma.post.delete({
        where,
        include: {
          user: true,
          community: true,
          comments: { orderBy: { createdAt: 'desc' } },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleException('delete post', error);
    }
  }
}
