import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/_infrastructure/prisma/prisma.module';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { UserRepository } from './repositories/user.repository';
import { UserValidationConstraint } from './validators/username.validator';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, LoggerModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserValidationConstraint],
  exports: [UserService]
})
export class UserModule {}
