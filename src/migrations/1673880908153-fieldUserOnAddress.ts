import { MigrationInterface, QueryRunner } from "typeorm";

export class fieldUserOnAddress1673880908153 implements MigrationInterface {
    name = 'fieldUserOnAddress1673880908153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "idUser" TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "user" TO "idUser"`);
    }

}
