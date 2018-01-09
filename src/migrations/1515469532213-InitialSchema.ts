import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitialSchema1515469532213 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      // user table
      await queryRunner.query(`
        CREATE TABLE "user" (
          id serial primary key NOT NULL,
          email citext NOT NULL,
          enabled boolean,
          created timestamp with time zone
        );
      `)
      // role table
      await queryRunner.query(`
        CREATE TABLE "role" (
          id serial primary key NOT NULL,
          name character varying(512) NOT NULL
        );
      `)
      // user_role table
      await queryRunner.query(`
        CREATE TABLE "user_role" (
          id serial NOT NULL,
          userId integer references "user"(id),
          roleId integer references "role"(id)
        );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('user_role')
      await queryRunner.dropTable('user');
      await queryRunner.dropTable('role');
    }

}
