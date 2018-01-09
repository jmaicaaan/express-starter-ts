import 'reflect-metadata';
import { Container, Service } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';

@Service()
export class Database {

  private connection: Connection;

  public async connect(): Promise<void> {
    if (!this.connection) { await this.bootstrap(); }
    if (!this.connection.isConnected) { await this.connection.connect(); }
  }

  public async disconnect(): Promise<void> {
    if (this.connection && this.connection.isConnected) { await this.connection.close(); }
  }

  private async bootstrap(): Promise<void> {
    if (this.connection) { return; }
    useContainer(Container);
    this.connection = await createConnection(); // look for ormconfig and create a connection
    return;
  }
}
