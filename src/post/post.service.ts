import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/update-post-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { PostRepository } from './repositories/post.repository';
import { Post, File } from '@prisma/client';
import { PaginatePostRequestDto } from './dto/paginate-post-request.dto';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { YoutubeService } from 'src/social-media/google/youtube/youtube.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService implements OnModuleInit{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly logger: CustomLoggerService,
    private readonly prisma: PrismaService,
    private readonly youtubeService: YoutubeService,
    private readonly userService: UserService
  ) {}

  async onModuleInit() {
    this.logger.start();
    this.logger.log('reloading scheduled posts');
    
    await this.reloadScheduledPosts();
    
    this.logger.done();
  }

  async create(data: CreatePostRequestDto): Promise<Post> {
    this.logger.start();

    this.logger.log('creating post');
    const post = await this.postRepository.createPost({ data });

    this.logger.log('scheduling post');
    await this.schedulePost(post);

    this.logger.done();
    return post;
  }

  async paginate(params: PaginatePostRequestDto): Promise<Post[]> {
    this.logger.start();
    const posts = await this.postRepository.paginatePost(params);
    this.logger.done();
    return posts;
  }

  async findOne(field: keyof Post, value: any): Promise<Post | null> {
    this.logger.start();
    const post = await this.postRepository.findOne(field, value);
    this.logger.done();
    return post;
  }

  async findByIdOrThrow(id: number): Promise<Post> {
    this.logger.start();
    const post = await this.findOne('id', id);
    if (!post) throw new NotFoundException('Post not found');
    this.logger.done();
    return post;
  }

  async deleteById(id: number): Promise<void> {
    this.logger.start();
    this.logger.log('Finding post');
    await this.findByIdOrThrow(id);
    this.logger.log('Deleting post');
    await this.postRepository.deleteById(id);
    this.logger.done();
  }

  async update(id: number, req: UpdatePostRequestDto): Promise<Post> {
    this.logger.start();
    this.logger.log('Finding post');
    await this.findByIdOrThrow(id);
    this.logger.log('Updating post');
    const post = await this.postRepository.update(id, req);
    this.logger.done();
    return post;
  }


  async getFilesForPost(postId: number): Promise<File[]> {
    // Fetch the post by its ID
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { fileIds: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Use the fileIds array to fetch the corresponding files
    const files = await this.prisma.file.findMany({
      where: {
        id: {
          in: post.fileIds,
        },
      },
    });

    return files;
  }

  private async schedulePost(post: Post){
    this.logger.start();

    const delay = post.scheduledDate.getTime() - new Date().getTime();
    this.logger.log(`scheduling post ${post.id} at ${delay/1000} seconds`);

    if(delay<0) {
      this.logger.warn(`post ${post.id} have not been published, posting now`);
    };

    setTimeout(async () => {
      try {
          this.logger.log(`executing scheduled post ${post.id}`);
          await this.postToSocialMedias(post.id);
      } catch (error) {
          this.logger.error(`execute post ${post.id} failed: `, error);
      }
    }, delay);

    this.logger.done();
  }

  async reloadScheduledPosts(){
    this.logger.start();

    this.logger.log('getting posts that is not published yet');
    const unpublishedPosts = await this.postRepository.getUnpublishedPosts();
    
    this.logger.log('scheduling posts');
    unpublishedPosts.forEach((post) => {
      this.schedulePost(post);
    });

    this.logger.done();
  }

  private async postToSocialMedias(postId: number){
    this.logger.start();

    this.logger.log('getting latest post');
    const post = await this.findByIdOrThrow(postId);

    this.logger.log('getting user');
    const user = await this.userService.findByIdOrThrow(post.authorId);

    // TODO: implement logic if want youtube or instagram, and validation for video file only for youtube 
    this.logger.log('uploading to youtube');
    await this.youtubeService.uploadVideo(post.fileIds[0], user, {
      title: post.title,
      description: post.caption
    });

    this.logger.log('setting post as published');
    await this.postRepository.update(postId, {
      published: true,
    });

    this.logger.done();
  }
}

