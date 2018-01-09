import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Database } from '../utils';

before(async () => {
  const database = Container.get(Database);
  await database.connect();
});
