import { expect, request, use } from 'chai';
import { Container } from 'typedi';
use(require('chai-http'));

import { App } from '../../services/app.service';
import { Database } from '../../services/database.service';

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

  it('should get all list of users', async () => {
    await server.get('/api/users');
  });
});
