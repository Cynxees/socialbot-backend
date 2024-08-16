import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { StorageController } from './storage/storage.controller';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [PrismaModule, LoggerModule, AuthModule, StorageModule],
  controllers: [],
})
export class InfrastructureModule {}
