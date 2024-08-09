import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service'; 
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly logger: CustomLoggerService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.start();
    const user = await this.userService.findOne('username', username);
    
    if (user && user.password === password) {
      this.logger.done();
      const { password, ...result } = user;
      return result;
    }

    this.logger.warn('wrong credentials');
    return null;
  }

  async login(req: LoginRequestDto) : Promise<LoginResponseDto> {
    this.logger.start();
    const payload = { username: req.username, password: req.password };
    this.logger.debug(payload);
    
    this.logger.log('validating user')
    await this.validateUser(req.username, req.password);
    
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(accessToken);

    const res = this.jwtService.decode(accessToken);
    this.logger.debug(res);

    this.logger.done();
    return {accessToken};
  }
}