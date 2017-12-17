import { JsonController, Param, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserService } from '../../services/';

@Service()
@JsonController('/users/:id')
export class DeleteUserController {

  constructor(
    @OrmRepository() private userService: UserService
  ) {}

  @Post()
  async execute(
    @Param('id') userId: number
  ) {
    // void 
    await this.userService.deleteUserById(userId);
    return `User with id ${userId} has been deleted`;
  }
}
