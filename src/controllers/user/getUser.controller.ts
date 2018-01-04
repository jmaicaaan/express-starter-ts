import { Get, JsonController, QueryParam, QueryParams } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from '../../repositories';

@JsonController('/users')
export class GetUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Get()
  async execute(
    @QueryParams() query: any
  ) {
    const users = await this.userRepository.getUsers(query.options);
    return users;
  }
}
