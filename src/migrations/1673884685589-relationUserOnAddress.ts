import { MigrationInterface, QueryRunner } from "typeorm";

export class relationUserOnAddress1673884685589 implements MigrationInterface {
    name = 'relationUserOnAddress1673884685589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "user" character varying NOT NULL`);
    }

}
