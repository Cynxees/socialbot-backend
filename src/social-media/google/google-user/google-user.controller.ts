import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GoogleUserService } from './google_user.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GoogleUserResponse } from './dto/google-user-response.dto';

@Controller('google')
@ApiTags('Google')
@ApiBearerAuth()
export class GoogleUserController {

  constructor(
    private readonly googleUserService: GoogleUserService,
    private readonly logger: CustomLoggerService
  ){}

  @Post('callback')
  @UseGuards(JwtAuthGuard)
  async getCallback(@Body() data: GoogleCallbackRequestDto, @CurrentUser() user: User) {
    this.logger.start();
    
    const result = await this.googleUserService.processCallback(data, user);

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
    const res = await this.googleUserService.findAll();
    this.logger.done();
    return res;
  }

}
