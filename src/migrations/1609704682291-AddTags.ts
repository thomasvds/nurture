import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTags1609704682291 implements MigrationInterface {
  name = 'AddTags1609704682291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "people_tags_tags" ("people_id" uuid NOT NULL, "tags_id" uuid NOT NULL, CONSTRAINT "PK_999df579c449a1556286b9f37af" PRIMARY KEY ("people_id", "tags_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_53d0655774b8f92c6394e62025" ON "people_tags_tags" ("people_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01cdf0aa8988c662352286c789" ON "people_tags_tags" ("tags_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "people_tags_tags" ADD CONSTRAINT "FK_53d0655774b8f92c6394e62025d" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_tags_tags" ADD CONSTRAINT "FK_01cdf0aa8988c662352286c7899" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people_tags_tags" DROP CONSTRAINT "FK_01cdf0aa8988c662352286c7899"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_tags_tags" DROP CONSTRAINT "FK_53d0655774b8f92c6394e62025d"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_01cdf0aa8988c662352286c789"`);
    await queryRunner.query(`DROP INDEX "IDX_53d0655774b8f92c6394e62025"`);
    await queryRunner.query(`DROP TABLE "people_tags_tags"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
