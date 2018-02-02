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
  public async getUsers() {
    const users = await this.userRepository.getUsers({});
    return users;
  }

  @Get('/users/:id')
  public async getUserById(@Param('id') id: number) {
    const user = await this.userRepository.getUserById(id);
    return user;
  }
}
