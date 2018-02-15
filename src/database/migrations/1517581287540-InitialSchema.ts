import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1517581287540 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE "role" (
        "id" SERIAL NOT NULL,
        "name" text NOT NULL,
        PRIMARY KEY("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "created" TIMESTAMP NOT NULL DEFAULT '"2018-02-02T14:21:29.793Z"',
        PRIMARY KEY("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "user_roles" (
        "userId" integer NOT NULL,
        "roleId" integer NOT NULL,
        PRIMARY KEY("userId", "roleId")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "user_roles"
        ADD CONSTRAINT "fk_5ea4bbbcbfffe57d4c9acb0d900"
        FOREIGN KEY ("userId") REFERENCES "user"("id")
    `);
    await queryRunner.query(`
      ALTER TABLE "user_roles"
        ADD CONSTRAINT "fk_dc314bf71b0a4118ea056229aef"
        FOREIGN KEY ("roleId") REFERENCES "role"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "fk_dc314bf71b0a4118ea056229aef"`);
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "fk_5ea4bbbcbfffe57d4c9acb0d900"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
