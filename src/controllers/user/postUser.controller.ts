import { JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entities/user';
import { UserService } from '../../services/';

@Service()
@JsonController('/users')
export class PostUserController {

  constructor(
    @OrmRepository() private userService: UserService
  ) {}

  @Post()
  async execute() {
    const user = new User();
    user.email = 'jsantos@isbx.com';
    user.password = 'password123';
    user.created = new Date();

    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }
}
