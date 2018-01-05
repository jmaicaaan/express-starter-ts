import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../entities';
import { UserRepository } from '../../repositories';
import { BcryptService } from '../../services/';

@Service()
@JsonController('/users')
export class PostUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository,
    private bcryptService: BcryptService
  ) {}

  @Post()
  async execute(
    @Body() user: User
  ) {
    user.password = await this.bcryptService.hashString(user.password);
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
