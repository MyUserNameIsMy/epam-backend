import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DataDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'FIO',
    example: 'Aman Bala Amanuly',
  })
  @IsNotEmpty()
  fio: string;

  @ApiProperty({
    description: 'Password',
    example: 'kz777top',
  })
  @IsNotEmpty()
  password: string;
}
