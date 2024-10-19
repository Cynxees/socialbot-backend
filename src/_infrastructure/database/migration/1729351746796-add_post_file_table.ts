import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddPostFileTable1729351746796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'postFile',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'postGroupId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fileId',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['postGroupId'],
            referencedTableName: 'postGroup',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          },
          {
            columnNames: ['fileId'],
            referencedTableName: 'file',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('postFile', true, true);
  }
}
