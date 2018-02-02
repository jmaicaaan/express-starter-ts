import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column('text')
  public name?: string;
}
