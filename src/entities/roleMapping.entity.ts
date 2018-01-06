import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role, User } from '../entities';

@Entity()
export class RoleMapping {

  constructor(role: Role, user: User) {
    this.role = role;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne((type) => Role, (role) => role.roleMapping)
  public role: Role;

  @ManyToOne((type) => User, (user) => user.roleMapping)
  public user: User;
}
