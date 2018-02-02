import { Container } from 'typedi';
import { getCustomRepository } from 'typeorm';

import { Database } from '../../services/database.service';
import { UserRepository } from './user.repository';

describe('unit test: user repository', async () => {

  const db = Container.get(Database);

  before(async () => {
    await db.connect();
    await db.reset();
  });
  after(async () => {
    await db.disconnect();
  });

  it('should return the list of users', async () => {
    await getCustomRepository(UserRepository).getUsers();
  });
});
