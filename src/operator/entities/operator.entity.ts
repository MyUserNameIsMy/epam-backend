import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { RootEntity } from '../../shared/database/entities/root.entity';
import * as bcrypt from 'bcrypt';
import { BrigadaEntity } from '../../brigada/entities/brigada.entity';
import { ApplicationPullEntity } from './application-pull.entity';

@Entity('operator')
export class OperatorEntity extends RootEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => BrigadaEntity, (brigada) => brigada.operator)
  brigadas: BrigadaEntity[];

  @OneToMany(
    () => ApplicationPullEntity,
    (application_pull) => application_pull.operator,
  )
  application_pulls: ApplicationPullEntity[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
