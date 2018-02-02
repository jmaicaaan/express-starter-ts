import { Request, Response } from 'express';
import { Body, Get, JsonController, NotFoundError, Param, Req, Res } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from '../../database/repositories/user.repository';

@JsonController()
export class UserController {

  public constructor(
    @OrmRepository() private userRepository: UserRepository
  ) {}

  @Get('/users')
  public async getUsers(@Req() request: Request, @Res() response: Response) {
    const users = await this.userRepository.getUsers({});
    return response.send(users);
  }
}
