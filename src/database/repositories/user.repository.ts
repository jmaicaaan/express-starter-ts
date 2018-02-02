import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async getUsers(options?: FindManyOptions<User>): Promise<User[]> {
    if (!options) {
      options = {};
    }
    return this.find(options);
  }

  public async getUserById(id: number): Promise<User> {
    return this.findOneById(id);
  }

  public async createUser(user: User): Promise<User> {
    return this.save(user);
  }
}
