import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  const mockComment = {
    id: 1,
    comment: 'This is a comment',
    userId: 1,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCommentService = {
    getComment: jest.fn().mockResolvedValue(mockComment),
    getComments: jest.fn().mockResolvedValue([mockComment]),
    createComment: jest.fn().mockResolvedValue(mockComment),
    updateComment: jest.fn().mockResolvedValue(mockComment),
    deleteComment: jest.fn().mockResolvedValue(mockComment),
    findCommentOrThrow: jest.fn().mockResolvedValue(mockComment),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [{ provide: CommentService, useValue: mockCommentService }],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCommentById', () => {
    it('should return a comment by ID', async () => {
      const result = await controller.getCommentById(1);
      expect(result).toEqual(mockComment);
      expect(service.getComment).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if comment is not found', async () => {
      jest
        .spyOn(service, 'getComment')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.getCommentById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createComment', () => {
    it('should create and return a new comment', async () => {
      const mockReq = { user: { id: 1 } } as any;
      const createCommentDto: CreateCommentDto = {
        comment: 'This is a new comment',
        postId: 1,
      };
      const result = await controller.createComment(mockReq, createCommentDto);
      expect(result).toEqual(mockComment);
      expect(service.createComment).toHaveBeenCalledWith({
        ...createCommentDto,
        userId: mockReq.user.id,
      });
    });
  });

  describe('updateComment', () => {
    it('should update and return a comment if user is the owner', async () => {
      const mockReq = { user: { id: 1 } } as any;
      const updateCommentDto: UpdateCommentDto = { comment: 'Updated comment' };

      const result = await controller.updateComment(
        mockReq,
        1,
        updateCommentDto,
      );
      expect(result).toEqual(mockComment);
      expect(service.updateComment).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateCommentDto,
      });
    });

    it('should throw UnauthorizedException if user is not the owner', async () => {
      jest.spyOn(service, 'findCommentOrThrow').mockResolvedValueOnce({
        ...mockComment,
        userId: 2, // Different user
      });

      const mockReq = { user: { id: 1 } } as any;
      const updateCommentDto: UpdateCommentDto = { comment: 'Updated comment' };

      await expect(
        controller.updateComment(mockReq, 1, updateCommentDto),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if comment is not found', async () => {
      jest
        .spyOn(service, 'findCommentOrThrow')
        .mockRejectedValueOnce(new NotFoundException());

      const mockReq = { user: { id: 1 } } as any;
      const updateCommentDto: UpdateCommentDto = { comment: 'Updated comment' };

      await expect(
        controller.updateComment(mockReq, 1, updateCommentDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteComment', () => {
    it('should delete and return the deleted comment if user is the owner', async () => {
      const mockReq = { user: { id: 1 } } as any;

      const result = await controller.deleteComment(mockReq, 1);
      expect(result).toEqual(mockComment);
      expect(service.deleteComment).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw UnauthorizedException if user is not the owner', async () => {
      jest.spyOn(service, 'findCommentOrThrow').mockResolvedValueOnce({
        ...mockComment,
        userId: 2, // Different user
      });

      const mockReq = { user: { id: 1 } } as any;

      await expect(controller.deleteComment(mockReq, 1)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw NotFoundException if comment is not found', async () => {
      jest
        .spyOn(service, 'findCommentOrThrow')
        .mockRejectedValueOnce(new NotFoundException());

      const mockReq = { user: { id: 1 } } as any;

      await expect(controller.deleteComment(mockReq, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
