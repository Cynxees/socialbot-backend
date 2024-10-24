import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CreatePostGroupRequestDto } from './dto/create-post-group-request.dto';
import { PostGroupResponseDto } from './dto/post-group-response.dto';
import { UpdatePostGroupRequestDto } from './dto/update-post-group-request.dto';
import { PostGroupRepository } from './repositories/post-group.repository';

@Injectable()
export class PostGroupService {
  constructor(
    private readonly postGroupRepository: PostGroupRepository,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(
    createPostGroupDto: CreatePostGroupRequestDto,
  ): Promise<PostGroupResponseDto> {
    this.logger.start();
    this.logger.log('Creating post group');

    // Include validation or handling to ensure postIds are not undefined or empty if required
    if (
      !createPostGroupDto.postIds ||
      createPostGroupDto.postIds.length === 0
    ) {
      throw new Error(
        'PostGroup must have at least one post associated at creation.',
      );
    }

    const postGroup = await this.postGroupRepository.save({
      authorId: createPostGroupDto.authorId,
      scheduledDate: createPostGroupDto.scheduledDate,
      isPublished: createPostGroupDto.isPublished,
      fileIds: createPostGroupDto.fileIds,
      postIds: createPostGroupDto.postIds,
    });

    this.logger.done();
    return new PostGroupResponseDto(postGroup);
  }

  async findById(id: number): Promise<PostGroupResponseDto> {
    this.logger.start();
    const postGroup = await this.postGroupRepository.findOne({ where: { id } });
    if (!postGroup) {
      throw new NotFoundException(`PostGroup with id ${id} not found`);
    }
    this.logger.done();
    return new PostGroupResponseDto(postGroup);
  }

  async update(
    id: number,
    updatePostGroupDto: UpdatePostGroupRequestDto,
  ): Promise<PostGroupResponseDto> {
    this.logger.start();
    this.logger.log('Finding post group');

    // Update PostGroup without handling Post IDs
    await this.postGroupRepository.update(id, {
      authorId: updatePostGroupDto.authorId,
      scheduledDate: updatePostGroupDto.scheduledDate,
      isPublished: updatePostGroupDto.isPublished,
    });

    const postGroup = await this.findById(id);

    this.logger.done();
    return new PostGroupResponseDto(postGroup);
  }

  async delete(id: number): Promise<void> {
    this.logger.start();
    this.logger.log('Finding post group to delete');
    await this.findById(id); // Ensure it exists before attempting to delete
    this.logger.log('Deleting post group');
    await this.postGroupRepository.delete(id);
    this.logger.done();
  }
}
