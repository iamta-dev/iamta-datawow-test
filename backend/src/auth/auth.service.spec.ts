import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockUser: UserModel = {
    id: 1,
    fullName: 'TestUser',
    username: 'testuser',
    pictureUrl: 'https://example.com/user.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedAccessToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.validateUser('testuser');
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.validateUser('invaliduser')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await service.login(mockUser);
      expect(result).toEqual({ accessToken: 'mockedAccessToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: mockUser.id,
        fullName: mockUser.fullName,
        username: mockUser.username,
        pictureUrl: mockUser.pictureUrl,
      });
    });
  });
});
