import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
