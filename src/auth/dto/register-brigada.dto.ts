import { ApiProperty } from '@nestjs/swagger';
import { RegisterMemberDto } from './register-member.dto';

export class RegisterBrigadaDto {
  @ApiProperty({
    example: 'x_team',
  })
  team_name: string;

  @ApiProperty({
    example: 'password123@',
  })
  password: string;

  @ApiProperty({
    type: RegisterMemberDto,
  })
  members: RegisterMemberDto[];
}
