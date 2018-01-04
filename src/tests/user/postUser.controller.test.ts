import 'reflect-metadata';
import supertest = require('supertest');
import { expect } from 'chai'

import { Container } from 'typedi/Container';
import { BootstrapServer } from '../../lib/bootstrap-server';
import { Connection } from 'typeorm';
import { bootstrapContainers } from '../../lib/bootstrap-containers';
import { bootstrapDB } from '../../lib/bootstrap-db';

const app = Container.get(BootstrapServer).bootApp();
const server = supertest(app);

describe('#postUserController', () => {

  it('add a user', async () => {
    const response = await server
      .post('/users/')
      .send({
        email: 'test-user-' + Date.now(),
        password: 'password123'
      })
      .expect(200);
    expect(response.body).to.have.property('email');
  });
});
