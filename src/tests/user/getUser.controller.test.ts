import 'reflect-metadata';
import supertest = require('supertest');
import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { User } from '../../entities';
import { BootstrapServer } from '../../utils';

const app = Container.get(BootstrapServer).bootApp();
const server = supertest(app);

describe('#getUserController', () => {

  let createdUser: User;
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
      .query({ options })
      .expect(200);

    expect(response.body).to.be.a('array');
    expect(response.body).to.have.lengthOf(1);


  });
});
