import { Connection, EntityManager, QueryRunner } from 'typeorm';

export interface ISeed {

  seed(connection: Connection): Promise<void>;
}
