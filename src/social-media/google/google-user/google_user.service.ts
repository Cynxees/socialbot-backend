import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { GoogleUser, User } from '@prisma/client';
import { GoogleUserResponse } from './dto/google-user-response.dto';
import { GoogleUserRepository } from './repositories/google-user.repository';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';

@Injectable()
export class GoogleUserService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserRepository: GoogleUserRepository,
    private readonly prisma: PrismaService
  ){}

  async processCallback(data: GoogleCallbackRequestDto, user: User): Promise<GoogleUser>{
    this.logger.start();    

    let googleUser = await this.googleUserRepository.findOne(user.id);

    if(!googleUser){

      this.logger.log('creating new google user');
      googleUser = await this.prisma.$transaction(async (tx) => {

        const googleUser = await tx.googleUser.create({data})
        await tx.user.update({
          where: { id: user.id },
          data: { googleUserId: googleUser.id }
        });

        return googleUser;
      });

    }else{

      this.logger.log(`updating google user's scopes`);

      data.scopes.forEach((scope) => {
        if(!googleUser.scopes.includes(scope)) googleUser.scopes.push(scope);
      });
      
      googleUser = await this.googleUserRepository.update(googleUser.id, {
        scopes: googleUser.scopes
      });

    }

    this.logger.done();

    return googleUser; 
  }

  async findAll(): Promise<GoogleUserResponse[]>{
    this.logger.start();

    const googleUsers = await this.googleUserRepository.findAll();

    this.logger.done();
    return googleUsers;
  }

}
