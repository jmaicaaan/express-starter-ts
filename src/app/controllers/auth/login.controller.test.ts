import * as supertest from 'supertest';

import { expect, use } from 'chai';
import { Container } from 'typedi';

import { Database } from '../../../database/database';
import { App } from '../../app';

describe('e2e test: auth controller', async () => {

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

  describe('login', async () => {
    before(async () => {
      const response = await server.post('/api/users').send({
        email: 'test@gmail.com',
        password: 'test',
        roles: [{ name: 'admin' }]
      });
      expect(response.body).to.have.property('email', 'test@gmail.com');
    });
    it('should authorized user', async () => {
      const response = await server.post('/api/auth').send({
        email: 'test@gmail.com',
        password: 'test'
      });
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });
  });
});
