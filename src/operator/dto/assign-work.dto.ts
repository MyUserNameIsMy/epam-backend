import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class AssignWorkDto {
  @ApiProperty({
    example: 1,
    description: 'Brigada id',
  })
  brigada_id: number;

  @ApiProperty({
    example: 1,
    description: 'Application Pull id',
  })
  application_pull_id: number;
}
