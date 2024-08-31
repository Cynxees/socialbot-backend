import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './repositories/file.repository';
import { StorageModule } from 'src/_infrastructure/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
