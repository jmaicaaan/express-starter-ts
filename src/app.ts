import 'reflect-metadata';
import { Container } from 'typedi';

import { bootstrapContainers, bootstrapDB, BootstrapServer } from './utils';

bootstrapContainers();

const app = Container.get(BootstrapServer).bootApp();

bootstrapDB();
