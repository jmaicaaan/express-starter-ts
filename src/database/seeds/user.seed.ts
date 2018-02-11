import { Service } from 'typedi';
import { Connection, EntityManager, getRepository, QueryRunner, Repository } from 'typeorm';
import { SeedInterface } from '../../libs/seed.interface';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Service()
export class UserSeed implements SeedInterface {

  public async seed(connection: Connection): Promise<any> {
    const queryRunner = connection.createQueryRunner();
    const entityManager = connection.createEntityManager();
    const userRepository = connection.getCustomRepository(UserRepository);
    await queryRunner.insert('user', {
      email: `test${Date.now()}`,
      password: `test${Date.now()}`
    });
    const user = new User();
    user.email = `test${Date.now()}`;
    user.password = `test${Date.now()}`;
    user.roles = [{ id: 1, name: 'admin' }];
    await entityManager.save(user);
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
  }
}
