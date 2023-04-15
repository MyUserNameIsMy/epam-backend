import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { RootEntity } from '../../database/entities/root.entity';
import * as bcrypt from 'bcrypt';
import { ApplicationEntity } from '../../application/entities/application.entity';

@Entity('client')
export class ClientEntity extends RootEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  middle: string;

  @Column()
  company_name: string;

  @Column()
  company_address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ApplicationEntity, (application) => application.client)
  applications: ApplicationEntity[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
