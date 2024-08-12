import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { PrismaModule } from 'src/_infrastructure/prisma/prisma.module';
@Module({
imports: [LoggerModule, PrismaModule],
  controllers: [PostController],
  providers: [PostService, PostRepository]
})
export class PostModule {}
