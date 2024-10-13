import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect('/api', 301)
  redirectToApi(@Res() res: Response) {
    return;
  }

  @Get('docs')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('policy')
  getPolicy(): string {
    return this.appService.getPrivacyPolicy();

  }

  @Get('terms')
  getTerms(): string {
    return this.appService.getTerms();
  }
}
