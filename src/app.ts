import 'reflect-metadata';
import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';

import { IntroController, DeleteUserController, GetUserController, PostUserController } from './controllers';
import { User } from './entities';

// let's tell orm and the routing controller to use the typeDI
// https://github.com/typestack/typedi/issues/4

ormUseContainer(Container);
routingUseContainer(Container);

const app = createExpressServer({
  controllers: [
    IntroController,
    GetUserController,
    PostUserController,
    DeleteUserController
  ]
});

// tslint:disable-next-line:arrow-parens
createConnection().then(async (connection) => {
  console.log('connection has been setup!');
});

const port = process.env.PORT || 1111;

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
