import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn  } from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class User {

  constructor(email: string, password: string, roles: Role[]) {
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;

  @ManyToMany((type) => Role)
  @JoinTable({
    name: 'user_roles'
  })
  public roles: Role[];

  @Column('boolean', { default: true })
  public enabled?: boolean;

  @Column('timestamp', { default: new Date() })
  public created?: Date;

}
