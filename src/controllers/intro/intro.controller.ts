import { JsonController, Get } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class IntroController {

  constructor() {}

  @Get('/')
  execute() {
    return 'Hello World, Typescript!';
  }
}
