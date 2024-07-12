import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1703499580718 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: "nickname",
              type: "varchar",
              length: "30",
            },
            {
              name: "email",
              type: "varchar",
              length: "128",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamp",
              isNullable: true
            },
            {
              name: "deleted_at",
              type: "timestamp",
              isNullable: true
            },
          ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
