import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'New Post Title',
    description: 'Title of the post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Post details go here...',
    description: 'Details of the post',
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  // @ApiProperty({
  //   example: 1,
  //   description: 'ID of the user who created the post',
  // })
  // @IsInt()
  // @IsNotEmpty()
  // userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the community this post belongs to',
  })
  @IsInt()
  @IsNotEmpty()
  communityId: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class PostQueryDto {
  @ApiProperty({
    description: 'Search for titles Case-insensitive',
    required: false,
    example: 'healthy',
  })
  @IsOptional()
  @IsString()
  fsearch?: string;
}
