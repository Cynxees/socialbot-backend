import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { StorageModule } from './storage/storage.module';
import { SdkModule } from './sdk/sdk.module';

@Module({
  imports: [PrismaModule, LoggerModule, StorageModule, SdkModule],
  controllers: [],
})
export class InfrastructureModule {}
