import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('google')
@ApiTags('Google')
@ApiBearerAuth()
export class GoogleController {

  constructor(
    private readonly googleService: GoogleService,
    private readonly logger: CustomLoggerService
  ){}

  @Get('callback')
  @UseGuards(JwtAuthGuard)
  async getCallback(@Query() query: GoogleCallbackRequestDto, @CurrentUser() user: User) {
    this.logger.start();
    
    const result = await this.googleService.processCallback(query, user);

    this.logger.done();
    return  result;
  }

}
