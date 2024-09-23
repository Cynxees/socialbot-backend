import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Assuming Prisma is being used
import { PostGroupDto } from './dto/post-group.dto';
import { CreatePostGroupDto } from './dto/create-post-group-request.dto';
import { UpdatePostGroupDto } from './dto/update-post-group-request.dto';

@Injectable()
export class PostGroupService {
  constructor(private prisma: PrismaService) {}

  async create(createPostGroupDto: CreatePostGroupDto): Promise<PostGroupDto> {
    const postGroup = await this.prisma.postGroup.create({
      data: {
        authorId: createPostGroupDto.authorId,
        scheduledDate: createPostGroupDto.scheduledDate,
        isPublished: createPostGroupDto.isPublished,
        postIds: createPostGroupDto.postIds,
        fileIds: createPostGroupDto.fileIds,
        musicId: createPostGroupDto.musicId,
      },
    });
    return new PostGroupDto(postGroup);
  }

  async findById(id: number): Promise<PostGroupDto> {
    const postGroup = await this.prisma.postGroup.findUnique({ where: { id } });
    if (!postGroup) {
      throw new NotFoundException(`PostGroup with id ${id} not found`);
    }
    return new PostGroupDto(postGroup);
  }

  async update(id: number, updatePostGroupDto: UpdatePostGroupDto): Promise<PostGroupDto> {
    const postGroup = await this.prisma.postGroup.update({
      where: { id },
      data: {
        authorId: updatePostGroupDto.authorId,
        scheduledDate: updatePostGroupDto.scheduledDate,
        isPublished: updatePostGroupDto.isPublished,
        postIds: updatePostGroupDto.postIds,
        fileIds: updatePostGroupDto.fileIds,
        musicId: updatePostGroupDto.musicId,
      },
    });
    return new PostGroupDto(postGroup);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.postGroup.delete({ where: { id } });
  }
}
