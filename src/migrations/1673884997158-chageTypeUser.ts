import { MigrationInterface, QueryRunner } from "typeorm";

export class chageTypeUser1673884997158 implements MigrationInterface {
    name = 'chageTypeUser1673884997158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "user" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "user"`);
    }

}
