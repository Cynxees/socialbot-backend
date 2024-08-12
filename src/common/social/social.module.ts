import { Module } from '@nestjs/common';
import { InstagramModule } from './instagram/instagram.module';
import { FacebookModule } from './facebook/facebook.module';

@Module({
  imports: [
    InstagramModule, FacebookModule
  ]
})
export class SocialModule {}
