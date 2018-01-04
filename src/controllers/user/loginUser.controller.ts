import { Body, JsonController, Post } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../entities';
import { AccessTokenRepository, UserRepository } from '../../repositories';

@JsonController('/login')
export class LoginUserController {
  constructor (
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private accessTokenRepository: AccessTokenRepository
  ) {}

  @Post()
  async execute (
    @Body() user: User
  ) {
    try {
      // need to encrypt this one
      const currentUser = await this.userRepository.findOne({ where: {
        email: user.email, password: user.password, enabled: true } });
      if (currentUser) {
        const accessToken = await this.accessTokenRepository.addAccessToken(currentUser);
        return accessToken;
      }
      throw new Error('Invalid login');
    } catch (error) {
      throw error;
    }
  }
}
