import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('terms')
  getTerms(): string {
    return this.appService.getTerms();
  }
}
