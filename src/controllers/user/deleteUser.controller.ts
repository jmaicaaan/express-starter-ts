import { JsonController, Param, Post } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from '../../repositories';

@JsonController('/users/:id')
export class DeleteUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Post()
  async execute(
    @Param('id') userId: number
  ) {
    try {
      await this.userRepository.deleteUserById(userId);
      return `${userId} has been successfully deleted`;
    } catch (error) {
      throw error;
    }
  }
}
