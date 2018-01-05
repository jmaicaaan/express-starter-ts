import { Body, JsonController, Post } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../entities';
import { AccessTokenRepository, UserRepository } from '../../repositories';
import { BcryptService } from '../../services';

@JsonController('/login')
export class LoginUserController {
  constructor (
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private accessTokenRepository: AccessTokenRepository,
    private bcryptService: BcryptService
  ) {}

  @Post()
  async execute (
    @Body() user: User
  ) {
    try {
      // need to encrypt this one
      const currentUser = await this.userRepository.findOne({
        where: {
          email: user.email, enabled: true
        }
      });
      const password = await this.bcryptService.compareHash(user.password, currentUser.password)
      if (!currentUser) { throw new Error('Invalid login'); }
      if (!password) { throw new Error('Invalid login'); }
      const accessToken = await this.accessTokenRepository.addAccessToken(currentUser);
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}
