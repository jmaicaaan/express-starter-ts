import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class IntroController {

  @Get('/')
  async execute() {
    return 'Hello World!';
  }
}
