import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddGoogleUserTable1728997771626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'googleUser',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: 'accessToken',
            type: 'varchar',
          },
          {
            name: 'refreshToken',
            type: 'varchar',
          },
          {
            name: 'scopes',
            type: 'varchar[]',
          },
          {
            name: 'tokenType',
            type: 'varchar',
          },
          {
            name: 'expiresIn',
            type: 'timestamp',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('googleUser');
  }
}
