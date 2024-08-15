import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { CreatePostRequestDto } from '../dto/create-post-request.dto';
import { UpdatePostRequestDto } from '../dto/update-post-request.dto';
import { PostResponseDto } from '../dto/post-response.dto'; // Import your response DTO
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { Post } from '@prisma/client';
import { PaginatePostRequestDto } from '../dto/paginate-post-request.dto'; // Import your pagination DTO

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
    return post;
  }

  async paginatePost(params: PaginatePostRequestDto): Promise<PostResponseDto[]> {
    this.logger.start();
    const { filter, filterBy, order, orderBy, skip, take } = params;

    const whereOption = filterBy && filter ? { [filterBy]: { contains: filter } } : undefined;
    const orderByOption = { [orderBy]: order };

    const res = await this.prisma.post.findMany({
      where: whereOption,
      orderBy: orderByOption,
      skip,
      take,
      select: {
        id: true,
        title: true,
        caption: true,
        url: true,
        media_type: true,
        location: true,
        music: true,
        published: true,
        date: true,
        tags: true,
        hashtags: true,
        authorId: true,
      },
    });

    this.logger.done();
    return res;
  }

  async findOne(field: keyof Post, value: any): Promise<Post | null> {
    this.logger.start();
    const post = await this.prisma.post.findFirst({
      where: { [field]: value },
    });
    this.logger.done();
    return post;
  }

  async deleteById(id: number): Promise<void> {
    this.logger.start();
    await this.prisma.post.delete({
      where: { id },
    });
    this.logger.done();
  }

  async update(id: number, req: UpdatePostRequestDto): Promise<Post> {
    this.logger.start();
    const post = await this.prisma.post.update({
      where: { id },
      data: req,
    });
    this.logger.done();
    return post;
  }
}
