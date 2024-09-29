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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CommentSwagger } from './dto/comment.swagger';
import { Comment as CommentModel } from '@prisma/client';
import { SwaggerBaseResponse } from '../../lib/swagger/base-swagger';
import { RequestWithUser } from 'interface/request.interface';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);

  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @ApiOperation({
    summary: CommentSwagger.getCommentById.summary,
  })
  @ApiResponse(CommentSwagger.getCommentById[200])
  @ApiResponse(SwaggerBaseResponse[404])
  @ApiResponse(SwaggerBaseResponse[500])
  async getCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentModel> {
    try {
      const comment = await this.commentService.getComment({ id });
      this.logger.log(`Comment with ID ${id} found`);
      return comment;
    } catch (error) {
      this.logger.error(`Failed to find comment with ID ${id}`, error.stack);
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: CommentSwagger.getComments.summary,
  })
  @ApiResponse(CommentSwagger.getComments[200])
  @ApiResponse(SwaggerBaseResponse[500])
  async getComments(): Promise<CommentModel[]> {
    try {
      const comments = await this.commentService.getComments({});
      this.logger.log('Comments fetched successfully');
      return comments;
    } catch (error) {
      this.logger.error('Failed to fetch comments', error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({
    summary: CommentSwagger.createComment.summary,
  })
  @ApiResponse(CommentSwagger.createComment[201])
  @ApiResponse(SwaggerBaseResponse[400])
  @ApiResponse(SwaggerBaseResponse[500])
  async createComment(
    @Req() req: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentModel> {
    try {
      // Include userId from the logged-in user in the request data
      const newComment = await this.commentService.createComment({
        ...createCommentDto,
        userId: req.user.id,
      });
      this.logger.log('Comment created successfully');
      return newComment;
    } catch (error) {
      this.logger.error('Failed to create comment', error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({
    summary: CommentSwagger.updateComment.summary,
  })
  @ApiResponse(CommentSwagger.updateComment[200])
  @ApiResponse(SwaggerBaseResponse[400])
  @ApiResponse(SwaggerBaseResponse[404])
  @ApiResponse(SwaggerBaseResponse[500])
  async updateComment(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentModel> {
    try {
      // Fetch the comment by ID
      const comment = await this.commentService.findCommentOrThrow({ id });

      // Ensure the logged-in user is the owner of the comment
      if (comment.userId !== req.user.id) {
        this.logger.error(
          `User ${req.user.id} is not authorized to update this comment`,
        );
        throw new UnauthorizedException(
          'You are not authorized to update this comment',
        );
      }

      // Proceed with updating the comment
      const updatedComment = await this.commentService.updateComment({
        where: { id },
        data: updateCommentDto,
      });
      this.logger.log(`Comment with ID ${id} updated successfully`);
      return updatedComment;
    } catch (error) {
      this.logger.error(`Failed to update comment with ID ${id}`, error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: CommentSwagger.deleteComment.summary,
  })
  @ApiResponse(CommentSwagger.deleteComment[200])
  @ApiResponse(SwaggerBaseResponse[404])
  @ApiResponse(SwaggerBaseResponse[500])
  async deleteComment(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentModel> {
    try {
      // Fetch the comment by ID
      const comment = await this.commentService.findCommentOrThrow({ id });

      // Ensure the logged-in user is the owner of the comment
      if (comment.userId !== req.user.id) {
        this.logger.error(
          `User ${req.user.id} is not authorized to delete this comment`,
        );
        throw new UnauthorizedException(
          'You are not authorized to delete this comment',
        );
      }

      // Proceed with deleting the comment
      const deletedComment = await this.commentService.deleteComment({ id });
      this.logger.log(`Comment with ID ${id} deleted successfully`);
      return deletedComment;
    } catch (error) {
      this.logger.error(`Failed to delete comment with ID ${id}`, error.stack);
      throw error;
    }
  }
}
