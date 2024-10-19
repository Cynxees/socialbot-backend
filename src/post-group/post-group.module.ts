import { Module } from '@nestjs/common';
import { PostGroupFileModule } from './file/post-group-file.module';
import { PostGroupController } from './post-group.controller';
import { PostGroupService } from './post-group.service';
import { PostModule } from './post/post.module';
import { FileExistsValidator } from './post/validators/post.validators';
import { PostGroupRepository } from './repositories/post-group.repository';

@Module({
  imports: [PostModule, PostGroupFileModule],
  controllers: [PostGroupController],
  providers: [PostGroupService, PostGroupRepository, FileExistsValidator],
})
export class PostGroupModule {}
