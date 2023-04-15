import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { RootEntity } from '../../shared/database/entities/root.entity';
import { ApplicationPullEntity } from '../../operator/entities/application-pull.entity';
import { ClientEntity } from '../../client/entities/client.entity';
import { ApplicationStatusEnum } from '../../shared/enum/application-status.enum';
import { WorkTypeEnum } from '../../shared/enum/work-type.enum';

@Entity('application')
export class ApplicationEntity extends RootEntity {
  @Column({
    nullable: false,
    default: '',
    type: 'text',
  })
  comment: string;

  @Column({
    nullable: false,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatusEnum,
    default: ApplicationStatusEnum.PENDING,
  })
  status: ApplicationStatusEnum;

  @Column({
    type: 'enum',
    enum: WorkTypeEnum,
  })
  work_type: WorkTypeEnum;

  @OneToMany(() => ClientEntity, (client) => client.applications)
  client: ClientEntity;

  @OneToOne(() => ApplicationPullEntity)
  @JoinColumn()
  application_pull: ApplicationPullEntity;
}
