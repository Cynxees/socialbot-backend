import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/auth.enums';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1729716639402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash('pass', 1);

    await queryRunner.manager.insert('user', {
      username: 'admin',
      displayName: 'The Admin',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('user', { username: 'admin' });
  }
}
