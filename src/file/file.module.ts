import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { FileRepository } from './repositories/file.repository';
import { StorageModule } from 'src/_infrastructure/storage/storage.module';
import { PrismaModule } from 'src/_infrastructure/prisma/prisma.module';

@Module({
  imports: [LoggerModule, StorageModule, PrismaModule],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
