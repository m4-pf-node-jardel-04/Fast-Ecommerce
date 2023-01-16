import { MigrationInterface, QueryRunner } from "typeorm";

export class addOnDeleteConstraintOnProductToRequestEntity1673888227728 implements MigrationInterface {
    name = 'addOnDeleteConstraintOnProductToRequestEntity1673888227728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_requests" DROP CONSTRAINT "FK_116ce07766180df860fb2cb7bae"`);
        await queryRunner.query(`ALTER TABLE "products_requests" DROP CONSTRAINT "FK_8baac2721a06e42535a41f7f23b"`);
        await queryRunner.query(`ALTER TABLE "products_requests" ADD CONSTRAINT "FK_116ce07766180df860fb2cb7bae" FOREIGN KEY ("requestId") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_requests" ADD CONSTRAINT "FK_8baac2721a06e42535a41f7f23b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_requests" DROP CONSTRAINT "FK_8baac2721a06e42535a41f7f23b"`);
        await queryRunner.query(`ALTER TABLE "products_requests" DROP CONSTRAINT "FK_116ce07766180df860fb2cb7bae"`);
        await queryRunner.query(`ALTER TABLE "products_requests" ADD CONSTRAINT "FK_8baac2721a06e42535a41f7f23b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_requests" ADD CONSTRAINT "FK_116ce07766180df860fb2cb7bae" FOREIGN KEY ("requestId") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
