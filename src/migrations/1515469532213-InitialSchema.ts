import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1515469532213 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS citext`);

      // user table
      await queryRunner.query(`
        CREATE TABLE "user" (
          id serial PRIMARY KEY NOT NULL,
          email citext NOT NULL,
          password character varying(1024) NOT NULL,
          enabled boolean default TRUE,
          created timestamp with time zone
        );
      `);
      // role table
      await queryRunner.query(`
        CREATE TABLE "role" (
          id serial PRIMARY KEY NOT NULL,
          name character varying(512) NOT NULL
        );
      `);
      // user_role table
      await queryRunner.query(`
        CREATE TABLE "role_mapping" (
          id serial PRIMARY KEY NOT NULL,
          "userId" integer references "user"(id),
          "roleId" integer references "role"(id)
        );
      `);
      // access_token table
      await queryRunner.query(`
        CREATE TABLE "access_token" (
          id serial PRIMARY KEY NOT NULL,
          token character varying(1024) NOT NULL,
          ttl integer NOT NULL,
          created timestamp with time zone,
          userId integer references "user"(id)
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP EXTENSION IF EXISTS citext`);
      await queryRunner.query(`DROP TABLE IF EXISTS "role_mapping";`);
      await queryRunner.query(`DROP TABLE IF EXISTS "access_token";`);
      await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
      await queryRunner.query(`DROP TABLE IF EXISTS "role";`);
    }

}
