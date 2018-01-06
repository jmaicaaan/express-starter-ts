import { Action } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { getCustomRepository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { RoleRepository, UserRepository } from '../repositories';

export async function authorizationChecker(action: Action, roles: string[]): Promise<boolean> {

  try {
    if (!roles && !roles.length) {
      return true;
    }
    const headers = action.request.headers;
    const token = headers && headers.authorization ? headers.authorization : '';
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);
    const user = await userRepository.getUserByToken(token);
    if (user) {
      const userRoles = await roleRepository.getUserRolesById(user.id);
      const isAuthorized = userRoles.find((role) => roles.indexOf(role.name) > -1);
      
      console.log('user', user);
      console.log('roles', roles);
      console.log('isAuthorized', isAuthorized);
    }

    return true;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
