import { MigrationInterface, QueryRunner } from "typeorm";

export class addProductNameColumn1673869532083 implements MigrationInterface {
    name = 'addProductNameColumn1673869532083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_requests" ADD "productName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_requests" DROP COLUMN "productName"`);
    }

}
