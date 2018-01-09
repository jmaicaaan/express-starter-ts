import 'reflect-metadata';
import supertest = require('supertest');
import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { User } from '../../entities';
import { IRole } from '../../enums';
import { App } from '../../libs/app';

const app = Container.get(App).getApp();
const server = supertest(app);

describe('#getUserController', () => {

  let createdUser: User;
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

  it('get all users', async () => {
    const options = { where: { id: 1 } };
    const response = await server
      .get('/users/')
      .expect(200);
  });
  it('should get user by id', async () => {
    const options = { where: { id: createdUser.id } };
    const response = await server
      .get('/users/')
      .set('Authorization', '3efd9ced2f840576a5f638a030fa84')
      .query({ options })
      .expect(200);

    expect(response.body).to.be.a('array');
    expect(response.body).to.have.lengthOf(1);
  });
});
