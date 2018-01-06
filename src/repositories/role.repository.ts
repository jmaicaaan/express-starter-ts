import { EntityRepository, Repository } from 'typeorm';

import { Role, RoleMapping } from '../entities';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
