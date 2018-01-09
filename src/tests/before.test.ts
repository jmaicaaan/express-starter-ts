import { Container } from 'typedi/Container';
import { Connection } from 'typeorm';

import { Database } from '../libs/database';

before(async () => {
  const database = Container.get(Database);
  await database.connect();
});
