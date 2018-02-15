import { Authorized, Body, JsonController, Post, QueryParam, QueryParams } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../../database/entities';
import { RoleRepository, UserRepository } from '../../../database/repositories';
import { BcryptService } from '../../../services';

@JsonController('/users')
export class GetUsersController {

  constructor(
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private roleRepository: RoleRepository,
    private bcryptService: BcryptService
  ) {}

  @Post()
  public async execute(
    @Body() user: User
  ) {
    const role = await this.roleRepository.getRoleByName(user.roles[0].name);
    if (!role) {
      throw new Error(`Cannot create user, cannot get role: ${user.roles[0].name}`);
    }
    const data = await this.userRepository.createUser({
      email: user.email,
      password: await this.bcryptService.hashString(user.password),
      roles: [role]
    });
    return data;
  }
}
