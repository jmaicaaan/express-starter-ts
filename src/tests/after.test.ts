import { Container } from "typedi";
import { Connection } from "typeorm";

after(async () => {
  const dbConnection = Container.get(Connection);
  await dbConnection.close();
});
