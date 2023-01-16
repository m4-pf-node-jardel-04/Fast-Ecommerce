import { MigrationInterface, QueryRunner } from "typeorm";

export class fieldIdUserOnAddress1673877452896 implements MigrationInterface {
    name = 'fieldIdUserOnAddress1673877452896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "userId" TO "idUser"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "idUser" TO "userId"`);
    }

}
