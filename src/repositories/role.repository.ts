import { EntityRepository, Repository } from 'typeorm';

import { Role } from '../entities';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

  public async getUserRolesById(id: number): Promise<Role[]> {

    const queryBuilder = this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roleMapping', 'roleMapping')
      .innerJoinAndSelect('roleMapping.role', 'role')
      .where('user.id = :userId', { userId: id });

    const user = await queryBuilder.getOne();
    let roles = [];
    if (user) {
      roles = user.roleMapping.map((r) => r.role);
    }
    return roles;
  }
}
