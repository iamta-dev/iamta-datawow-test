import { Controller, Get, Logger } from '@nestjs/common';
import { CommunityService } from './community.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommunitySwagger } from './dto/community.swagger';
import { Community as CommunityModel } from '@prisma/client';
import { SwaggerBaseResponse } from '../../lib/swagger/base-swagger';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
  private readonly logger = new Logger(CommunityController.name);

  constructor(private readonly communityService: CommunityService) {}

  @Get()
  @ApiOperation({
    summary: CommunitySwagger.getCommunities.summary,
  })
  @ApiResponse(CommunitySwagger.getCommunities[200])
  @ApiResponse(SwaggerBaseResponse[500])
  async getCommunities(): Promise<CommunityModel[]> {
    try {
      const communities = await this.communityService.getCommunities({});
      this.logger.log('Communities fetched successfully');
      return communities;
    } catch (error) {
      this.logger.error('Failed to fetch communities', error.stack);
      throw error;
    }
  }
}
