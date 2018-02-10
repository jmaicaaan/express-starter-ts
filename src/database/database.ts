import 'reflect-metadata';
import { Container, Inject, Service } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';
import { UserSeed } from './seeds/user.seed';

@Service()
export class Database {

  private connection: Connection;

  public async connect(): Promise<void> {
    if (!this.connection) {
      await this.bootstrap();
    }
    if (!this.connection.isConnected) {
      await this.connection.connect();
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection && this.connection.isConnected) {
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

  private async bootstrap(): Promise<void> {
    if (this.connection) {
      return;
    }
    useContainer(Container);
    /**
     * Create a database connection using the ormconfig under config/ folder
     */
    this.connection = await createConnection();
  }
}
