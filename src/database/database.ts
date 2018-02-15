import 'reflect-metadata';
import { Container, Inject, Service } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';
import { UserSeed } from './seeds/user.seed';

@Service()
export class Database {

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
    if (!this.connection) {
      throw new Error('Cannot disconnect. Please check if you have connection');
    }
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public executeSQL(sql: string, ...params: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error('Cannot execture SQL. Please check if you have connection');
    }
    return this.connection.createQueryRunner()
      .query(sql, params);
  }

  public async reset() {
    if (!this.connection) {
      throw new Error('Cannot reset database. Please check if you have connection');
    }
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }
}
