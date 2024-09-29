import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto/post.dto';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  const mockPost = {
    id: 1,
    title: 'Sample Post',
    detail: 'Post details',
    userId: 1,
    communityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPostService = {
    getPost: jest.fn().mockResolvedValue(mockPost),
    getPosts: jest.fn().mockResolvedValue([mockPost]),
    createPost: jest.fn().mockResolvedValue(mockPost),
    updatePost: jest.fn().mockResolvedValue(mockPost),
    deletePost: jest.fn().mockResolvedValue(mockPost),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        { provide: PostService, useValue: mockPostService },
        PrismaService,
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPostById', () => {
    it('should return a single post', async () => {
      const result = await controller.getPostById(1);
      expect(result).toEqual(mockPost);
      expect(service.getPost).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if post does not exist', async () => {
      jest
        .spyOn(service, 'getPost')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.getPostById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const postQueryDto: PostQueryDto = { fsearch: 'sample' };
      const result = await controller.getPosts(postQueryDto);
      expect(result).toEqual([mockPost]);
      expect(service.getPosts).toHaveBeenCalled();
    });

    it('should handle empty query', async () => {
      const postQueryDto: PostQueryDto = {};
      const result = await controller.getPosts(postQueryDto);
      expect(result).toEqual([mockPost]);
      expect(service.getPosts).toHaveBeenCalled();
    });
  });

  describe('createPost', () => {
    it('should create and return a new post', async () => {
      const mockReq = { user: { id: 1 } } as any;
      const createPostDto: CreatePostDto = {
        title: 'Sample Post',
        detail: 'Post details',
        communityId: 1,
      };
      const result = await controller.createPost(mockReq, createPostDto);
      expect(result).toEqual(mockPost);
      expect(service.createPost).toHaveBeenCalledWith({
        ...createPostDto,
        userId: mockReq.user.id,
      });
    });
  });

  describe('updatePost', () => {
    it('should update and return a post', async () => {
      const mockReq = { user: { id: 1 } } as any;
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Title',
        detail: 'Updated details',
      };
      const result = await controller.updatePost(mockReq, 1, updatePostDto);
      expect(result).toEqual(mockPost);
      expect(service.updatePost).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { ...updatePostDto, userId: mockReq.user.id },
      });
    });

    it('should throw NotFoundException if post does not exist', async () => {
      jest
        .spyOn(service, 'updatePost')
        .mockRejectedValueOnce(new NotFoundException());
      const mockReq = { user: { id: 1 } } as any;
      await expect(
        controller.updatePost(mockReq, 1, {
          title: 'Updated Title',
          detail: 'Updated details',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePost', () => {
    it('should delete and return the deleted post', async () => {
      const result = await controller.deletePost(1);
      expect(result).toEqual(mockPost);
      expect(service.deletePost).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if post does not exist', async () => {
      jest
        .spyOn(service, 'deletePost')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.deletePost(1)).rejects.toThrow(NotFoundException);
    });
  });
});
