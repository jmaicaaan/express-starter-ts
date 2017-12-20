import { Get, JsonController, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { Intro } from '../../middlewares';

@Service()
@JsonController()
@UseBefore(Intro)
export class IntroController {

  @Get('/')
  async execute() {
    return 'Hello World!';
  }
}
