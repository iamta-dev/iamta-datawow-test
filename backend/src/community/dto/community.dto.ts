import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCommunityDto {
  @ApiProperty({
    example: 'Healthy Community',
    description: 'The name of the community',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}
