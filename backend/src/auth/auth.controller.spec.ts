/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let configService: ConfigService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockUser = {
    id: 1,
    fullName: 'TestUser',
    username: 'testuser',
    pictureUrl: 'https://example.com/user.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return access token if credentials are valid', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
      };
      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue({ accessToken: 'mockedToken' });

      const result = await authController.login(loginDto);

      expect(result).toEqual({ accessToken: 'mockedToken' });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith('testuser');
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto: LoginDto = { username: 'invaliduser' };
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(authController.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
