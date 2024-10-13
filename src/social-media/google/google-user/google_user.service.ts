import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isEmpty } from 'class-validator';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { ConfigSchema } from 'src/config/config.schema';
import { UserService } from 'src/user/user.service';
import { GoogleCallbackRequestDto } from './dto/google-callback-request.dto';
import { GoogleUserResponse } from './dto/google-user-response.dto';
import { GoogleUser } from './entities/google-user.entity';
import { GoogleUserRepository } from './repositories/google-user.repository';

@Injectable()
export class GoogleUserService {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserRepository: GoogleUserRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  get oAuthClient(): OAuth2Client {
    this.logger.start();

    const config =
      this.configService.getOrThrow<ConfigSchema['GOOGLE']>('GOOGLE');

    const oAuthClient = new google.auth.OAuth2({
      clientId: config.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: config.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUri: config.GOOGLE_OAUTH_REDIRECT_URI,
    });

    this.logger.done();
    return oAuthClient;
  }

  async getAuthenticatedOAuthClient(
    currentUser: JwtUser,
  ): Promise<OAuth2Client> {
    this.logger.start();
    this.logger.log('getting user');
    const user = await this.userService.findByIdOrThrow(currentUser.id);

    const accessToken = user.googleUser?.accessToken;
    const refreshToken = user.googleUser?.refreshToken;

    if (!accessToken) {
      const err = 'Google Access Token Not Found';
      this.logger.error(err);
      throw new NotFoundException(err);
    }

    this.logger.log('creating OAuth2 client');
    const oauth2Client = this.oAuthClient;
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    this.logger.done();
    return oauth2Client;
  }

  async processCallback(
    data: GoogleCallbackRequestDto,
    jwtUser: JwtUser,
  ): Promise<GoogleUser> {
    this.logger.start();

    this.logger.log('getting access token from authorization code');
    const { tokens } = await this.oAuthClient
      .getToken(data.authorizationCode)
      .catch((err) => {
        this.logger.error('Invalid Google OAuth authorization code');
        throw new UnauthorizedException(
          'Invalid Google OAuth Authorization Code',
        );
      });

    this.logger.log('getting google user');
    const user = await this.userService.findByIdOrThrow(jwtUser.id);
    let googleUser = user.googleUserId
      ? await this.googleUserRepository.findOne({where: {id: user.googleUserId}})
      : null;

    const { authorizationCode, ...payload } = data;
    if (isEmpty(googleUser)) {
      this.logger.log('creating new google user');
      googleUser = await this.googleUserRepository.manager.transaction(
        async (tx) => {
          
          const googleUserData = this.googleUserRepository.create({
            ...payload,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          });

          const googleUser = await tx.save(googleUserData);

          //TODO: pass transaction manager to user service
          await this.userService.update(user.id, {
            googleUserId: googleUser.id,
          });

          return googleUser;
        },
      );
    } else {
      this.logger.log(`updating google user's scopes`);

      data.scopes.forEach((scope) => {
        if (!googleUser.scopes.includes(scope)) googleUser.scopes.push(scope);
      });

      await this.googleUserRepository.update(googleUser.id, {
        ...payload,
        scopes: googleUser.scopes,
      });
    }

    this.logger.done();
    return googleUser;
  }

  async findAll(): Promise<GoogleUserResponse[]> {
    this.logger.start();

    //TODO: implement pagination logic
    const googleUsers = await this.googleUserRepository.find();

    this.logger.done();
    return googleUsers;
  }
}
