import { Container } from 'typedi';

import { App } from './app/app';
import { Database } from './database/database';

const port = 4000 || process.env.PORT;
const app = Container.get(App).getApp();
const database = Container.get(Database);

database.connect();

app.listen(port, () => {
  console.log(`Server listening at locahost:${port}`);
});
