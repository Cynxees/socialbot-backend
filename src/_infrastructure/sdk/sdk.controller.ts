import { Controller, Get } from '@nestjs/common';
import { SdkService } from './sdk.service';
import { CustomLoggerService } from '../logger/logger.service';

@Controller('sdk')
export class SdkController {
  constructor(
    private readonly sdkService: SdkService,
    private readonly loggerService: CustomLoggerService
  
  ) {}

  @Get('download')
  async downloadSdk() {
    this.loggerService.start();

    await this.sdkService.make();

    const { fileContent } = this.sdkService.file;

    this.loggerService.done();
    try{
      return fileContent;
    }catch(error){
      this.loggerService.error(`Caught error when sending file ${error}`);
    }
  }
}