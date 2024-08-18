import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [PrismaModule, LoggerModule, StorageModule],
  controllers: [],
})
export class InfrastructureModule {}
