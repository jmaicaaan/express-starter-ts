import 'reflect-metadata';
import { Container } from 'typedi';

import { bootstrapContainers, bootstrapDB, BootstrapServer } from './utils';

bootstrapContainers();

const app = Container.get(BootstrapServer).bootApp();

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`The server is listening at http://localhost:${port}`); });

bootstrapDB();
