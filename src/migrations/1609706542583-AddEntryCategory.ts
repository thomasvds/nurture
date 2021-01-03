import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntryCategory1609706542583 implements MigrationInterface {
  name = 'AddEntryCategory1609706542583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries" ADD "category" character varying NOT NULL DEFAULT 'NOT_SPECIFIED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "category"`);
  }
}
