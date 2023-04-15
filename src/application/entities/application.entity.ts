import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { RootEntity } from '../../database/entities/root.entity';
import { ApplicationPullEntity } from '../../operator/entities/application-pull.entity';
import { ClientEntity } from '../../client/entities/client.entity';
import { ApplicationStatus } from '../../shared/enum/application-status.enum';

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
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @OneToMany(() => ClientEntity, (client) => client.applications)
  client: ClientEntity;

  @OneToOne(() => ApplicationPullEntity)
  @JoinColumn()
  application_pull: ApplicationPullEntity;
}
