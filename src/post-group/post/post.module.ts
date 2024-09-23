import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { PrismaModule } from 'src/_infrastructure/prisma/prisma.module';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { FileExistsValidator } from './validators/post.validators';
import { SocialMediaModule } from 'src/social-media/social-media.module';
import { UserModule } from 'src/user/user.module';
import { YoutubeModule } from 'src/social-media/google/youtube/youtube.module';
import { PostGroupModule } from '../post-group.module';
@Module({
  imports: [UserModule, YoutubeModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService, FileExistsValidator]
})
export class PostModule {}
