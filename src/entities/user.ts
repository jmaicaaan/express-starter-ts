import { Column, Entity, PrimaryGeneratedColumn  } from 'typeorm';

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

  @Column('timestamp')
  created: Date;
}
