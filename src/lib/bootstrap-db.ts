import { Connection, createConnection } from 'typeorm';

export async function bootstrapDB() {
  let connection: Connection;
  let databaseConfig: any = {};

  try {
    databaseConfig = require(`../../config/ormconfig.${process.env.NODE_ENV}.json`);
    console.log(`using ${process.env.NODE_ENV} ormconfig`);
  } catch (error) {
    databaseConfig = require(`../../config/ormconfig.json`);
  }

  connection = await createConnection(databaseConfig);
  console.log('connection has been setup!');

  return connection;
}
