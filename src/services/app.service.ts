import 'reflect-metadata';

import { Application } from 'express';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container, Service } from 'typedi';

@Service()
export class App {

  private application: Application;

  public getApp(): Application {
    if (!this.application) {
      this.bootstrap();
    }
    return this.application;
  }

  private bootstrap(): void {
    if (this.application) {
      return;
    }
    useContainer(Container);
    this.application = createExpressServer({
      routePrefix: '/api',
      controllers: [ __dirname + '/../app/controllers/**/*.controller.js' ],
      middlewares: [ __dirname + '/../app/middlewares/*.middleware.js' ]
    });
  }
}
