import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDataModel1609154415265 implements MigrationInterface {
  name = 'InitDataModel1609154415265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "favorite" boolean NOT NULL DEFAULT false, "birthdate" date, CONSTRAINT "UQ_PEOPLE" UNIQUE ("first_name", "last_name"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "person_id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "FK_827cd30b1e17a16d9c04339c9fe" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "FK_827cd30b1e17a16d9c04339c9fe"`,
    );
    await queryRunner.query(`DROP TABLE "entries"`);
    await queryRunner.query(`DROP TABLE "people"`);
  }
}
