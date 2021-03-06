import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {

  constructor(name: string) {
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column('text')
  public name: string;

}
