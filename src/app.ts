import 'reflect-metadata';
import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';

import { DeleteUserController, GetUserController, IntroController, PostUserController } from './controllers';
import { User } from './entities';
import { bootstrapContainers } from './lib/bootstrap-containers';
import { bootstrapDB } from './lib/bootstrap-db';
import { bootstrapServer } from './lib/bootstrap-server';

bootstrapContainers();
const app = bootstrapServer([
  IntroController,
  GetUserController,
  PostUserController,
  DeleteUserController
]);

bootstrapDB();
