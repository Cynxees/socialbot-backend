import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GoogleUser, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GoogleUserResponse } from './dto/google-user-response.dto';

@Controller('google')
@ApiTags('Google')
@ApiBearerAuth()
export class GoogleController {

  constructor(
    private readonly googleService: GoogleService,
    private readonly logger: CustomLoggerService
  ){}

  @Post('callback')
  @UseGuards(JwtAuthGuard)
  async getCallback(@Body() data: GoogleCallbackRequestDto, @CurrentUser() user: User) {
    this.logger.start();
    
    const result = await this.googleService.processCallback(data, user);

    this.logger.done();
    return  result;
  }
  
  @Get()
  @ApiProperty({
    deprecated: true,
    description: 'FOR TESTING ONLY, DONT USE',
  })
  async getAll(): Promise<GoogleUserResponse[]> {
    this.logger.start()
    const res = await this.googleService.findAll();
    this.logger.done();
    return res;
  }

}
