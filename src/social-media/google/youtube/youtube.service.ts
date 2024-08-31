import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { GoogleUserService } from '../google-user/google_user.service';
import { google, youtube_v3 } from 'googleapis'
import { YoutubeProfileResponseDto } from './dto/youtube-profile-response.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class YoutubeService {

  private youtubeApi: youtube_v3.Youtube;

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserService: GoogleUserService,
    private readonly userService: UserService
  ){
    this.youtubeApi = google.youtube('v3');
  }

  async getYoutubeProfile(currentUser: JwtUser): Promise<YoutubeProfileResponseDto>{
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

    this.logger.log('fetching YouTube channel');
    const response = await this.youtubeApi.channels.list({
      auth: oauth2Client,
      part: ['snippet', 'contentDetails', 'statistics'],
      mine: true,
    });

    console.debug(response);
    this.logger.done();
    const profile = response.data.items?.[0];
    if (!profile) {
      const err = 'No YouTube channel found'
      this.logger.error(err);
      throw new NotFoundException(err);
    }

    return profile;
  }

}
