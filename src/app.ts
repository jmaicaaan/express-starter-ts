import 'reflect-metadata';
import { Container } from 'typedi';
import { bootstrapContainers } from './lib/bootstrap-containers';
import { bootstrapDB } from './lib/bootstrap-db';
import { BootstrapServer } from './lib/bootstrap-server';

bootstrapContainers();

const app = Container.get(BootstrapServer).bootApp();

bootstrapDB();
