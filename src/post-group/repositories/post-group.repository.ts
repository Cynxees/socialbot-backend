import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_infrastructure/prisma/prisma.service';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { Prisma, PostGroup } from '@prisma/client';
import { CreatePostGroupRequestDto } from '../dto/create-post-group-request.dto';
import { UpdatePostGroupRequestDto } from '../dto/update-post-group-request.dto'; 
import { PaginatePostGroupRequestDto } from '../dto/paginate-post-group-request.dto'; 

@Injectable()
export class PostGroupRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(params: { data: CreatePostGroupRequestDto }): Promise<PostGroup> {
    this.logger.start();
    const { data } = params;

    // Creating a PostGroup without handling postIds if decoupled
    const postGroup = await this.prisma.postGroup.create({
      data: {
        authorId: data.authorId,
        scheduledDate: data.scheduledDate,
        isPublished: data.isPublished,
        fileIds: data.fileIds || [], // Handle fileIds as before
      }
    });

    this.logger.done();
    return postGroup;
  }

  async paginatePostGroup(params: PaginatePostGroupRequestDto): Promise<PostGroup[]> {
    this.logger.start();

    const { page = 1, limit = 10, orderBy, filterBy, search } = params;
    const skip = (page - 1) * limit;

    const whereOption: Prisma.PostGroupWhereInput = {
      ...(filterBy ? { [filterBy]: search } : {}),
    };

    const orderByOption: Prisma.PostGroupOrderByWithRelationInput = {
      [orderBy]: 'asc', // Dynamic ordering
    };

    const postGroups = await this.prisma.postGroup.findMany({
      where: whereOption,
      orderBy: orderByOption,
      skip,
      take: limit,
    });

    this.logger.done();
    return postGroups;
  }

  async findById(id: number): Promise<PostGroup | null> {
    this.logger.start();
    const postGroup = await this.prisma.postGroup.findUnique({
      where: { id },
    });
    this.logger.done();
    return postGroup;
  }

  async delete(id: number): Promise<void> {
    this.logger.start();
    await this.prisma.postGroup.delete({
      where: { id },
    });
    this.logger.done();
  }

  async update(id: number, req: UpdatePostGroupRequestDto): Promise<PostGroup> {
    this.logger.start();

    const postGroup = await this.prisma.postGroup.update({
      where: { id },
      data: {
        authorId: req.authorId,
        scheduledDate: req.scheduledDate,
        isPublished: req.isPublished,
        fileIds: req.fileIds || [], // Handle fileIds as before
        // Remove postIds handling if decoupled
      }
    });

    this.logger.done();
    return postGroup;
  }

  async getUnpublishedPostGroups(): Promise<PostGroup[]> {
    this.logger.start();

    const results = await this.prisma.postGroup.findMany({
      where: {
        isPublished: false
      }
    });

    this.logger.done();
    return results;
  }
}

