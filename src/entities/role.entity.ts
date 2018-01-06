import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleMapping } from '../entities';

import { IRole } from 'enums';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: IRole;

  @OneToMany((type) => RoleMapping, (roleMapping) => roleMapping.role)
  roleMapping: RoleMapping[];
}
