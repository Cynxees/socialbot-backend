import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { MediaType } from 'src/common/enums/media-type.enums';
import { FileResponseDto } from './dto/file-response.dto';
import { FileService } from './file.service';

@Controller('file')
@ApiTags('File')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly logger: CustomLoggerService,
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
    @Body('mediaType') mediaType: MediaType, // Add this line to capture mediaType from query params
  ): Promise<FileResponseDto> {
    this.logger.start();

    const result = await this.fileService.uploadFile(file, mediaType); // Pass both file and mediaType

    this.logger.done();
    return result;
  }
}
