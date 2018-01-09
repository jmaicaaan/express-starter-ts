import { Container } from 'typedi';

import { App, Database } from './utils';

const port = process.env.PORT || 3000;
const app = Container.get(App).getApp();

const database = Container.get(Database);
database.connect();

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
