import { MigrationInterface, QueryRunner } from "typeorm";

export class cascadeTrueOnUserAddress1673634250175 implements MigrationInterface {
    name = 'cascadeTrueOnUserAddress1673634250175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" DROP DEFAULT`);
    }

}
