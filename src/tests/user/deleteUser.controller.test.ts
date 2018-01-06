import 'reflect-metadata';
import supertest = require('supertest');
import { expect } from 'chai';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { User } from '../../entities';
import { IRole } from '../../enums';
import { BootstrapServer } from '../../utils';

const app = Container.get(BootstrapServer).bootApp();
const server = supertest(app);

describe('#deleteUserController', () => {

  let createdUser: User;

  before(async () => {
    let response = await server
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

  it('delete a user', async () => {
    const response = await server
      .post('/users/' + createdUser.id)
      .expect(200);
    const options = { where: { id: createdUser.id } };
    const findResponse = await server
      .get('/users/')
      .query({ options })
      .expect(200);
    expect(findResponse.body).to.have.a.lengthOf(1);
    expect(findResponse.body).to.be.a('array');
    expect(findResponse.body[0].enabled).to.equal(false);
  });
});
