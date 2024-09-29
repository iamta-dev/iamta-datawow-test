import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;

  const mockCommunity = {
    id: 1,
    name: 'Healthy Community',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCommunityService = {
    getCommunity: jest.fn().mockResolvedValue(mockCommunity),
    getCommunities: jest.fn().mockResolvedValue([mockCommunity]),
    createCommunity: jest.fn().mockResolvedValue(mockCommunity),
    updateCommunity: jest.fn().mockResolvedValue(mockCommunity),
    deleteCommunity: jest.fn().mockResolvedValue(mockCommunity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [
        { provide: CommunityService, useValue: mockCommunityService },
      ],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
    service = module.get<CommunityService>(CommunityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCommunities', () => {
    it('should return an array of communities', async () => {
      const result = await controller.getCommunities();
      expect(result).toEqual([mockCommunity]);
      expect(service.getCommunities).toHaveBeenCalled();
    });
  });
});
