import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '../logger/logger.service';
import { ConfigSchema } from 'src/config/config.schema';
import * as bcrypt from 'bcrypt'
import { Readable } from 'stream';


@Injectable()
export class StorageService {

  private s3Client: S3Client;
  private s3BucketName: string;
  private s3Region: string;

  constructor(
    private configService: ConfigService,
    private readonly logger: CustomLoggerService
  ){
    this.s3Region = this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_REGION;
    this.s3Client = new S3Client({
      region: this.s3Region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_ACCESS_KEY_ID,
        secretAccessKey: this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_SECRET_ACCESS_KEY,
      },
    });
    this.s3BucketName = this.configService.getOrThrow<ConfigSchema['AWS']>('AWS').AWS_S3_BUCKET_NAME;
  }

  private getKeyFromUrl(url: string): string {
    this.logger.start();

    const key = url.replace(`https://${this.s3BucketName}.s3.${this.s3Region}.amazonaws.com/`, '');  

    this.logger.done();
    return key;
  }

  async uploadFile(key: string, fileBuffer: Buffer) : Promise<string> {
    this.logger.start()
    let path = key.split('/')
    let fileKey = path.pop().split('.')
    let fileExtension = fileKey.pop();

    let fileName= fileKey.join('.')

    this.logger.log(`hashing fileName ${fileName}`)
    
    do{
      let salt = await bcrypt.genSalt(1);
      fileName = await bcrypt.hash(fileName, salt);
      this.logger.log(`hashing complete fileName: ${fileName}`)
    }while(fileName.includes('/'));

    path.push(fileName.concat('.', fileExtension))
    key = path.join('/')

    this.logger.log(`creating put command for ${key}`)
    const command = new PutObjectCommand({
      Bucket: this.s3BucketName,
      Key: `${key}`,
      Body: fileBuffer,
      StorageClass: 'ONEZONE_IA',
    });

    this.logger.log('sending file')
    try {
      await this.s3Client.send(command);
      this.logger.done();
      return `https://${this.s3BucketName}.s3.${this.s3Region}.amazonaws.com/${key}`;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw new InternalServerErrorException(`Failed to upload file`);
    }
  }

  async getSignedUrl(url: string, expires: number): Promise<string> {
    this.logger.start();

    const key = this.getKeyFromUrl(url);

    this.logger.log('creating command');
    const command = new GetObjectCommand({
      Bucket: this.s3BucketName,
      Key: key,
    });

    this.logger.log('getting signed url')
    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: expires,
    });

    this.logger.done();
    return signedUrl;
  }

  async getFile(url: string): Promise<Readable>{
    this.logger.start();
    
    const key = this.getKeyFromUrl(url);

    this.logger.log('creating command');
    const command = new GetObjectCommand({
      Bucket: this.s3BucketName,
      Key: key,
    });

    this.logger.log(`getting file from key ${key}`)
    const { Body } = await this.s3Client.send(command);
    
    if (!(Body instanceof Readable)) {
      throw new InternalServerErrorException('S3 Body is not readable stream.');
    }

    this.logger.done();
    return Body;
  }
}
