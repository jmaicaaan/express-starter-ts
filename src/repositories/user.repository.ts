import { Container, Service } from 'typedi';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Role, User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public createUser(user: User): Promise<User> {
    return this.save(user);
  }

  public getUsers(options?: FindManyOptions<User>): Promise<User[]> {
    if (!options) {
      options = {};
    }
    return this.find(options);
  }

  public async deleteUserById(id: number): Promise<void> {
    return this.updateById(id, { enabled: false });
  }

  public async getUserRolesById(id: number): Promise<Role[]> {
    try {
      const queryBuilder = this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roleMapping', 'rm', 'user.id = rm.user.id')
      .innerJoinAndSelect('rm.role', 'r', 'r.id = rm.role.id')
      .where('user.id = :userId', { userId: id });

      const user = await queryBuilder.getOne();

      let roles = [];
      if (user) {
        roles = user.roleMapping.map((r) => r.role);
        return roles;
      }
      throw new Error(`No role associated to userId ${id}`);
    } catch (error) {
      throw error;
    }
  }

  public async getUserByToken(token: string): Promise<User> {
    if (!token) {
      throw new Error('No access token received');
    }
    const queryBuilder = this.createQueryBuilder('user')
      .innerJoinAndSelect('user.accessToken', 'accessToken')
      .where('accessToken.token = :token', { token });

    const user = await queryBuilder.getOne();
    return user;
  }
}
