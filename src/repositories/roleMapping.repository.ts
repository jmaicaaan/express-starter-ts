import { Container } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Role, RoleMapping, User } from '../entities';
import { RoleRepository } from '../repositories';

@EntityRepository(RoleMapping)
export class RoleMappingRepository extends Repository<RoleMapping> {

  public async addRoleMapping(user: User, role: Role): Promise<RoleMapping> {
    try {
      if (role) {
        const roleMapping = new RoleMapping(role, user);
        return this.save(roleMapping);
      }
    } catch (error) {
      throw error;
    }
  }
}
