import 'reflect-metadata';
import { Container } from 'typedi';

import { bootstrapContainers, bootstrapDB, BootstrapServer } from './utils';

bootstrapContainers();

const server = Container.get(BootstrapServer);
server.startListening();

bootstrapDB();
