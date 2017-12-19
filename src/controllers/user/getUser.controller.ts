import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../../repositories';

@Service()
@JsonController('/users')
export class GetUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Get()
  async execute() {
    const users = await this.userRepository.getUsers();
    return users;
  }
}
