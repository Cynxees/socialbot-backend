import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomLoggerService } from '../logger/logger.service';

@Controller('storage')
@ApiTags('Storage')
export class StorageController {

  constructor(
    private logger: CustomLoggerService, 
    private storageService: StorageService
  ){}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile('file') file: Express.Multer.File) : Promise<string>{
    this.logger.start();
    
    const key = `${Date.now()}-${file.originalname}`;
    await this.storageService.uploadFile(key, file.buffer);

    this.logger.done();
    return 'success'
  }

}
