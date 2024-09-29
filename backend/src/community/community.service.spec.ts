import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { PrismaService } from '../../lib/prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Community as CommunityModel } from '@prisma/client';

describe('CommunityService', () => {
  let service: CommunityService;
  let prisma: PrismaService;

  const mockCommunity: CommunityModel = {
    id: 1,
    name: 'Test Community',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityService, PrismaService],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findCommunityOrThrow', () => {
    it('should return a community if it exists', async () => {
      prisma.community.findUnique = jest.fn().mockResolvedValue(mockCommunity);
      const result = await service.findCommunityOrThrow({ id: 1 });
      expect(result).toEqual(mockCommunity);
    });

    it('should throw NotFoundException if community does not exist', async () => {
      prisma.community.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.findCommunityOrThrow({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getCommunity', () => {
    it('should return a community by ID', async () => {
      prisma.community.findUnique = jest.fn().mockResolvedValue(mockCommunity);
      const result = await service.getCommunity({ id: 1 });
      expect(result).toEqual(mockCommunity);
    });

    it('should handle error when fetching community', async () => {
      const error = new Error('Database error');
      prisma.community.findUnique = jest.fn().mockRejectedValue(error);
      await expect(service.getCommunity({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getCommunities', () => {
    it('should return an array of communities', async () => {
      prisma.community.findMany = jest.fn().mockResolvedValue([mockCommunity]);
      const result = await service.getCommunities({ skip: 0, take: 10 });
      expect(result).toEqual([mockCommunity]);
    });

    it('should handle error when fetching communities', async () => {
      const error = new Error('Database error');
      prisma.community.findMany = jest.fn().mockRejectedValue(error);
      await expect(
        service.getCommunities({ skip: 0, take: 10 }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('createCommunity', () => {
    it('should create a new community', async () => {
      prisma.community.create = jest.fn().mockResolvedValue(mockCommunity);
      const result = await service.createCommunity({
        name: 'Test Community',
      });
      expect(result).toEqual(mockCommunity);
    });

    it('should handle error when creating a community', async () => {
      const error = new Error('Database error');
      prisma.community.create = jest.fn().mockRejectedValue(error);
      await expect(
        service.createCommunity({ name: 'Test Community' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateCommunity', () => {
    it('should update a community', async () => {
      prisma.community.update = jest.fn().mockResolvedValue(mockCommunity);
      prisma.community.findUnique = jest.fn().mockResolvedValue(mockCommunity);
      const result = await service.updateCommunity({
        where: { id: 1 },
        data: { name: 'Updated Community' },
      });
      expect(result).toEqual(mockCommunity);
    });

    it('should throw NotFoundException if community does not exist', async () => {
      prisma.community.findUnique = jest.fn().mockResolvedValue(null);
      await expect(
        service.updateCommunity({
          where: { id: 1 },
          data: { name: 'Updated Community' },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle error when updating a community', async () => {
      const error = new Error('Database error');
      prisma.community.update = jest.fn().mockRejectedValue(error);
      prisma.community.findUnique = jest.fn().mockResolvedValue(mockCommunity);
      await expect(
        service.updateCommunity({
          where: { id: 1 },
          data: { name: 'Updated Community' },
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteCommunity', () => {
    it('should delete a community', async () => {
      prisma.community.delete = jest.fn().mockResolvedValue(mockCommunity);
      prisma.community.findUnique = jest.fn().mockResolvedValue(mockCommunity);
      const result = await service.deleteCommunity({ id: 1 });
      expect(result).toEqual(mockCommunity);
    });

    it('should throw NotFoundException if community does not exist', async () => {
      prisma.community.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.deleteCommunity({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle error when deleting a community', async () => {
      const error = new Error('Database error');
      prisma.community.delete = jest.fn().mockRejectedValue(error);
      prisma.community.findUnique = jest.fn().mockResolvedValue(mockCommunity);
      await expect(service.deleteCommunity({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
