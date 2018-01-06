import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../entities';

@Entity()
export class AccessToken {

  constructor(token: string, user: User) {
    this.token = token;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  token: string;

  @Column('text', { default: '604800' }) // 1 week default
  ttl: string;

  @Column('timestamp',  { default: new Date() })
  created: Date;

  @ManyToOne((type) => User, (user) => user.accessToken)
  user: User;
}
