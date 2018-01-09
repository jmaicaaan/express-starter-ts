import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Database } from '../libs/database';

after(async () => {
  const database = Container.get(Database);
  await database.disconnect();
});
