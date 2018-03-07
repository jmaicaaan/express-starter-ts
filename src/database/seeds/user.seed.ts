import { Chance} from 'chance';
import { Container, Service } from 'typedi';
import { Connection, EntityManager, getRepository, QueryRunner, Repository } from 'typeorm';

import { User } from '../../entities';
import { ISeed } from '../../libs/seed.interface';
import { UserRepository } from '../../repositories';
import { BcryptService } from '../../services';

@Service()
export class UserSeed implements ISeed {

  public async seed(connection: Connection): Promise<void> {
    /**
     * This is a test seed only
     */

    const bcryptService = Container.get(BcryptService);

    const chance = new Chance();
    const data: User[] = [];
    let i = 0;
    while (i < 10) {
      data.push({
        email: chance.email({domain: 'example.com'}),
        password: await bcryptService.hashString('test'),
        roles: [{ id: 1, name: 'admin' }]
      });
      i++;
    }
    const queryRunner = connection.createQueryRunner();
    const entityManager = connection.createEntityManager();
    const userRepository = connection.getCustomRepository(UserRepository);
    await queryRunner.insert('user', {
      email: `test${Date.now()}`,
      password: `test${Date.now()}`
    });
    await userRepository.save([
      {
        email: `test${Date.now()}`,
        password: `test${Date.now()}`,
        roles: [{ id: 1, name: 'Admin' }]
      },
      {
        email: `test${Date.now()}`,
        password: `test${Date.now()}`,
        roles: [{ id: 1, name: 'Admin' }]
      }
    ]);
    await userRepository.save(data);
  }
}
