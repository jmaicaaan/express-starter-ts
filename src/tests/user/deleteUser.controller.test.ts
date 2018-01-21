import 'reflect-metadata';

import supertest = require('supertest');

import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { User } from '../../entities';
import { IRole } from '../../enums';
import { App, Database } from '../../utils';

const app = Container.get(App).getApp();
const database = Container.get(Database);
const server = supertest(app);

describe('#deleteUserController', () => {

  let createdAdmin: User;
  let adminAccessToken: string;
  let createdUser: User;
  let userAccessToken: string;

  before(async () => {

    await database.reset();

    let response;

    response = await server
      .post('/users/')
      .send({
        user: {
          email: 'test-user-' + Date.now(),
          password: 'password123'
        },
        role: IRole.Admin
      })
      .expect(200);
    createdAdmin = response.body;

    response = await server
      .post('/login/')
      .send({
        email: createdAdmin.email,
        password: 'password123'
      })
      .expect(200);
    adminAccessToken = response.body.token;

    response = await server
      .post('/users/')
      .send({
        user: {
          email: 'test-user-' + Date.now(),
          password: 'password123'
        },
        role: IRole.User
      })
      .expect(200);
    createdUser = response.body;

    response = await server
      .post('/login/')
      .send({
        email: createdUser.email,
        password: 'password123'
      })
      .expect(200);
    userAccessToken = response.body.token;
  });

  it('ACL - should not allow unauthorized to delete a user', () => {
    return server
      .post('/users/' + createdUser.id)
      .expect(403);
  });

  it('ACL - should not allow user role to delete a user', () => {
    return server
      .post('/users/' + createdUser.id)
      .set('Authorization', userAccessToken)
      .expect(403);
  });

  it('should delete a user', async () => {
    const response = await server
      .post('/users/' + createdAdmin.id)
      .set('Authorization', adminAccessToken)
      .expect(200);
    const options = { where: { id: createdAdmin.id } };
    const findResponse = await server
      .get('/users/')
      .query({ options })
      .expect(200);
    expect(findResponse.body).to.have.lengthOf(1);
    expect(findResponse.body).to.be.a('array');
    expect(findResponse.body[0].enabled).to.equal(false);
  });
});
