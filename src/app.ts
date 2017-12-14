import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { IntroController, UserController } from './controllers/index';

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entities/user';

useContainer(Container);

const app = createExpressServer({
  controllers: [
    IntroController,
    UserController
  ]
});

// tslint:disable-next-line:arrow-parens
createConnection().then(async (connection) => {
  const user = new User();
  user.email = 'test@email.com';
  user.password = 'password123';
  user.enabled = true;
  user.created = new Date();

  let userRepository = connection.getRepository(User);
  await userRepository.save(user);
});

const port = process.env.PORT || 1111;

app.listen(port, () => {
  console.log(`The server is starting at http://localhost:${port}`);
});
