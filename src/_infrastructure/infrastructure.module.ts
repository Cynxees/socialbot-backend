import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { StorageModule } from './storage/storage.module';
import { SdkModule } from './sdk/sdk.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [LoggerModule, StorageModule, SdkModule, DatabaseModule],
  controllers: [],
})
export class InfrastructureModule {}
