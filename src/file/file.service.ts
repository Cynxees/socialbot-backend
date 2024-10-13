import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { StorageService } from 'src/_infrastructure/storage/storage.service';
import { MediaType } from 'src/common/enums/media-type.enums';
import { Readable } from 'stream';
import { FileResponseDto } from './dto/file-response.dto';
import { File } from './entities/file.entity';
import { FileRepository } from './repositories/file.repository';
@Injectable()
export class FileService {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly fileRepository: FileRepository,
    private readonly storageService: StorageService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    mediaType: MediaType,
  ): Promise<FileResponseDto> {
    this.logger.start();

    this.logger.log('uploading to s3');
    const key = `post/${Date.now()}-${file.originalname}`;
    const url = await this.storageService.uploadFile(key, file.buffer);

    this.logger.log('uploading file data to database');
    const result = this.fileRepository.create({
      url,
      mediaType,
    });

    this.logger.done();
    return result;
  }

  async findOne(id: number): Promise<File | null> {
    this.logger.start();

    const file = await this.fileRepository.findOne({ where: { id } });

    this.logger.done();
    return file;
  }

  async findOneOrThrow(id: number): Promise<File> {
    this.logger.start();

    const file = await this.findOne(id);
    if (!file) throw new NotFoundException(`File ${id} not found`);

    this.logger.done();
    return file;
  }

  async getSignedUrl(fileId: number): Promise<string> {
    this.logger.start();

    this.logger.log('getting file');
    const file = await this.findOneOrThrow(fileId);

    this.logger.log('getting signed URL');
    const signedUrl = await this.storageService.getSignedUrl(file.url, 3600);

    this.logger.done();
    return signedUrl;
  }

  async getFileObject(fileId: number): Promise<Readable> {
    this.logger.start();

    this.logger.log('getting file');
    const file = await this.findOneOrThrow(fileId);

    this.logger.log('getting file object');
    const fileObject = await this.storageService.getFile(file.url);

    this.logger.done();
    return fileObject;
  }
}
