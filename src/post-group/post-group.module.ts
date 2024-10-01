import { Module } from '@nestjs/common';
import { PostGroupController } from './post-group.controller';
import { PostGroupService } from './post-group.service';
import { PrismaService } from 'prisma/prisma.service';
import { PostGroupRepository } from './repositories/post-group.repository';
import { FileExistsValidator } from './post/validators/post.validators';

@Module({
  controllers: [PostGroupController],
  providers: [PostGroupService, PrismaService, PostGroupRepository, FileExistsValidator],
})
export class PostGroupModule {}
