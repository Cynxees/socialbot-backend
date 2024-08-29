import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { GoogleUserRepository } from './repositories/google-user.repository';
import { PrismaModule } from 'src/_infrastructure/prisma/prisma.module';

@Module({
  imports: [LoggerModule, UserModule, PrismaModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleUserRepository],
  exports: [GoogleService]
})
export class GoogleModule {}
