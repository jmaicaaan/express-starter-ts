import * as supertest from 'supertest';

import { expect, use } from 'chai';
import { Container } from 'typedi';

import { Database } from '../../../database/database';
import { User } from '../../../database/entities/user.entity';
import { App } from '../../app';

describe('e2e test: user controller', async () => {

  const app = Container.get(App).getApp();
  const db = Container.get(Database);
  const server = supertest(app);

  before(async () => {
    await db.connect();
    await db.reset();
  });
  after(async () => {
    await db.disconnect();
  });

  describe('delete', async () => {
    let adminToken: any;
    let response: any;
    let userToBeDeleted: any;
    const loginUser: User = {
      email: `test${Date.now()}@gmail.com`,
      password: 'test',
      roles: [{ id: 1, name: 'admin' }]
    };
    const user: User = {
      email: `test${Date.now()}@gmail.com`,
      password: 'test',
      roles: [{ id: 1, name: 'admin' }]
    };
    before(async () => {
      await server.post('/api/users').send(loginUser);
      response = await server.post('/api/users').send(user);
      userToBeDeleted = response.body;
      response = await server.post('/api/auth').send({
        email: loginUser.email,
        password: loginUser.password
      });
      adminToken = response.body.token;
    });
    it('should delete user', async () => {
     response = await server
      .put(`/api/users/${userToBeDeleted.id}`)
      .set('Authorization', adminToken);
    });
  });
});
