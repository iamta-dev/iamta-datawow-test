import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../../lib/prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService;

  const mockPost = {
    id: 1,
    title: 'Sample Post',
    detail: 'Post details',
    userId: 1,
    communityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPostOrThrow', () => {
    it('should return a post if it exists', async () => {
      prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);
      const result = await service.findPostOrThrow({ id: 1 });
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException if post does not exist', async () => {
      prisma.post.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.findPostOrThrow({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('rowsCount', () => {
    it('should return the number of posts', async () => {
      prisma.post.count = jest.fn().mockResolvedValue(10);
      const result = await service.rowsCount();
      expect(result).toBe(10);
    });

    it('should handle error when counting rows', async () => {
      const error = new Error('Database error');
      prisma.post.count = jest.fn().mockRejectedValue(error);
      await expect(service.rowsCount()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getPost', () => {
    it('should return a post by ID', async () => {
      prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);
      const result = await service.getPost({ id: 1 });
      expect(result).toEqual(mockPost);
    });

    it('should handle error when fetching post', async () => {
      const error = new Error('Database error');
      prisma.post.findUnique = jest.fn().mockRejectedValue(error);
      await expect(service.getPost({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      prisma.post.findMany = jest.fn().mockResolvedValue([mockPost]);
      const result = await service.getPosts({ skip: 0, take: 10 });
      expect(result).toEqual([mockPost]);
    });

    it('should handle error when fetching posts', async () => {
      const error = new Error('Database error');
      prisma.post.findMany = jest.fn().mockRejectedValue(error);
      await expect(service.getPosts({ skip: 0, take: 10 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      prisma.post.create = jest.fn().mockResolvedValue(mockPost);
      const result = await service.createPost({
        title: 'Sample Post',
        detail: 'Post details',
        userId: 1,
        communityId: 1,
      });
      expect(result).toEqual(mockPost);
    });

    it('should handle error when creating a post', async () => {
      const error = new Error('Database error');
      prisma.post.create = jest.fn().mockRejectedValue(error);
      await expect(
        service.createPost({
          title: 'Sample Post',
          detail: 'Post details',
          userId: 1,
          communityId: 1,
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      prisma.post.update = jest.fn().mockResolvedValue(mockPost);
      prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);
      const result = await service.updatePost({
        where: { id: 1 },
        data: { title: 'Updated Title', detail: 'Updated details' },
      });
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException if post does not exist', async () => {
      prisma.post.findUnique = jest.fn().mockResolvedValue(null);
      await expect(
        service.updatePost({
          where: { id: 1 },
          data: { title: 'Updated Title', detail: 'Updated details' },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle error when updating a post', async () => {
      const error = new Error('Database error');
      prisma.post.update = jest.fn().mockRejectedValue(error);
      prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);
      await expect(
        service.updatePost({
          where: { id: 1 },
          data: { title: 'Updated Title', detail: 'Updated details' },
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      prisma.post.delete = jest.fn().mockResolvedValue(mockPost);
      prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);
      const result = await service.deletePost({ id: 1 });
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException if post does not exist', async () => {
      prisma.post.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.deletePost({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle error when deleting a post', async () => {
      const error = new Error('Database error');
      prisma.post.delete = jest.fn().mockRejectedValue(error);
      prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);
      await expect(service.deletePost({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
