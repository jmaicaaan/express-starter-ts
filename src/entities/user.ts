import { BaseEntity, Column, Entity, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('boolean')
  enabled: boolean;

  @Column('timestamp')
  created: Date;
}
