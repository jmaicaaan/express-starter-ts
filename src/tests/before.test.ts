import { Container } from "typedi/Container";
import { BootstrapServer } from "../lib/bootstrap-server";

import { bootstrapDB } from "../lib/bootstrap-db";
import { Connection } from "typeorm";
import { bootstrapContainers } from "../lib/bootstrap-containers";

before(async () => {
  bootstrapContainers();
  const app = Container.get(BootstrapServer).bootApp();
  Container.set(Connection, await bootstrapDB());
});
