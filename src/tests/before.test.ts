import { Container } from 'typedi/Container';
import { Connection } from 'typeorm';

import { bootstrapContainers, bootstrapDB, BootstrapServer } from '../utils';

before(async () => {
  bootstrapContainers();
  const app = Container.get(BootstrapServer).bootApp();
  Container.set(Connection, await bootstrapDB());
});
