import { expect } from 'chai';
import { Container } from 'typedi';
import { getCustomRepository } from 'typeorm';

import { Database } from '../database';
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
    const users = await getCustomRepository(UserRepository).getUsers();
    expect(users).to.be.an('array');
  });

  it('should create user', async () => {
    const user = await getCustomRepository(UserRepository).createUser({
      email: 'test',
      password: 'test',
      roles: [{ id: 1, name: 'admin' }]
    });
    expect(user).to.have.property('email', 'test');
    expect(user).to.have.property('password', 'test');
  });
});
