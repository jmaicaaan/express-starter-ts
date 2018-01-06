import { Service } from 'typedi';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Container } from 'typedi/Container';
import { Role, RoleMapping, User } from '../entities';
import { IRole } from '../enums';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public createUser(user: User): Promise<User> {
    // const roleMapping: RoleMapping = {
    //   role: IRole.User,
    //   user
    // }
    return this.save(user);
  }

  public getUsers(options?: FindManyOptions<User>): Promise<User[]> {
    if (!options) {
      options = {};
    }
    return this.find(options);
  }

  public async deleteUserById(id: number): Promise<void> {
    return await this.updateById(id, { enabled: false });
  }

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

  public async getUserByToken(token: string): Promise<User> {
    const queryBuilder = this.createQueryBuilder('user')
      .innerJoinAndSelect('user.accessToken', 'accessToken')
      .where('accessToken.token = :token', { token });

    const user = await queryBuilder.getOne();
    return user;
  }
}
