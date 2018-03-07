import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSeed1517582987655 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      INSERT INTO "role"(name)
        VALUES ('admin'), ('user');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "role";`);
  }
}
