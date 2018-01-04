import { Service } from 'typedi';
import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
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
}
