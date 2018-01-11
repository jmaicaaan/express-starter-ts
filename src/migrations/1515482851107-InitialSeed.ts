import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSeed1515482851107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      // seed role table
      await queryRunner.query(`
        INSERT INTO "role"(name)
          VALUES ('Admin'), ('User');
      `);

      await queryRunner.query(`
        INSERT INTO "user"(email, password)
          VALUES ('admin@example.com', 'password123'),
                ('user@example.com', 'password123');
      `);

      await queryRunner.query(`
        INSERT INTO role_mapping ("userId", "roleId")
        SELECT u.id, r.id from
          ( SELECT id from "user" where email='admin@example.com' ) as u,
            ( SELECT id from "role" where name='Admin') as r
      `);

      await queryRunner.query(`
        INSERT INTO role_mapping ("userId", "roleId")
        SELECT u.id, r.id from
          ( SELECT id from "user" where email='user@example.com' ) as u,
            ( SELECT id from "role" where name='User') as r
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM "role_mapping";`);
      await queryRunner.query(`DELETE FROM "role";`);
      await queryRunner.query(`DELETE FROM "user";`);
    }

}
