import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { CreatePostRequestDto } from '../dto/create-post-request.dto';
import { UpdatePostRequestDto } from '../dto/update-post-request.dto';
import { PostResponseDto } from '../dto/post-response.dto'; 
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { Post, Prisma, PrismaClient } from '@prisma/client';
import { PaginatePostRequestDto } from '../dto/paginate-post-request.dto'; 
import { identity } from 'rxjs';

@Injectable()
export class PostRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}

  async createPost(params: { data: CreatePostRequestDto }): Promise<PostResponseDto> {
    this.logger.start();
    const { data } = params;
    const post = await this.prisma.post.create({ data });
    this.logger.done();
    return new PostResponseDto(post); 
  }

  async paginatePost(params: PaginatePostRequestDto): Promise<PostResponseDto[]> {
    this.logger.start();
    const { page = 1, limit = 10, order, orderBy, search, scheduledDate, tags } = params;

    const skip = (page - 1) * limit;

    const whereOption: Prisma.PostWhereInput = {
      ...(scheduledDate ? { scheduledDate } : {}),
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
      ...(tags ? { tags: { hasSome: tags.split(',') } } : {}),
    };

    const orderByOption: Prisma.PostOrderByWithRelationInput = {
      [orderBy]: order
    }

    const posts = await this.prisma.post.findMany({
      where: whereOption,
      orderBy: orderByOption,
      skip,
      take: limit,
    });

    this.logger.done();
    return posts.map(post => new PostResponseDto(post)); 
  }

  async findOne(field: keyof Post, value: any): Promise<PostResponseDto | null> {
    this.logger.start();
    const post = await this.prisma.post.findUnique({
      where: { [field]: value } as any,
    });
    this.logger.done();
    return post ? new PostResponseDto(post) : null; 
  }

  async deleteById(id: number): Promise<void> {
    this.logger.start();
    await this.prisma.post.delete({
      where: { id },
    });
    this.logger.done();
  }

  async update(id: number, req: UpdatePostRequestDto): Promise<PostResponseDto> {
    this.logger.start();
    const post = await this.prisma.post.update({
      where: { id },
      data: req,
    });
    this.logger.done();
    return new PostResponseDto(post); 
  }
}
