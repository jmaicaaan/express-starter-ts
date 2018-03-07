import 'reflect-metadata';
import { Container, Service } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';

import { ConnectionSecure } from '../decorators/ConnectionSecure';
import { IDatabase } from '../libs/IDatabase';

@Service()
@ConnectionSecure(['connect'])
export class Database implements IDatabase {

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
<<<<<<< HEAD:src/utils/database.ts
    if (this.connection && this.connection.isConnected) {
=======
    if (this.connection.isConnected) {
>>>>>>> develop:src/database/database.ts
      await this.connection.close();
    }
  }

  public executeSQL(sql: string, ...params: any[]): Promise<any> {
<<<<<<< HEAD:src/utils/database.ts
   return this.connection.createQueryRunner()
=======
    return this.connection.createQueryRunner()
>>>>>>> develop:src/database/database.ts
      .query(sql, params);
  }

  public async reset() {
<<<<<<< HEAD:src/utils/database.ts
    if (process.env.NODE_ENV === 'test') {
      await this.connection.dropDatabase();
      return this.connection.runMigrations();
    }
    throw new Error('Reset database can only be done in test environment');
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
=======
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
>>>>>>> develop:src/database/database.ts
  }
}
