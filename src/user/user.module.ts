import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserValidationConstraint } from './validators/username.validator';

@Module({
  imports: [ConfigModule],
  providers: [UserService, UserRepository, UserValidationConstraint],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
