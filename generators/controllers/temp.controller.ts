import { JsonController, Get } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/<%= name %>')
export class <%= upCaseName %>Controller {

  constructor() { }

  @Get('/')
  execute(): string {
    return 'Hello World, Typescript!';
  }
}
