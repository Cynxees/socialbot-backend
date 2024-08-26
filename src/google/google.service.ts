import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { GoogleUser, User } from '@prisma/client';
import { GoogleUserResponse } from './dto/google-user-response.dto';
import { GoogleUserRepository } from './repositories/google-user.repository';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';

@Injectable()
export class GoogleService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserRepository: GoogleUserRepository,
    private readonly prisma: PrismaService
  ){}

  async processCallback(data: GoogleCallbackRequestDto, user: User): Promise<GoogleUser>{
    this.logger.start();    

    const googleUser = await this.googleUserRepository.findOne(user.id);

    if(!googleUser){

      return await this.prisma.$transaction(async (tx) => {
        const googleUser = await this.googleUserRepository.create(data);

        return googleUser;
      })
    }

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
