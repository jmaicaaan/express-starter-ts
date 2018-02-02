import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn  } from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column('text')
  public email?: string;

  @Column('text')
  public password?: string;

  @Column('boolean', { default: true })
  public enabled?: boolean;

  @Column('timestamp', { default: new Date() })
  public created?: Date;

  @ManyToMany((type) => Role)
  @JoinTable({
    name: 'user_roles'
  })
  public roles?: Role[];
}
