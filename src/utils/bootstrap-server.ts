import { createExpressServer } from 'routing-controllers';
import { Service } from 'typedi';

import { authorizationChecker } from '../middlewares/authorization.checker';

@Service()
export class BootstrapServer {

  private app;

  public bootApp() {
    if (this.app) {
      return this.app;
    }

    const express = createExpressServer({
      controllers: [ __dirname + '/../controllers/**/*.controller.js' ],
      authorizationChecker
    });

    this.app = express;
    return this.app;
  }

  public startListening() {
    const port = process.env.PORT || 3000;
    const app = this.bootApp();

    app.listen(port, () => { console.log(`The server is listening at http://localhost:${port}`); });
  }
}
