import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { DeleteUserController, GetUserController, IntroController, PostUserController } from '../controllers';

export function bootstrapServer(controllers: any[]) {
  const app = createExpressServer({
    controllers
  });

  const port = process.env.PORT || 1111;
  const server = app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
  });

  return {
    app,
    server
  };
}
