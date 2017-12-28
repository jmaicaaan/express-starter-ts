import { join } from 'path';
import { Connection, createConnection } from 'typeorm';

export async function bootstrapDB() {
  let connection: Connection;
  let databaseConfig: any = {};
  let configBasePath = join(process.cwd(), 'config/');

  try {
    const path = join(configBasePath, `ormconfig.${process.env.NODE_ENV}`, '.json');
    databaseConfig = require(path);
  } catch (error) {
    const path = join(configBasePath, 'ormconfig.json');
    databaseConfig = require(path);
  }

  connection = await createConnection(databaseConfig);
  console.log('connection has been setup!');

  return connection;
}
