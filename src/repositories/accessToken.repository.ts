import { Container, Inject } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { AccessToken, User } from '../entities';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends Repository<AccessToken> {

  public async addAccessToken(token: string, user: User): Promise<AccessToken> {
    try {
      let accessToken = new AccessToken(token, user);
      return this.save(accessToken);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

}
