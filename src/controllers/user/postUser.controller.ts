import { JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from 'entities';
import { UserRepository } from 'repositories';

@Service()
@JsonController('/users')
export class PostUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Post()
  async execute() {
    const user = new User();
    user.email = 'jsantos@isbx.com';
    user.password = 'password123';
    user.created = new Date();

    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
