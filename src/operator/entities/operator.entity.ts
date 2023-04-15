import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { RootEntity } from '../../database/entities/root.entity';
import * as bcrypt from 'bcrypt';
import { BrigadaEntity } from '../../brigada/entities/brigada.entity';

@Entity('operator')
export class OperatorEntity extends RootEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'boolean',
  })
  isAdmin: boolean;

  @OneToMany(() => BrigadaEntity, (brigada) => brigada.operator)
  brigadas: BrigadaEntity[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
