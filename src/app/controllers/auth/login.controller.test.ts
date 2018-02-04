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
      const data = await server.post('/api/users').send({
        email: 'test@gmail.com',
        password: 'test',
        roles: [{ name: 'admin' }]
      });
      expect(data.body).to.have.property('email', 'test@gmail.com');
    });
    it('should authorized user', async () => {
      const data = await server.post('/api/auth').send({
        email: 'test@gmail.com',
        password: 'test'
      });
      expect(data.body).to.have.property('user');
      expect(data.body).to.have.property('token');
    });
  });
});
