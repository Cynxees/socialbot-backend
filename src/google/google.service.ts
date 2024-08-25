import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { User } from '@prisma/client';

@Injectable()
export class GoogleService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly userService: UserService
  ){}

  async processCallback(data: GoogleCallbackRequestDto, user: User){
    this.logger.start();    

    // update user
    this.logger.debug(data);
    this.logger.debug(JSON.stringify(user));

    this.logger.done();

    // return user; 


  }

}
