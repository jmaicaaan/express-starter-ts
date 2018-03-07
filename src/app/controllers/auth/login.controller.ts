import { Authorized, Body, JsonController, Post, QueryParam, QueryParams } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../../database/entities';
import { UserRepository } from '../../../database/repositories';
import { BcryptService, JWTService } from '../../../services';

@JsonController('/auth')
export class LoginController {

  public constructor(
    @OrmRepository() private userRepository: UserRepository,
    private bcryptService: BcryptService,
    private jwtService: JWTService
  ) {}

  @Post()
  public async execute(
    @Body() user: User
  ) {
    const data = await this.userRepository.getUserByEmail(user.email);
    if (!data) {
      throw new Error('Login failed');
    }
    const password = await this.bcryptService.compareHash(user.password, data.password);
    if (data && password) {
      const token = this.jwtService.sign({
        id: data.id,
        email: data.email,
        roles: data.roles
      });
      return { user: data, token };
    }
    throw new Error('Login failed');
  }
}
