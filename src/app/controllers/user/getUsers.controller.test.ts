import * as supertest from 'supertest';

import { expect, use } from 'chai';
import { Container } from 'typedi';

import { Database } from '../../../database/database';
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

  describe('get', async () => {
    it('should get all list of users', async () => {
      const data = await server.get('/api/users');
      expect(data.body).to.be.an('array');
    });
  });
});
