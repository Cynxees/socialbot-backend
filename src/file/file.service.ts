import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { FileRepository } from './repositories/file.repository';
import { FileResponseDto } from './dto/file-response.dto';
import { StorageService } from 'src/_infrastructure/storage/storage.service';
import { MediaType } from '@prisma/client';
import { MediaTypeEnum } from 'src/common/enums/media-type.enums';
@Injectable()
export class FileService {

  constructor(
    private readonly logger : CustomLoggerService,
    private readonly fileRepository: FileRepository,
    private readonly storageService: StorageService,
  ){}

  async uploadFile(file: Express.Multer.File, mediaType: MediaTypeEnum) : Promise<FileResponseDto>{
    this.logger.start();

    this.logger.log('uploading to s3');
    const key = `post/${Date.now()}-${file.originalname}`;
    const url = await this.storageService.uploadFile(key, file.buffer);
    
    this.logger.log('uploading file data to database');
    const result = this.fileRepository.createFile({
      url,
      mediaType,
    });

    this.logger.done();
    return result;
  }

}
