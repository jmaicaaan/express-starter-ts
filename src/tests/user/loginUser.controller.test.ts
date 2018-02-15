import 'reflect-metadata';

import supertest = require('supertest');

import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { IRole } from '../../enums';
import { App, Database } from '../../utils';

const app = Container.get(App).getApp();
const database = Container.get(Database);
const server = supertest(app);

describe('#loginUserController', () => {
  let createdUser;

  before(async () => {

    await database.reset();

    const response = await server
      .post('/api/users/')
      .send({
        user: {
          email: 'test-user-' + Date.now(),
          password: 'password123'
        },
        role: IRole.Admin
      })
      .expect(200);
    createdUser = response.body;
  });

  it('should login a user and receive an accessToken', async () => {
    const response = await server
      .post('/api/login')
      .send({
        email: createdUser.email,
        password: 'password123'
      })
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
