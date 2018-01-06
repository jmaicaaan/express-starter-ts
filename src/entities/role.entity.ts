import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleMapping } from '../entities';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToMany((type) => RoleMapping, (roleMapping) => roleMapping.role)
  roleMapping: RoleMapping[];
}
