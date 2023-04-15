import { ApiProperty } from '@nestjs/swagger';

export class RegisterOperatorDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'Firstname',
  })
  firstname: string;

  @ApiProperty({
    example: 'Lastname',
  })
  lastname: string;

  @ApiProperty({
    example: 'Lastname',
  })
  password: string;
}
