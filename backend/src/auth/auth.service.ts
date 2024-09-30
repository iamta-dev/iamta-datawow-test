import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { User as UserModel } from '@prisma/client';
import { JwtPayload } from 'interface/request.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user) return user;

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: UserModel) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      pictureUrl: user.pictureUrl,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
