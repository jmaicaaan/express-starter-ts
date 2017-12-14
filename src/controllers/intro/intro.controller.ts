import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { User } from '../../entities/user';

@Service()
@JsonController()
export class IntroController {

  constructor() {
    // do nothing
   }

  @Get('/')
  async execute() {
    const users = await User.find();
    return users;
  }
}
