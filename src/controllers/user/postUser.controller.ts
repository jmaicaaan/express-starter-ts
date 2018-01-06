import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../entities';
import { IRole } from '../../enums';
import { RoleMappingRepository, RoleRepository, UserRepository } from '../../repositories';
import { BcryptService } from '../../services';

@Service()
@JsonController('/users')
export class PostUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private roleMappingRepository: RoleMappingRepository,
    @OrmRepository() private roleRepository: RoleRepository,
    private bcryptService: BcryptService
  ) {}

  @Post()
  async execute(
    @Body() data: { user: User, role: IRole }
  ) {
    try {
      data.user.password = await this.bcryptService.hashString(data.user.password);
      const createdUser = await this.userRepository.createUser(data.user);

      // get the role that will be associate to the user
      const role = await this.roleRepository.findOne({ where: { name: data.role } });
      await this.roleMappingRepository.addRoleMapping(createdUser, role);
      return createdUser;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
