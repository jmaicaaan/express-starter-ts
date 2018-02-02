import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';

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
}
