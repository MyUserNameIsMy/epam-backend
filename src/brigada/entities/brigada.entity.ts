import { RootEntity } from '../../shared/database/entities/root.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { OperatorEntity } from '../../operator/entities/operator.entity';
import { ApplicationPullEntity } from '../../operator/entities/application-pull.entity';
import { MemberEntity } from './member.entity';

@Entity('brigada')
export class BrigadaEntity extends RootEntity {
  @Column({
    nullable: false,
  })
  team_name: string;

  @Column({
    select: false,
  })
  password: string;

  @ManyToOne(() => OperatorEntity, (operator) => operator.brigadas)
  operator: OperatorEntity;

  @OneToMany(
    () => ApplicationPullEntity,
    (application_pull) => application_pull.brigada,
  )
  application_pulls: ApplicationPullEntity[];

  @OneToMany(() => MemberEntity, (member) => member.brigada)
  members: MemberEntity[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
