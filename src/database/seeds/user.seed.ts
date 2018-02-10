import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Service()
export class UserSeed {

  private userRepository: Repository<User> = getRepository(User);

  public async seed() {
    await this.userRepository.save([
      {
        email: 'test',
        password: 'test',
        roles: [{ id: 1, name: 'admin' }]
      }
    ]);
  }
}
