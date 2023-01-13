import { MigrationInterface, QueryRunner } from "typeorm";

export class fullMigration1673580511230 implements MigrationInterface {
    name = 'fullMigration1673580511230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "deletedAt" TO "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isActive" TO "deletedAt"`);
    }

}
