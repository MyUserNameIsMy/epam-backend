import { ApiProperty } from '@nestjs/swagger';

export class RegisterClientDto {
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

  @ApiProperty({
    example: 'Amanat',
  })
  company_name: string;

  @ApiProperty({
    example: 'Black street',
  })
  company_address: string;

  @ApiProperty({
    example: '87781694245',
  })
  phone: string;
}
