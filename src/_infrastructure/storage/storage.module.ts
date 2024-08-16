import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [StorageService],
  controllers: [StorageController]
})
export class StorageModule {}
