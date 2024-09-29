import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Logger,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';

import { Post as PostModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'interface/request.interface';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    try {
      const post = await this.postService.getPost({ id });
      this.logger.log(`Post with ID ${id} found`);
      return post;
    } catch (error) {
      this.logger.error(`Failed to find post with ID ${id}`, error.stack);
      throw error;
    }
  }

  @Get()
  async getPosts(): Promise<PostModel[]> {
    try {
      const posts = await this.postService.getPosts({});
      this.logger.log('Posts fetched successfully');
      return posts;
    } catch (error) {
      this.logger.error('Failed to fetch posts', error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPost(
    @Req() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    try {
      const newPost = await this.postService.createPost({
        ...createPostDto,
        userId: req.user.id,
      });
      this.logger.log('Post created successfully');
      return newPost;
    } catch (error) {
      this.logger.error('Failed to create post', error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updatePost(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    try {
      const updatedPost = await this.postService.updatePost({
        where: { id },
        data: { ...updatePostDto, userId: req.user.id },
      });
      this.logger.log(`Post with ID ${id} updated successfully`);
      return updatedPost;
    } catch (error) {
      this.logger.error(`Failed to update post with ID ${id}`, error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    try {
      const deletedPost = await this.postService.deletePost({ id });
      this.logger.log(`Post with ID ${id} deleted successfully`);
      return deletedPost;
    } catch (error) {
      this.logger.error(`Failed to delete post with ID ${id}`, error.stack);
      throw error;
    }
  }
}
