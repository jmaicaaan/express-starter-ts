import { EntityRepository, Repository } from 'typeorm';

import { Inject } from 'typedi';
import { Container } from 'typedi/Container';
import { AccessToken, User } from '../entities';
import { AccessTokenService } from '../services/accessToken.service';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends Repository<AccessToken> {

  public async addAccessToken(user: User): Promise<AccessToken> {
    try {
      let accessTokenService = Container.get(AccessTokenService); // todo: constructor injection
      let token = accessTokenService.createToken();
      let accessToken = new AccessToken(token, user);
      return this.save(accessToken);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

}
