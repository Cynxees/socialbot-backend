import { Module } from '@nestjs/common';
import { FacebookModule } from './social/facebook/facebook.module';
import { InstagramModule } from './social/instagram/instagram.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [SocialModule]
})
export class CommonModule {}
