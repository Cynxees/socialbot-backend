import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service'; 
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthUserService } from './auth-user/auth-user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: AuthUserService,
    private jwtService: JwtService,
    private readonly logger: CustomLoggerService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    this.logger.start();
    const user = await this.userService.findOneByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      this.logger.done();
      return user;
    }

    this.logger.warn('wrong credentials');
    this.logger.done();
    throw new UnauthorizedException('Invalid Credentials');
  }

  async login(req: LoginRequestDto) : Promise<LoginResponseDto> {
    this.logger.start();

    this.logger.log('validating user');
    const user = await this.validateUser(req.username, req.password);

    const payload = {id: user.id, username: user.username, role: user.role} as JwtUser;

    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(accessToken);

    const res = this.jwtService.decode(accessToken);
    this.logger.debug(JSON.stringify(res));

    this.logger.done();
    return {accessToken};
  }
}