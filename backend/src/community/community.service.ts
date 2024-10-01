import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { Prisma, Community as CommunityModel } from '@prisma/client';

@Injectable()
export class CommunityService {
  private readonly logger = new Logger(CommunityService.name);

  constructor(private prisma: PrismaService) {}

  private handleException(method: string, error: any): never {
    this.logger.error(`${method}`, error.stack);
    throw new InternalServerErrorException(`Failed to ${method}`);
  }

  async findCommunityOrThrow(
    where: Prisma.CommunityWhereUniqueInput,
  ): Promise<CommunityModel> {
    const community = await this.prisma.community.findUnique({ where });
    if (!community) {
      throw new NotFoundException(`Community with ID ${where.id} not found`);
    }
    return community;
  }

  async getCommunity(
    communityWhereUniqueInput: Prisma.CommunityWhereUniqueInput,
  ): Promise<CommunityModel> {
    try {
      return await this.prisma.community.findUnique({
        where: communityWhereUniqueInput,
      });
    } catch (error) {
      this.handleException('fetch community', error);
    }
  }

  async getCommunities(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommunityWhereUniqueInput;
    where?: Prisma.CommunityWhereInput;
    orderBy?: Prisma.CommunityOrderByWithRelationInput;
  }): Promise<CommunityModel[]> {
    try {
      return await this.prisma.community.findMany({
        skip: params.skip,
        take: params.take,
        cursor: params.cursor,
        where: params.where,
        orderBy: params.orderBy ?? { createdAt: 'asc' },
      });
    } catch (error) {
      this.handleException('fetch communities', error);
    }
  }

  async createCommunity(
    data: Prisma.CommunityCreateInput,
  ): Promise<CommunityModel> {
    try {
      return await this.prisma.community.create({
        data,
      });
    } catch (error) {
      this.handleException('create community', error);
    }
  }

  async updateCommunity(params: {
    where: Prisma.CommunityWhereUniqueInput;
    data: Prisma.CommunityUpdateInput;
  }): Promise<CommunityModel> {
    try {
      await this.findCommunityOrThrow(params.where);

      return await this.prisma.community.update({
        where: params.where,
        data: params.data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleException('update community', error);
    }
  }

  async deleteCommunity(
    where: Prisma.CommunityWhereUniqueInput,
  ): Promise<CommunityModel> {
    try {
      await this.findCommunityOrThrow(where);

      return await this.prisma.community.delete({
        where,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleException('delete community', error);
    }
  }
}
