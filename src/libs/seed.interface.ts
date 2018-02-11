import { Connection, EntityManager, QueryRunner } from 'typeorm';

export interface SeedInterface {

  seed(connection: Connection): Promise<any>;
}
