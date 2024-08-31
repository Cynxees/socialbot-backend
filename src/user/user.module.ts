import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserValidationConstraint } from './validators/username.validator';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from 'src/common/casl/casl.module';

@Module({
  imports: [ConfigModule, CaslModule],
  providers: [UserService, UserRepository, UserValidationConstraint],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
