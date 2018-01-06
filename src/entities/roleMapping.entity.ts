import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role, User } from '../entities';

@Entity()
export class RoleMapping {

  constructor(role: Role, user: User) {
    this.role = role;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => Role, (role) => role.roleMapping)
  role: Role;

  @ManyToOne((type) => User, (user) => user.roleMapping)
  user: User;
}
