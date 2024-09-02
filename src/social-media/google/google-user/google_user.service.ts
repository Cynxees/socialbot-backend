import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { GoogleUser } from '@prisma/client';
import { GoogleUserResponse } from './dto/google-user-response.dto';
import { GoogleUserRepository } from './repositories/google-user.repository';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleUserService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserRepository: GoogleUserRepository,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ){}

  async getOauthClient(currentUser: JwtUser): Promise<OAuth2Client> {
    this.logger.start();
    this.logger.log('getting user');
    const user = await this.userService.findByIdOrThrow(currentUser.id);

    const accessToken = user.googleUser?.accessToken;
    if(!accessToken) {
      const err = 'Google Access Token Not Found'
      this.logger.error(err);
      throw new NotFoundException(err);
    }

    this.logger.log('creating OAuth2 client');
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    this.logger.done();
    return oauth2Client;
  }

  async processCallback(data: GoogleCallbackRequestDto, user: JwtUser): Promise<GoogleUser>{
    this.logger.start();    

    console.debug(user);
    let googleUser = user.googleUserId ? await this.googleUserRepository.findOne(user.googleUserId) : null;

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
        ...data,
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
