import { Action, HttpError } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { getCustomRepository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { RoleRepository, UserRepository } from '../../database/repositories';
import { JWTService } from '../../services';

const jwtService = Container.get(JWTService);
const userRepository = Container.get(UserRepository);

export async function authorizationChecker(action: Action, roles: string[]): Promise<boolean> {
  const headers = action.request.headers;
  const token = headers && headers.authorization ? headers.authorization : '';
  const data: any = jwtService.verify(token);
  if (!data) {
    return false;
  }
  if (roles && roles.length) {
    const isAuthorized = data.roles.find((role: any) => roles.indexOf(role.name) > -1) ? true : false;
    if (!isAuthorized) {
      return false;
    }
  }
  return true;
}
