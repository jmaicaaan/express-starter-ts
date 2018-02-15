import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleMapping } from '../entities';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text')
  public name: string;

  @OneToMany((type) => RoleMapping, (roleMapping) => roleMapping.role)
  public roleMapping: RoleMapping[];
}
