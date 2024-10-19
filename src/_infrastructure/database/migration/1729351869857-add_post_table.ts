import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddPostTable1729351869857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'post',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'title',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'location',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'published',
              type: 'boolean',
              default: false,
            },
            {
              name: 'url',
              type: 'varchar',
              isNullable: true
            },
            {
              name: 'tags',
              type: 'simple-array',
              default: "''",
            },
            {
              name: 'hashtags',
              type: 'simple-array',
              default: "''",
            },
            {
              name: 'postGroupId',
              type: 'int',
              isNullable: true,
            },
          ],
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
