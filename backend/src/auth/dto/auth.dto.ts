import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user1',
    required: true,
  })
  @IsNotEmpty()
  username: string;
}
