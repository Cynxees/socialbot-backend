import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '../logger/logger.service';
import { ConfigSchema } from 'src/config/config.schema';


@Injectable()
export class StorageService {

  private s3Client: S3Client;
  private s3BucketName: string;

  constructor(
    private configService: ConfigService,
    private readonly logger: CustomLoggerService
  ){
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_REGION,
      credentials: {
        accessKeyId: this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_ACCESS_KEY_ID,
        secretAccessKey: this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_SECRET_ACCESS_KEY,
      },
    });
    this.s3BucketName = this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_S3_BUCKET_NAME;
  }

  async uploadFile(key: string, fileBuffer: Buffer) {
    this.logger.start()
    this.logger.log(`creating put command for ${key} `)
    const command = new PutObjectCommand({
      Bucket: this.s3BucketName,
      Key: `post/${key}`,
      Body: fileBuffer,
      StorageClass: 'ONEZONE_IA'
    });

    this.logger.log('sending file')
    try {
      const response = await this.s3Client.send(command);
      this.logger.done();
      return response;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw new InternalServerErrorException(`Failed to upload file`);
    }
  }
}
