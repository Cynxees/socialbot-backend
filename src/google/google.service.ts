import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { User } from '@prisma/client';
import { GoogleUserResponse } from './dto/google-user-response.dto';
import { GoogleUserRepository } from './repositories/google-user.repository';

@Injectable()
export class GoogleService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserRepository: GoogleUserRepository
  ){}

  async processCallback(data: GoogleCallbackRequestDto, user: User){
    this.logger.start();    

    // update user
    this.logger.debug(data);
    this.logger.debug(JSON.stringify(user));

    this.logger.done();

    // return user; 
  }

  async findAll(): Promise<GoogleUserResponse[]>{
    this.logger.start();

    const googleUsers = await this.googleUserRepository.findAll();

    this.logger.done();
    return googleUsers;
  }

}
