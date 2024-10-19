import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddPostGroupTable1728999560665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'postGroup',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'scheduledDate',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'isPublished',
            type: 'boolean',
            default: false,
          },
          {
            name: 'authorId',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['authorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('postGroup', false, true);
  }
}
