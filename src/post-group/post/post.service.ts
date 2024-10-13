import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { PaginatePostRequestDto } from './dto/paginate-post-request.dto';
import { UpdatePostRequestDto } from './dto/update-post-request.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(data: CreatePostRequestDto): Promise<Post> {
    this.logger.start();

    this.logger.log('creating post');
    const post = await this.postRepository.save(data);
    this.logger.done();
    return post;
  }

  async paginate(params: PaginatePostRequestDto): Promise<Post[]> {
    this.logger.start();

    //TODO: implement pagination logic
    const posts = await this.postRepository.find();
    this.logger.done();
    return posts;
  }

  async findOne(field: keyof Post, value: any): Promise<Post | null> {
    this.logger.start();
    const post = await this.postRepository.findOne({
      where: {
        [field]: value,
      },
    });
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
    await this.postRepository.delete({ id });
    this.logger.done();
  }

  async update(id: number, req: UpdatePostRequestDto): Promise<Post> {
    this.logger.start();
    this.logger.log('Finding post');
    await this.findByIdOrThrow(id);
    this.logger.log('Updating post');
    await this.postRepository.update(id, req);
    const post = await this.findByIdOrThrow(id);
    this.logger.done();
    return post;
  }
}
