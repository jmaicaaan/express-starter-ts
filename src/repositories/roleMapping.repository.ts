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
        const savedRoleMapping = await this.save(roleMapping);
        delete savedRoleMapping.user; // remove the user property to avoid circular
        return savedRoleMapping;
      }
    } catch (error) {
      throw error;
    }
  }
}
