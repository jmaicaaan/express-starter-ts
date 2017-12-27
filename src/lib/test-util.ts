import * as chakram from 'chakram';
import {
  createExpressServer, Get, getMetadataArgsStorage, JsonController,
  useContainer as routingUseContainer
} from 'routing-controllers';
import { Container } from 'typedi';
import { Connection, createConnection, useContainer as ormUseContainer } from 'typeorm';
import { bootstrapContainers } from '../lib/bootstrap-containers';
import { bootstrapDB } from '../lib/bootstrap-db';
import { bootstrapServer } from '../lib/bootstrap-server';

export function assertRequest(method: string, route: string, dataOrCallback: any | ((response: any) => any),
                              dataOrRequestOptionsOrCallback?: any | ((response: any) => any),
                              maybeCallback?: (response: any) => any): void {

  const args = arguments.length;
  const port = process.env.PORT;

  it('asserting port ' + port, async () => {
    let unhandledRejection: Error = undefined;
    const captureRejection = (e: Error) => { unhandledRejection = e; };
    process.on('unhandledRejection', captureRejection);

    try {
      let r;
      if (args === 3) { // get request
        r = await chakram[method](`http://127.0.0.1:${port}/${route}`).then(dataOrCallback as Function);
      } else if (args === 4) { // post request
        r = await chakram[method](`http://127.0.0.1:${port}/${route}`, dataOrCallback as any)
          .then(dataOrRequestOptionsOrCallback as Function);
      } else {
        throw new Error('No assertion has been performed');
      }

      if (unhandledRejection) {
        const e = new Error('There was an unhandled rejection while processing the request');
        e.stack += '\nCaused by: ' + unhandledRejection.stack;
        throw e;
      }

      return r;
    } finally {
      process.removeListener('unhandledRejection', captureRejection);
    }
  });
}

/**
 * Start up the connection on the API and to the database using the `before` and `after` 
 * hook of Mocha Unit Test API
 * @param controllers An array of controllers to be registered for the specific test suite
 */
export function setupTest(controllers: any[]) {
  let expressServer: any;
  let databaseConnection: Connection;

  bootstrapContainers();

  /**
   * Todos: 
   *  - use a different config (eg: NODE_ENV=test)
   *  - reset the database on every test suite
   *  - add data before running a test suite to be less dependent on the database initial seed
   *  - change also the PORT, make it dynamic or have a config base also
   */

  // tslint:disable-next-line:arrow-parens
  before(async () => {
    expressServer = bootstrapServer(controllers).server;
    databaseConnection = await bootstrapDB();
  });

  after((done) => {
    databaseConnection.close();
    expressServer.close(done);
  });
}
