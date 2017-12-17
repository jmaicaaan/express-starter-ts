import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserService } from '../../services/';

@Service()
@JsonController('/users')
export class GetUserController {

  constructor(
    @OrmRepository() private userService: UserService
  ) {}

  @Get()
  async execute() {
    const users = await this.userService.getUsers();
    return users;
  }
}
