import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This is a comment',
    description: 'The content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  //   @ApiProperty({
  //     example: 1,
  //     description: 'The ID of the user who created the comment',
  //   })
  //   @IsInt()
  //   @IsNotEmpty()
  //   userId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the post this comment belongs to',
  })
  @IsInt()
  @IsNotEmpty()
  postId: number;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
