import { Injectable, NotFoundException} from '@nestjs/common';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/update-post-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { PostRepository } from './repositories/post.repository';
import { Post, File } from '@prisma/client';
import { PaginatePostRequestDto } from './dto/paginate-post-request.dto';


@Injectable()
export class PostService{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly logger: CustomLoggerService,
   
  ) {}

 

  async create(data: CreatePostRequestDto): Promise<Post> {
    this.logger.start();

    this.logger.log('creating post');
    const post = await this.postRepository.createPost({ data });
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
}