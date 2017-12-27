import 'reflect-metadata';

import * as assert from 'assert';
import { assertRequest, setupTest } from '../../lib/test-util';
import { GetUserController } from './getUser.controller';

describe('getUserController', () => {

  setupTest([ GetUserController ]);

  describe('list of users', () => {
    // needs to enhance this one
    // setup an enum probably? or make it a url instead of method + route
    assertRequest('get', 'users', (res) => {
      assert.notEqual(res.body.length, 0);
    });
  });
});
