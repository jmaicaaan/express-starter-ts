import * as supertest from 'supertest';

import { expect, use } from 'chai';
import { Container } from 'typedi';

import { Database } from '../../../database/database';
import { App } from '../../app';

describe('e2e test: Create User Controller', () => {

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

  describe('create', () => {
    it('should create user with role', async () => {
      await server.post('/api/users').send({
        email: 'test',
        password: 'test',
        roles: [{ name: 'admin' }]
      });
    });
  });
});
