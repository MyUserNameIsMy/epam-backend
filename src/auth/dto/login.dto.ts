import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the client',
    example: 'admin@gmail.com',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Password@123',
  })
  @IsNotEmpty()
  password: string;
}
