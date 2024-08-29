import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/update-post-request.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { PostRepository } from './repositories/post.repository';
import { Post } from '@prisma/client';
import { PaginatePostRequestDto } from './dto/paginate-post-request.dto';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { File } from '@prisma/client';
@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly logger: CustomLoggerService,
    private readonly prisma: PrismaService
  ) {}

  async create(data: CreatePostRequestDto): Promise<PostResponseDto> {
    this.logger.start();
    const post = await this.postRepository.createPost({ data });
    this.logger.done();
    return post;
  }

  async paginate(params: PaginatePostRequestDto): Promise<PostResponseDto[]> {
    this.logger.start();
    const posts = await this.postRepository.paginatePost(params);
    this.logger.done();
    return posts.map(post => new PostResponseDto(post));
  }

  async findOne(field: keyof Post, value: any): Promise<PostResponseDto | null> {
    this.logger.start();
    const post = await this.postRepository.findOne(field, value);
    this.logger.done();
    return post ? new PostResponseDto(post) : null;
  }

  async findByIdOrThrow(id: number): Promise<PostResponseDto> {
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

  async update(id: number, req: UpdatePostRequestDto): Promise<PostResponseDto> {
    this.logger.start();
    this.logger.log('Finding post');
    await this.findByIdOrThrow(id);
    this.logger.log('Updating post');
    const post = await this.postRepository.update(id, req);
    this.logger.done();
    return new PostResponseDto(post);
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
}

