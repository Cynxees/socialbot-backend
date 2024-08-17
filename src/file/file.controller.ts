import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponseDto } from './dto/file-response.dto';

@Controller('file')
@ApiTags('File')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly logger: CustomLoggerService
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: "Don't use this, example only",
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
  async uploadFile(@UploadedFile('file') file: Express.Multer.File): Promise<FileResponseDto>{

    this.logger.start();

    const result = await this.fileService.uploadFile(file);

    this.logger.done();
    return result;

  }

}
