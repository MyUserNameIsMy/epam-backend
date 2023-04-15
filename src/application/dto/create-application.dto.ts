import { ApiProperty } from '@nestjs/swagger';
import { WorkTypeEnum } from '../../shared/enum/work-type.enum';

export class CreateApplicationDto {
  @ApiProperty({
    example:
      'Jaipur has extreme climate with hot and humid summers particularly from April to July. The temperature reaches 45oC. And during the winter months, the days are fairly sunny and pleasant, and the nights are quite cold as the temperature goes below zero.',
  })
  comment: string;

  @ApiProperty({
    example: 'Robert Robertson, 1234',
  })
  address: string;

  @ApiProperty({
    example: WorkTypeEnum.COLLECT_GARBAGE,
  })
  work_type: WorkTypeEnum;
}
