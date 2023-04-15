import { ApiProperty } from '@nestjs/swagger';

export class RegisterMemberDto {
  @ApiProperty({
    example: 'Firstname',
  })
  firstname: string;

  @ApiProperty({
    example: 'Lastname',
  })
  lastname: string;
}
