import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../entities';

@Entity()
export class AccessToken {

  constructor(token: string, user: User) {
    this.token = token;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text')
  public token: string;

  @Column('text', { default: '604800' }) // 1 week default
  public ttl: string;

  @Column('timestamp',  { default: new Date() })
  public created: Date;

  @ManyToOne((type) => User, (user) => user.accessToken)
  public user: User;
}
