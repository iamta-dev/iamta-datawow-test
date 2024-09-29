import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { PrismaService } from '../../lib/prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Comment as CommentModel } from '@prisma/client';

describe('CommentService', () => {
  let service: CommentService;
  let prisma: PrismaService;

  const mockComment: CommentModel = {
    id: 1,
    comment: 'This is a test comment',
    userId: 1,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, PrismaService],
    }).compile();

    service = module.get<CommentService>(CommentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findCommentOrThrow', () => {
    it('should return a comment if it exists', async () => {
      prisma.comment.findUnique = jest.fn().mockResolvedValue(mockComment);
      const result = await service.findCommentOrThrow({ id: 1 });
      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException if comment does not exist', async () => {
      prisma.comment.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.findCommentOrThrow({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getComment', () => {
    it('should return a comment by ID', async () => {
      prisma.comment.findUnique = jest.fn().mockResolvedValue(mockComment);
      const result = await service.getComment({ id: 1 });
      expect(result).toEqual(mockComment);
    });

    it('should handle error when fetching comment', async () => {
      const error = new Error('Database error');
      prisma.comment.findUnique = jest.fn().mockRejectedValue(error);
      await expect(service.getComment({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getComments', () => {
    it('should return an array of comments', async () => {
      prisma.comment.findMany = jest.fn().mockResolvedValue([mockComment]);
      const result = await service.getComments({ skip: 0, take: 10 });
      expect(result).toEqual([mockComment]);
    });

    it('should handle error when fetching comments', async () => {
      const error = new Error('Database error');
      prisma.comment.findMany = jest.fn().mockRejectedValue(error);
      await expect(service.getComments({ skip: 0, take: 10 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      prisma.comment.create = jest.fn().mockResolvedValue(mockComment);
      const result = await service.createComment({
        comment: 'This is a test comment',
        userId: 1,
        postId: 1,
      });
      expect(result).toEqual(mockComment);
    });

    it('should handle error when creating a comment', async () => {
      const error = new Error('Database error');
      prisma.comment.create = jest.fn().mockRejectedValue(error);
      await expect(
        service.createComment({
          comment: 'This is a test comment',
          userId: 1,
          postId: 1,
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateComment', () => {
    it('should update a comment', async () => {
      prisma.comment.update = jest.fn().mockResolvedValue(mockComment);
      prisma.comment.findUnique = jest.fn().mockResolvedValue(mockComment);
      const result = await service.updateComment({
        where: { id: 1 },
        data: { comment: 'Updated comment' },
      });
      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException if comment does not exist', async () => {
      prisma.comment.findUnique = jest.fn().mockResolvedValue(null);
      await expect(
        service.updateComment({
          where: { id: 1 },
          data: { comment: 'Updated comment' },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle error when updating a comment', async () => {
      const error = new Error('Database error');
      prisma.comment.update = jest.fn().mockRejectedValue(error);
      prisma.comment.findUnique = jest.fn().mockResolvedValue(mockComment);
      await expect(
        service.updateComment({
          where: { id: 1 },
          data: { comment: 'Updated comment' },
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      prisma.comment.delete = jest.fn().mockResolvedValue(mockComment);
      prisma.comment.findUnique = jest.fn().mockResolvedValue(mockComment);
      const result = await service.deleteComment({ id: 1 });
      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException if comment does not exist', async () => {
      prisma.comment.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.deleteComment({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle error when deleting a comment', async () => {
      const error = new Error('Database error');
      prisma.comment.delete = jest.fn().mockRejectedValue(error);
      prisma.comment.findUnique = jest.fn().mockResolvedValue(mockComment);
      await expect(service.deleteComment({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
