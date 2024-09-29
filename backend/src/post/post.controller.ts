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
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { PostSwagger } from './dto/post.swagger';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto, PostQueryDto, UpdatePostDto } from './dto/post.dto';
import { SwaggerBaseResponse } from '../../lib/swagger/base-swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'interface/request.interface';
import { createPostSearchCondition } from './dto/post.search';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiOperation({
    summary: PostSwagger.getPostById.summary,
  })
  @ApiResponse(PostSwagger.getPostById[200])
  @ApiResponse(SwaggerBaseResponse[404])
  @ApiResponse(SwaggerBaseResponse[500])
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
  @ApiOperation({
    summary: PostSwagger.getPosts.summary,
  })
  @ApiResponse(PostSwagger.getPosts[200])
  @ApiResponse(SwaggerBaseResponse[500])
  async getPosts(@Query() postQueryDto: PostQueryDto): Promise<PostModel[]> {
    try {
      const { searchCondition } = createPostSearchCondition(
        postQueryDto.fsearch,
      );

      const posts = await this.postService.getPosts({
        where: searchCondition,
      });
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
  @ApiOperation({
    summary: PostSwagger.createPost.summary,
  })
  @ApiResponse(PostSwagger.createPost[201])
  @ApiResponse(SwaggerBaseResponse[401])
  @ApiResponse(SwaggerBaseResponse[400])
  @ApiResponse(SwaggerBaseResponse[500])
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
  @ApiOperation({
    summary: PostSwagger.updatePost.summary,
  })
  @ApiResponse(PostSwagger.updatePost[200])
  @ApiResponse(SwaggerBaseResponse[401])
  @ApiResponse(SwaggerBaseResponse[404])
  @ApiResponse(SwaggerBaseResponse[500])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    try {
      const updatedPost = await this.postService.updatePost({
        where: { id },
        data: updatePostDto,
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
  @ApiOperation({
    summary: PostSwagger.deletePost.summary,
  })
  @ApiResponse(PostSwagger.deletePost[200])
  @ApiResponse(SwaggerBaseResponse[401])
  @ApiResponse(SwaggerBaseResponse[404])
  @ApiResponse(SwaggerBaseResponse[500])
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
