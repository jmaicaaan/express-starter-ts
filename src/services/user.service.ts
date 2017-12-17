import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../entities/user';

@Service()
@EntityRepository(User)
export class UserService extends Repository<User> {

  public createUser(user: User): Promise<User> {
    return this.save(user);
  }

  public getUsers(): Promise<User[]> {
    return this.find();
  }

  public deleteUserById(id?: number, user?: User): Promise<void> {
    return this.deleteById(id || user.id);
  }
}
