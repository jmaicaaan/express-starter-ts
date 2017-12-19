import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class AccessToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  ttl: Date;

  @Column('timestamp')
  created: Date;

  @ManyToOne((type) => User, (user) => user.accessToken)
  user: User;
}
