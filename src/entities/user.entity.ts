import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';

import { AccessToken, RoleMapping } from '../entities';

@Entity()
export class User {

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;

  @Column('boolean', { default: true })
  public enabled: boolean;

  @Column('timestamp', { default: new Date() })
  public created: Date;

  @OneToMany((type) => AccessToken, (accessToken) => accessToken.user)
  public accessToken: AccessToken[];

  @OneToMany((type) => RoleMapping, (roleMapping) => roleMapping.user)
  public roleMapping: RoleMapping[];
}
