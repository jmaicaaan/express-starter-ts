import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';

import { AccessToken, RoleMapping } from '../entities';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  enabled: boolean;

  @Column('timestamp', { default: new Date() })
  created: Date;

  @OneToMany((type) => AccessToken, (accessToken) => accessToken.user)
  accessToken: AccessToken[];

  @OneToMany((type) => RoleMapping, (roleMapping) => roleMapping.user)
  roleMapping: RoleMapping[];
}
