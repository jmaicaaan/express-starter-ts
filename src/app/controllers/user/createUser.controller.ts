import { Authorized, Body, JsonController, Post, QueryParam, QueryParams } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../../database/entities/user.entity';
import { RoleRepository } from '../../../database/repositories/role.repository';
import { UserRepository } from '../../../database/repositories/user.repository';

@JsonController('/users')
export class GetUsersController {

  public constructor(
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private roleRepository: RoleRepository
  ) {}

  @Post()
  public async execute(
    @Body() user: User
  ) {
    const role = await this.roleRepository.getRoleByName(user.roles[0].name);
    const data = await this.userRepository.createUser({
      email: user.email,
      password: user.password,
      roles: [role]
    });
    return data;
  }
}
