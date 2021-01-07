import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPersonDescriptionAndStage1610036060453
  implements MigrationInterface {
  name = 'AddPersonDescriptionAndStage1610036060453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ADD "stage" character varying NOT NULL DEFAULT 'NOT_SPECIFIED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "stage"`);
    await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "description"`);
  }
}
