import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { UserRepository } from './repositories/user.repository';
import { UserValidationConstraint } from './validators/username.validator';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserValidationConstraint],
  exports: [UserService]
})
export class UserModule {}
