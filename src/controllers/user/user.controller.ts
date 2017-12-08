import { JsonController, Get, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/users')
export class UserController {

  constructor() { }

  @Get()
  execute() {
    return 'This is the user controller';
  }
}
