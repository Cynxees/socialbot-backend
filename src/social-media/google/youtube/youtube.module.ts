import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { GoogleUserModule } from '../google-user/google_user.module';
import { UserModule } from 'src/user/user.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    GoogleUserModule,
    UserModule,
    FileModule
  ],
  controllers: [YoutubeController],
  providers: [YoutubeService],
  exports: [YoutubeService]
})
export class YoutubeModule {}
