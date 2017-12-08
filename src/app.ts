import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { IntroController, UserController } from './controllers/index';
import 'reflect-metadata';


useContainer(Container);

const app = createExpressServer({
  controllers: [
    IntroController,
    UserController,
  ]
});
const port = process.env.PORT || 1111;

app.listen(port, () => {
  console.log(`The server is starting at http://localhost:${port}`);
});
