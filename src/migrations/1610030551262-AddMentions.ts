import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMentions1610030551262 implements MigrationInterface {
  name = 'AddMentions1610030551262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "entries_mentions_people" ("entries_id" uuid NOT NULL, "people_id" uuid NOT NULL, CONSTRAINT "PK_2bbc98654d68a3acf49a5d8fd56" PRIMARY KEY ("entries_id", "people_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9edaa290c6b6ae7398c9a6ac2c" ON "entries_mentions_people" ("entries_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e39b4159bf18223385bb701fd1" ON "entries_mentions_people" ("people_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "entries_mentions_people" ADD CONSTRAINT "FK_9edaa290c6b6ae7398c9a6ac2c2" FOREIGN KEY ("entries_id") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries_mentions_people" ADD CONSTRAINT "FK_e39b4159bf18223385bb701fd1c" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries_mentions_people" DROP CONSTRAINT "FK_e39b4159bf18223385bb701fd1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries_mentions_people" DROP CONSTRAINT "FK_9edaa290c6b6ae7398c9a6ac2c2"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_e39b4159bf18223385bb701fd1"`);
    await queryRunner.query(`DROP INDEX "IDX_9edaa290c6b6ae7398c9a6ac2c"`);
    await queryRunner.query(`DROP TABLE "entries_mentions_people"`);
  }
}
