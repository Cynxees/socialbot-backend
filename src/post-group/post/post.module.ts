import { Module } from '@nestjs/common';
import { YoutubeModule } from 'src/social-media/google/youtube/youtube.module';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';
import { FileExistsValidator } from './validators/post.validators';
@Module({
  imports: [UserModule, YoutubeModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, FileExistsValidator],
})
export class PostModule {}
