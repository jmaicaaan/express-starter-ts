import { Container } from 'typedi';

import { App } from './app/app';
import { Database } from './database/database';

(async () => {
  const port = 8000 || process.env.PORT;
  const app = Container.get(App).getApp();
  const db = Container.get(Database);
  await db.connect();
  app.listen(port, () => {
    console.log(`Server listening at locahost:${port}`);
  });
})();
