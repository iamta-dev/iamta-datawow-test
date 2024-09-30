import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

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
}
