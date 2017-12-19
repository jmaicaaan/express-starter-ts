import { JsonController, Param, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from 'repositories';

@Service()
@JsonController('/users/:id')
export class DeleteUserController {

  constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Post()
  async execute(
    @Param('id') userId: number
  ) {
    // void
    await this.userRepository.deleteUserById(userId);
    return `User with id ${userId} has been deleted`;
  }
}
