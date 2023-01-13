import { MigrationInterface, QueryRunner } from "typeorm";

export class fixColumnIsAdm1673630580661 implements MigrationInterface {
    name = 'fixColumnIsAdm1673630580661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" SET DEFAULT false`);
    }

}
