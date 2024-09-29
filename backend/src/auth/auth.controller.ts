import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5.....',
      },
    },
  })
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('mocklogin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({
    summary: 'Bypass user Test User login (not support environment production)',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in.',
    schema: {
      example: 'eyJhbGciOiJIUzI1NiIsInR5.....',
    },
  })
  async mocklogin() {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    if (nodeEnv == 'production') {
      throw new UnauthorizedException('Unauthorized');
    }
    const mockuser = {
      username: 'user1',
    };
    const user = await this.authService.validateUser(mockuser.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return (await this.authService.login(user)).accessToken;
  }
}
