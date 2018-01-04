import { join } from 'path';
import { Connection, createConnection } from 'typeorm';

export async function bootstrapDB() {
  let connection: Connection;
  let databaseConfig: any = {};
  let projectRoot = process.cwd();
  let configBasePath = join(projectRoot, 'config');

  try {
    const path = join(configBasePath, `ormconfig.${process.env.NODE_ENV}.json`);
    databaseConfig = require(path);
  } catch (error) {
    const path = join(configBasePath, 'ormconfig.json');
    databaseConfig = require(path);
  }

  // Get the dist entities - since it cannot understand .ts
  databaseConfig.entities = [ projectRoot + '/dist/entities/*.entity.js' ];
  connection = await createConnection(databaseConfig);

  return connection;
}
