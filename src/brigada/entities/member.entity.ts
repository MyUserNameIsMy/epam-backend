import { Column, Entity, ManyToOne } from 'typeorm';
import { RootEntity } from '../../shared/database/entities/root.entity';
import { BrigadaEntity } from './brigada.entity';

@Entity('member')
export class MemberEntity extends RootEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @ManyToOne(() => BrigadaEntity, (brigada) => brigada.members)
  brigada: BrigadaEntity;
}
