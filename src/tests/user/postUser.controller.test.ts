import 'reflect-metadata';

import supertest = require('supertest');

import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { IRole } from '../../enums';
import { App } from '../../utils';

const app = Container.get(App).getApp();
const server = supertest(app);

describe('#postUserController', () => {

  it('add a user', async () => {
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
    expect(response.body).to.have.property('email');
  });
});
