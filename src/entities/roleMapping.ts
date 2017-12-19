import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role';
import { User } from './user';

@Entity()
export class RoleMapping {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.roleMapping)
  role: Role;

  @ManyToOne((type) => User, (user) => user.roleMapping)
  user: User;
}
