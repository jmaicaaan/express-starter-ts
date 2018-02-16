import 'reflect-metadata';
import { Container, Inject, Service } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';
import { UserSeed } from './seeds/user.seed';

import { ConnectionSecure } from '../decorators/ConnectionSecure';
import { IDatabase } from '../libs/IDatabase';

@Service()
@ConnectionSecure
export class Database implements IDatabase {

  private connection: Connection;

  public async connect(): Promise<Connection> {
    if (this.connection) {
      await this.connection.connect();
      return this.connection;
    }
    useContainer(Container);
    /**
     * Create a database connection using the ormconfig under config/ folder
     */
    this.connection = await createConnection();
    return this.connection;
  }

  public async disconnect(): Promise<void> {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public executeSQL(sql: string, ...params: any[]): Promise<any> {
    return this.connection.createQueryRunner()
      .query(sql, params);
  }

  public async reset() {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }
}
