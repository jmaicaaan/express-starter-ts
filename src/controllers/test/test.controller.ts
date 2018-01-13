import { JsonController, Get } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/test')
export class TestController {

  constructor() { }

  @Get('/')
  execute(): string {
    return 'Hello World, Typescript!';
  }
}
