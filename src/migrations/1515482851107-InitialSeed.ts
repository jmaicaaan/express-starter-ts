import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSeed1515482851107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      // seed role table
      await queryRunner.query(`
        INSERT INTO "role"
          VALUES (1, 'Admin');
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        DELETE FROM "role"
          where name = 'Admin'
      `);
    }

}
