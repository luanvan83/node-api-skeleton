import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserFeedbackTable1703499680631 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: "user_feedbacks",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              generationStrategy: "increment"
            },
            {
              name: "user_id",
              type: "int"
            },
            {
              name: "content",
              type: "text"
            }
          ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_feedbacks");
  }

}
