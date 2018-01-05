import { EntityRepository, Repository } from 'typeorm';

import { Inject } from 'typedi';
import { Container } from 'typedi/Container';
import { AccessToken, User } from '../entities';
import { CryptoService } from '../services';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends Repository<AccessToken> {

  public async addAccessToken(user: User): Promise<AccessToken> {
    try {
      let accessTokenService = Container.get(CryptoService); // todo: constructor injection
      let token = accessTokenService.createToken();
      let accessToken = new AccessToken(token, user);
      return this.save(accessToken);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

}
