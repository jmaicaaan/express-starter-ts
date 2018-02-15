import { Authorized, Get, JsonController, QueryParam, QueryParams } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from '../../../database/repositories/user.repository';

@JsonController('/users')
export class GetUsersController {

  public constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Get()
  public async execute(
    @QueryParams() query: any
  ) {
    const users = await this.userRepository.getUsers(query.options);
    return users;
  }
}
