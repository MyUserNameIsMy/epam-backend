import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RootEntity } from '../../database/entities/root.entity';
import { BrigadaEntity } from '../../brigada/entities/brigada.entity';
import { ApplicationStatus } from '../../shared/enum/application-status.enum';

@Entity('application_pull')
export class ApplicationPullEntity extends RootEntity {
  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @ManyToOne(() => BrigadaEntity, (brigada) => brigada.application_pulls)
  brigada: BrigadaEntity;
}
