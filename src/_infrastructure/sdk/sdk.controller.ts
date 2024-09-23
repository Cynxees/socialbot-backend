import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { SdkService } from './sdk.service';

@Controller('sdk')
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

  @Get('download')
  async downloadSdk(@Res() res: Response) {
    await this.sdkService.make();

    const { fileContent, fileExtension, fileName } = this.sdkService.file;

    res.set({
      "Content-Type": "application/text",
      "Content-Disposition": `attachment; filename="${fileName}${fileExtension}"`,
    });

    return res.send(fileContent);
  }
}