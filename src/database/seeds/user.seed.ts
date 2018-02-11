import { Chance} from 'chance';
import { Service } from 'typedi';
import { Connection, EntityManager, getRepository, QueryRunner, Repository } from 'typeorm';
import { SeedInterface } from '../../libs/seed.interface';
import { BcryptService } from '../../services/brcrypt.service';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Service()
export class UserSeed implements SeedInterface {

  private bcryptService: BcryptService;

  public constructor(bcryptService: BcryptService) {
    this.bcryptService = bcryptService;
  }

  public async seed(connection: Connection): Promise<any> {
    const chance = new Chance();
    const data: User[] = [];
    let i = 0;
    while (i < 100) {
      data.push({
        email: chance.email({domain: 'example.com'}),
        password: await this.bcryptService.hashString('test'),
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
    await userRepository.save(data);
  }
}
