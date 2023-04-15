import { Column, Entity, ManyToOne } from 'typeorm';
import { RootEntity } from '../../shared/database/entities/root.entity';
import { BrigadaEntity } from '../../brigada/entities/brigada.entity';
import { ApplicationStatusEnum } from '../../shared/enum/application-status.enum';
import { OperatorEntity } from './operator.entity';

@Entity('application_pull')
export class ApplicationPullEntity extends RootEntity {
  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatusEnum,
    default: ApplicationStatusEnum.PENDING,
  })
  operator_status: ApplicationStatusEnum;

  @Column({
    type: 'enum',
    enum: ApplicationStatusEnum,
    default: ApplicationStatusEnum.PENDING,
  })
  brigada_status: ApplicationStatusEnum;

  @ManyToOne(() => BrigadaEntity, (brigada) => brigada.application_pulls)
  brigada: BrigadaEntity;

  @ManyToOne(() => OperatorEntity, (operator) => operator.application_pulls)
  operator: OperatorEntity;
}
