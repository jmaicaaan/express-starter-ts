import { Action, HttpError } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { getCustomRepository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { RoleRepository, UserRepository } from '../repositories';

export async function authorizationChecker(action: Action, roles: string[]): Promise<boolean> {

  try {
    const headers = action.request.headers;
    const token = headers && headers.authorization ? headers.authorization : '';

    if (roles && roles.length) {
      // check if we can see if the user's token is authorized

      const userRepository = getCustomRepository(UserRepository);
      const roleRepository = getCustomRepository(RoleRepository);

      const user = await userRepository.getUserByToken(token);
      const userRoles = await userRepository.getUserRolesById(user.id);

      const isAuthorized = userRoles.find((role) => roles.indexOf(role.name) > -1) ? true : false;

      return isAuthorized;
    } else {
      // check only if token is existing in the request
      if (token) {
        return true;
      }
      return false;
    }
  } catch (error) {
    throw new HttpError(403, error.message);
  }
}
