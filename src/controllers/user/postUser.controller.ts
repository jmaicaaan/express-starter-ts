import { JsonController, Post, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entities';
import { UserRepository } from '../../repositories';

@Service()
@JsonController('/users')
export class PostUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Post()
  async execute(
    @Body() user: User
  ) {
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
