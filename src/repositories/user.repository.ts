import { Service } from 'typedi';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Container } from 'typedi/Container';
import { User } from '../entities';

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
    return await this.updateById(id, { enabled: false });
  }

  public async getUserByToken(token: string): Promise<User> {
    const queryBuilder = this.createQueryBuilder('user')
      .innerJoinAndSelect('user.accessToken', 'accessToken')
      .where('accessToken.token = :token', { token });

    const user = await queryBuilder.getOne();
    return user;
  }
}
