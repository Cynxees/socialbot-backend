import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; 
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: CustomLoggerService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req : LoginRequestDto) : Promise<LoginResponseDto> {
    this.logger.start()
    const res = this.authService.login(req);
    this.logger.done();
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req ) {
    return req.user;
  }
}