import { Module } from '@nestjs/common';
import { SocialModule } from './social/social.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [SocialModule, CaslModule]
})
export class CommonModule {}
