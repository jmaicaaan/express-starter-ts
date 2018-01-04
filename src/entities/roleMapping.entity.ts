import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role, User } from '../entities';

@Entity()
export class RoleMapping {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.roleMapping)
  role: Role;

  @ManyToOne((type) => User, (user) => user.roleMapping)
  user: User;
}
