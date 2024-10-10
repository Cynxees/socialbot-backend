import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { StorageModule } from './storage/storage.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PrismaModule, LoggerModule, StorageModule, DatabaseModule],
  controllers: [],
})
export class InfrastructureModule {}
