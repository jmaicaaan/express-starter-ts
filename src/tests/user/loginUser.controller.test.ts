import 'reflect-metadata';

import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';
import supertest = require('supertest');

import { IRole } from '../../enums';
import { App } from '../../utils';

const app = Container.get(App).getApp();
const server = supertest(app);

describe('#loginUserController', () => {
  let createdUser;

  before(async () => {
    const response = await server
      .post('/users/')
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
      .post('/login')
      .send({
        email: createdUser.email,
        password: 'password123'
      })
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
