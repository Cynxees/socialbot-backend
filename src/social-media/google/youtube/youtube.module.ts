import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { GoogleUserModule } from '../google-user/google_user.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    GoogleUserModule,
    UserModule
  ],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
