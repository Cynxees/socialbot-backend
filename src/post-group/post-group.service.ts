import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostGroupRequestDto } from './dto/create-post-group-request.dto';
import { UpdatePostGroupRequestDto } from './dto/update-post-group-request.dto';
import { PostGroupResponseDto } from './dto/post-group-response.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { PostGroupRepository } from './repositories/post-group.repository';
import { PostGroup } from '@prisma/client'; // Assuming you have PostGroup type

@Injectable()
export class PostGroupService {
  constructor(
    private readonly postGroupRepository: PostGroupRepository,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(createPostGroupDto: CreatePostGroupRequestDto): Promise<PostGroupResponseDto> {
    this.logger.start();
    this.logger.log('Creating post group');

    const postGroup = await this.postGroupRepository.create({
      data: {
        authorId: createPostGroupDto.authorId,
        scheduledDate: createPostGroupDto.scheduledDate,
        isPublished: createPostGroupDto.isPublished,
        fileIds: createPostGroupDto.fileIds,
        postIds: createPostGroupDto.postIds, // Ensure postIds are included
      },
    });

    this.logger.done();
    return new PostGroupResponseDto(postGroup);
  }

  async findById(id: number): Promise<PostGroupResponseDto> {
    this.logger.start();
    const postGroup = await this.postGroupRepository.findById(id);
    if (!postGroup) {
      throw new NotFoundException(`PostGroup with id ${id} not found`);
    }
    this.logger.done();
    return new PostGroupResponseDto(postGroup);
  }

  async update(id: number, updatePostGroupDto: UpdatePostGroupRequestDto): Promise<PostGroupResponseDto> {
    this.logger.start();
    this.logger.log('Finding post group');

    const postGroup = await this.postGroupRepository.update(id, {
      authorId: updatePostGroupDto.authorId,
      scheduledDate: updatePostGroupDto.scheduledDate,
      isPublished: updatePostGroupDto.isPublished,
      fileIds: updatePostGroupDto.fileIds,
      postIds: updatePostGroupDto.postIds, // Ensure postIds are included
    });

    this.logger.done();
    return new PostGroupResponseDto(postGroup);
  }

  async delete(id: number): Promise<void> {
    this.logger.start();
    this.logger.log('Finding post group to delete');
    await this.findById(id);
    this.logger.log('Deleting post group');
    await this.postGroupRepository.delete(id);
    this.logger.done();
  }
}


