import 'reflect-metadata';
import supertest = require('supertest');
import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { BootstrapServer } from '../../utils';

const app = Container.get(BootstrapServer).bootApp();
const server = supertest(app);

describe('#loginUserController', () => {
  let createdUser;

  before(async () => {
    const response = await server
      .post('/users/')
      .send({
        email: 'test-user-' + Date.now(),
        password: 'password123'
      })
      .expect(200);
    createdUser = response.body;
  });

  it('should login a user and receive an accessToken', async () => {
    const response = await server
      .post('/login')
      .send({
        email: createdUser.email,
        password: 'password123'
      })
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
