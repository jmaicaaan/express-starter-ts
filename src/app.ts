import 'reflect-metadata';

import { DeleteUserController, GetUserController, IntroController, PostUserController } from './controllers';
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
