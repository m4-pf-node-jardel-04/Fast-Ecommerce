import { MigrationInterface, QueryRunner } from "typeorm";

export class addStatusColumnAndFixRequestEntity1673528618066 implements MigrationInterface {
    name = 'addStatusColumnAndFixRequestEntity1673528618066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "status" character varying NOT NULL DEFAULT 'em aberto'`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "totalQuantity" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "totalValue" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "totalValue" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "totalQuantity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "date" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "status"`);
    }

}
