import { expect, request, use } from 'chai';
import { Container } from 'typedi';
use(require('chai-http'));

import { Database } from '../../../database/database';
import { App } from '../../app';

describe('e2e test: user controller', async () => {

  const app = Container.get(App).getApp();
  const db = Container.get(Database);
  const server = request(app);

  before(async () => {
    await db.connect();
    await db.reset();
  });
  after(async () => {
    await db.disconnect();
  });

  it('should create user with role', async () => {
    await server.post('/api/users').send({
      email: 'test',
      password: 'test',
      roles: [{ name: 'admin' }]
    });
  });
});
