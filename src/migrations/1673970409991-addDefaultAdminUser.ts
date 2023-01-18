import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcryptjs";

const hashPassword = hashSync("123456", 10);

export class addDefaultAdminUser1673970409991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (name, email, password, "isAdm") VALUES ('admin', 'admin@mail.com','${hashPassword}', true)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE name = 'admin'`);
  }
}
