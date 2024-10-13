import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './_infrastructure/infrastructure.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { CustomConfigModule } from './config/config.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PostGroupModule } from './post-group/post-group.module';
import { PostModule } from './post-group/post/post.module';
@Module({
  imports: [
    InfrastructureModule,
    ScheduleModule.forRoot(),
    CustomConfigModule,
    CommonModule,
    UserModule,
    PostGroupModule,
    PostModule,
    FileModule,
    AuthModule,
    SocialMediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}