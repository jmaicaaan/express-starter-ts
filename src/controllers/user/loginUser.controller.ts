import { Body, JsonController, Post } from 'routing-controllers';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../entities';
import { AccessTokenRepository, UserRepository } from '../../repositories';
import { BcryptService, CryptoService } from '../../services';

@JsonController('/login')
export class LoginUserController {

  constructor (
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private accessTokenRepository: AccessTokenRepository,
    private bcryptService: BcryptService,
    private cryptoService: CryptoService
  ) {}

  @Post()
  async execute (
    @Body() user: User
  ) {
    try {
      const currentUser = await this.userRepository.findOne({
        where: {
          email: user.email,
          enabled: true
        }
      });
      const password = await this.bcryptService.compareHash(user.password, currentUser.password)
      if (currentUser && password) {
        const token = await this.cryptoService.createToken();
        const accessToken = await this.accessTokenRepository.addAccessToken(token, currentUser);
        return accessToken;
      }
      throw new Error('Invalid login');
    } catch (error) {
      throw error;
    }
  }
}
