import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { GoogleUserService } from '../google-user/google_user.service';
import { google, youtube_v3 } from 'googleapis'
import { YoutubeProfileResponseDto } from './dto/youtube-profile-response.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class YoutubeService {

  private youtubeApi: youtube_v3.Youtube;

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly googleUserService: GoogleUserService,
    private readonly fileService: FileService
  ){
    this.youtubeApi = google.youtube('v3');
  }

async getYoutubeProfile(currentUser: JwtUser): Promise<YoutubeProfileResponseDto>{
    this.logger.start();

    this.logger.log('getting OAuth2 client');
    const oAuth2Client = await this.googleUserService.getOauthClient(currentUser);

    this.logger.log('fetching YouTube channel');
    const response = await this.youtubeApi.channels.list({
      auth: oAuth2Client,
      part: ['snippet', 'contentDetails', 'statistics'],
      mine: true,
    });

    this.logger.log('formatting response')
    console.debug(response);
    const youtubeProfile = response.data.items?.[0];
    if (!youtubeProfile) {
      const err = 'No YouTube channel found'
      this.logger.error(err);
      throw new NotFoundException(err);
    }

    this.logger.done();
    return youtubeProfile;
  }

  async uploadVideo(fileId: number, currentUser: JwtUser, snippet?: youtube_v3.Schema$VideoSnippet){
    this.logger.start();

    this.logger.log('getting OAuth2 client');
    const oAuth2Client = await this.googleUserService.getOauthClient(currentUser);

    this.logger.log(`getting video`);
    const response = await this.fileService.getFileObject(fileId);

    this.logger.log('uploading video');
    const youtubeResponse = await this.youtubeApi.videos.insert({
      auth: oAuth2Client,
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: 'Test Video',
          description: 'Test Description',
          categoryId: '22', // category list: https://developers.google.com/youtube/v3/docs/videoCategories/list
          defaultLanguage: 'en',
          defaultAudioLanguage: 'en',
          ...snippet
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: response,
      },
    }).catch((err) => {
      this.logger.error('Error uploading video:', err.message);
      throw new InternalServerErrorException('Error uploading video');
    });

    this.logger.log('Video uploaded successfully');
    console.debug(youtubeResponse.data);

    this.logger.done();
  }

}
