import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1517553533413 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "created" TIMESTAMP NOT NULL DEFAULT '"2018-02-02T06:38:54.479Z"',
        PRIMARY KEY("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`);
  }

}
