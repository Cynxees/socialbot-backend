import { Controller, Post, UploadedFile, UseInterceptors, Query, Body } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponseDto } from './dto/file-response.dto';
import { MediaTypeEnum } from 'src/common/enums/media-type.enums';

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
        mediaType: {
          type: 'string',
          enum: ['image', 'video', 'both'],
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile('file') file: Express.Multer.File,
    @Body('mediaType') mediaType: MediaTypeEnum // Add this line to capture mediaType from query params
  ): Promise<FileResponseDto> {

    this.logger.start();

    const result = await this.fileService.uploadFile(file, mediaType); // Pass both file and mediaType

    this.logger.done();
    return result;
  }
}

