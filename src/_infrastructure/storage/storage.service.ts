import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '../logger/logger.service';


@Injectable()
export class StorageService {

  private s3Client: S3Client;
  private s3BucketArn: string;
  private s3BucketName: string;

  constructor(
    private configService: ConfigService,
    private readonly logger: CustomLoggerService
  ){
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.s3BucketArn = this.configService.getOrThrow<string>('AWS_S3_BUCKET_ARN');
    this.s3BucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(key: string, body: Buffer | Uint8Array | Blob | string) {
    this.logger.start()
    this.logger.log(`creating put command for ${key} `)
    const command = new PutObjectCommand({
      Bucket: this.s3BucketName,
      Key: `post/${key}`,
      Body: body,
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
